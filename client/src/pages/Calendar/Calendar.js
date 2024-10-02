import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calendar.css';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal

// Helper function to check available workout days
const checkAvailableDays = async (email) => {
  try {
    const response = await axios.get('http://localhost:8080/api/workout/userPreferences', {
      params: { userEmail: email },
    });
    let days = response.data.workoutSchedule;
    console.log('Available Days:', days);
    return days;
  } catch (error) {
    console.error('Error fetching available days:', error);
    return [];
  }
};

// Helper function to format date to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function Calendar() {
  const [planName, setPlanName] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, content: '', left: 0, top: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState({}); // State to hold workout details
  const [isCompleted, setIsCompleted] = useState(false); // Track if the workout is completed
  const calendarRef = useRef(null);

  // Fetch and add workout events based on available days
  const fetchAndAddWorkoutForDateRange = async (startDate, endDate) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const availableDays = await checkAvailableDays(userEmail);
      console.log('Fetched Available Days:', availableDays);

      let currentDay = new Date(startDate);
      currentDay.setHours(0, 0, 0, 0); // Set time to midnight for consistency

      while (currentDay <= endDate) {
        const dayOfWeek = getDayName(currentDay);

        if (availableDays.includes(dayOfWeek.toLowerCase())) {
          const formattedDate = formatDateToYYYYMMDD(currentDay); 
          console.log(`Fetching workout for ${dayOfWeek} (${formattedDate})`);

          const response = await axios.post('http://localhost:8080/api/workout/findWorkout', {
            userEmail: userEmail,
            date: formattedDate,
          });

          const { data } = response;
          console.log('Response Data:', data);

          if (data && data.plan) {
            const workoutPlan = data.plan;
            const exercises = data.exercises || []; // Get the exercises array
            setPlanName(workoutPlan);

            const exerciseDescriptions = exercises
              .map((exercise) => `- ${exercise.name} (${exercise.muscle}, ${exercise.type})`)
              .join('\n');

            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();

              // Check if the event already exists
              const existingEvent = calendarApi.getEventById(formattedDate);
              if (!existingEvent) { // Only add if it doesn't exist
                calendarApi.addEvent({
                  id: formattedDate, // Use a unique id based on date or some identifier
                  title: workoutPlan,
                  start: formattedDate,
                  description: `Scheduled workout day\nExercises:\n${exerciseDescriptions}`,
                  extendedProps: {
                    workoutDetails: exerciseDescriptions,
                    completed: false, // Initialize as not completed
                  },
                  classNames: ['workout-event', 'hoverable'],
                });
                console.log(`Added event for ${dayOfWeek}: ${workoutPlan}`);
              } else {
                console.log(`Event for ${formattedDate} already exists. Skipping.`);
              }
            }
          }
        }

        currentDay.setDate(currentDay.getDate() + 1);
      }
    } catch (error) {
      console.error('Error fetching workout plan:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    async function initializeCalendar() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const view = calendarApi.view;
        const endDate = new Date(view.activeEnd);
        await fetchAndAddWorkoutForDateRange(new Date(), endDate);
      }
    }

    initializeCalendar();
  }, []);

  const handleDatesSet = (arg) => {
    const { start, end } = arg;
    console.log(`Date range changed: ${start} - ${end}`);

    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.removeAllEvents();
    fetchAndAddWorkoutForDateRange(start, end);
  };

  const getDayName = (date) => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayNames[date.getUTCDay()];
  };

  const handleEventMouseEnter = (info) => {
    const { event } = info;
    setTooltip({
      visible: true,
      content: event.title,
      left: info.jsEvent.clientX,
      top: info.jsEvent.clientY,
    });
  };

  const handleEventMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Handle event click to display a modal with event information
  const handleEventClick = (info) => {
    const { event } = info;
    console.log('Event clicked:', event);
    setSelectedWorkout({
      id: event.id, // Capture the event id
      title: event.title,
      start: event.start,
      details: event.extendedProps.workoutDetails || 'No additional details available.',
      completed: event.extendedProps.completed, // Track completion status
    });
    setIsCompleted(event.extendedProps.completed || false); // Set initial completed state
    setShowModal(true); // Show the modal when event is clicked
  };

  // Mark workout as completed and update the event
  const handleMarkAsComplete = () => {
    const calendarApi = calendarRef.current?.getApi();
    const selectedEvent = calendarApi?.getEventById(selectedWorkout.id); // Use the stored id to get the event
  
    if (selectedEvent) {
      // Use setProp to modify event properties if setExtendedProps is not available
      selectedEvent.setProp('title', `✅ ${selectedEvent.title}`); // Update title to indicate completion
      selectedEvent.setProp('classNames', [...selectedEvent.classNames, 'completed']); // Add a completed class name
  
      // If you want to add properties to extendedProps without setExtendedProps
      const updatedProps = {
        ...selectedEvent.extendedProps,
        completed: true,
      };
      
      // Use setProp to update extendedProps manually
      selectedEvent.setProp('extendedProps', updatedProps);
  
      setIsCompleted(true); // Update the component state
    }
  
    setShowModal(false); // Close the modal
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        datesSet={handleDatesSet}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventClick={handleEventClick}
        eventClassNames="hoverable"
      />

      {/* Bootstrap Modal to display workout details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedWorkout.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Date:</strong> {selectedWorkout.start ? selectedWorkout.start.toDateString() : ''}</p>
          <p><strong>Details:</strong></p>
          <pre>{selectedWorkout.details}</pre>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to mark workout as completed */}
          {!isCompleted && (
            <Button variant="success" onClick={handleMarkAsComplete}>
              Mark as Completed
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {tooltip.visible && (
        <div
          className="tooltip bg-light border p-2"
          style={{
            position: 'absolute',
            left: tooltip.left + 10,
            top: tooltip.top + 10,
            zIndex: 1000,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
