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
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event details
  const [isCompleted, setIsCompleted] = useState(false); // Track if the workout is completed
  const calendarRef = useRef(null);

  // Fetch and add workout events based on available days
  const fetchAndAddWorkoutForDateRange = async (startDate, endDate) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const availableDays = await checkAvailableDays(userEmail);

      let currentDay = new Date(startDate);
      currentDay.setHours(0, 0, 0, 0); // Set time to midnight for consistency

      while (currentDay <= endDate) {
        const dayOfWeek = getDayName(currentDay);

        if (availableDays.includes(dayOfWeek.toLowerCase())) {
          const formattedDate = formatDateToYYYYMMDD(currentDay);

          const response = await axios.post('http://localhost:8080/api/workout/findWorkout', {
            userEmail: userEmail,
            date: formattedDate,
          });

          const { data } = response;
          const workoutPlan = data.plan;
          const exercises = data.exercises || [];

          setPlanName(workoutPlan);

          const exerciseDescriptions = exercises
            .map((exercise) => `- ${exercise.name} (${exercise.muscle}, ${exercise.type})`)
            .join('\n');

          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();

            const existingEvent = calendarApi.getEventById(formattedDate);
            if (!existingEvent) {
              calendarApi.addEvent({
                id: formattedDate,
                title: workoutPlan,
                start: formattedDate,
                description: `Scheduled workout day\nExercises:\n${exerciseDescriptions}`,
                extendedProps: {
                  workoutDetails: exerciseDescriptions,
                  completed: false,
                },
                classNames: ['workout-event'],
              });
            }
          }
        }

        currentDay.setDate(currentDay.getDate() + 1);
      }
    } catch (error) {
      console.error('Error fetching workout plan:', error.response ? error.response.data : error.message);
    }
  };

  // Fetch and add meal events for the date range
  const fetchAndAddMealForDateRange = async (startDate, endDate) => {
    const userEmail = localStorage.getItem('userEmail');
    let currentDay = new Date(startDate);
    currentDay.setHours(0, 0, 0, 0); 

    while (currentDay <= endDate) {
      const formattedDate = formatDateToYYYYMMDD(currentDay); 

      try {
        const response = await axios.post('http://localhost:8080/api/food/FindMeal', {
          userEmail: userEmail,
          date: formattedDate
        },{
          timeout: 10000//Set timeout to 10 secs
        });

        if (response.data.foods && response.data.foods.length > 0) {
          console.log(response.data.foods[0].food_name);
        } else {
          console.log("No foods found for the given date.");
        }
        

        const meals = response.data.foods || [];
        if (meals.length > 0) {
          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();

            const mealDescriptions = meals.map(meal => `- ${meal.food_name}`).join('\n');

            const existingEvent = calendarApi.getEventById(`meal-${formattedDate}`);
            if (!existingEvent) {
              calendarApi.addEvent({
                id: `meal-${formattedDate}`,
                title: `Meal Plan`,
                start: formattedDate,
                description: `Meals for the day:\n${mealDescriptions}`,
                extendedProps: {
                  mealDetails: mealDescriptions,
                  completed: false,
                },
                classNames: ['meal-event'],
              });
            }
          }
        }

        currentDay.setDate(currentDay.getDate() + 1);
      } catch (error) {
        console.error(`Error fetching meal for ${formattedDate}:`, error);
      }
    }
  };

  useEffect(() => {
    async function initializeCalendar() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const view = calendarApi.view;
        const endDate = new Date(view.activeEnd);
        await fetchAndAddWorkoutForDateRange(new Date(), endDate);
        await fetchAndAddMealForDateRange(new Date(), endDate); 
      }
    }

    initializeCalendar();
  }, []);

  // Handle event click to open modal
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsCompleted(clickInfo.event.extendedProps.completed);
    setShowModal(true);
  };

  // Mark event as completed
  const handleCompleteEvent = () => {
    if (selectedEvent) {
      // Add a checkmark (✅) to the title to indicate completion
      selectedEvent.setProp('title', `✅ ${selectedEvent.title}`);

      // Mark event as completed by adding a class and setting extended property
      selectedEvent.setExtendedProp('completed', true);
      setIsCompleted(true);
      setShowModal(false);
    }
  };

  // Custom rendering of events to show a checkmark for completed ones
  const renderEventContent = (eventInfo) => {
    return (
      <div className="fc-event-content">
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleDatesSet = (arg) => {
    const { start, end } = arg;

    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.removeAllEvents();
    fetchAndAddWorkoutForDateRange(start, end);
    fetchAndAddMealForDateRange(start, end); 
  };

  const getDayName = (date) => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayNames[date.getUTCDay()];
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        events={[]} 
        datesSet={handleDatesSet}
        eventClick={handleEventClick} 
        eventContent={renderEventContent} // Custom render event content
      />

      {/* Modal for showing event details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedEvent?.extendedProps.workoutDetails || selectedEvent?.extendedProps.mealDetails}</p>
          <p>Status: {isCompleted ? 'Completed' : 'Not Completed'}</p>
        </Modal.Body>
        <Modal.Footer>
          {!isCompleted && (
            <Button variant="success" onClick={handleCompleteEvent}>
              Mark as Completed
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
