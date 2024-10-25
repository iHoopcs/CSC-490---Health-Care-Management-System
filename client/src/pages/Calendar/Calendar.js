import React, { useEffect, useRef, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './Calendar.css';

// Helper function to check available workout days for a user
const checkAvailableDays = async (email) => {
  try {
    const response = await axios.get('http://localhost:8080/api/workout/userPreferences', {
      params: { userEmail: email },
    });
    return response.data.workoutSchedule;
  } catch (error) {
    console.error('Error fetching available days:', error);
    return [];
  }
};

// Helper function to format a JavaScript Date object to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Modal component for workout and meal details
const WorkoutModal = ({ show, onHide, selectedEvent, onComplete, isCompleted }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedEvent ? selectedEvent.title : ''}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{selectedEvent ? selectedEvent.extendedProps.workoutDetails : ''}</p>
      <p>{selectedEvent ? selectedEvent.extendedProps.mealDetails : ''}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onComplete} disabled={isCompleted}>
        Mark as Completed
      </Button>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export const Calendar = React.memo(() => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const calendarRef = useRef(null);

  // Fetch and add workout and meal events based on available days
  const fetchAndAddEvents = async (startDate, endDate) => {
    const userEmail = localStorage.getItem('userEmail');
    const availableDays = await checkAvailableDays(userEmail);

    let currentDay = new Date(startDate);
    currentDay.setHours(0, 0, 0, 0); // Set time to midnight for consistency

    while (currentDay <= endDate) {
      const dayOfWeek = getDayName(currentDay);
      const formattedDate = formatDateToYYYYMMDD(currentDay);

      // Fetch and add workout events
      if (availableDays.includes(dayOfWeek.toLowerCase())) {
        try {
          const response = await axios.post('http://localhost:8080/api/workout/findWorkout', {
            userEmail: userEmail,
            date: formattedDate,
          });

          const { data } = response;
          const workoutPlan = data.plan;
          const exercises = data.exercises || [];
          const isCompleted = data.completion; // Get completion status

          const exerciseDescriptions = exercises
            .map((exercise) => `- ${exercise.name} (${exercise.muscle}, ${exercise.type})`)
            .join('\n');

          const calendarApi = calendarRef.current.getApi();
          if (!calendarApi.getEventById(formattedDate)) {
            calendarApi.addEvent({
              id: formattedDate,
              title: `${isCompleted ? '✅ ' : ''}${workoutPlan}`,
              start: formattedDate,
              extendedProps: {
                workoutDetails: exerciseDescriptions,
                completed: isCompleted,
              },
              classNames: ['workout-event'],
            });
          }
        } catch (error) {
          console.error('Error fetching workout plan:', error);
        }
      }

      // Fetch and add meal events
      try {
        const mealResponse = await axios.post('http://localhost:8080/api/food/findMeal', {
          userEmail: userEmail,
          date: formattedDate,
        });

        const meals = mealResponse.data.foods || [];
        const mealIsCompleted = mealResponse.data.completion;

        if (meals.length > 0) {
          const mealDescriptions = meals
            .map(meal => `Meal: ${meal.name}\nCalories: ${meal.calories || 'N/A'}\nServings: ${meal.servings}\nProtein: ${meal.proteinDv}\nCarbs: ${meal.carbsDv}\nFats: ${meal.fatDv}`)
            .join('\n\n');

          const calendarApi = calendarRef.current.getApi();
          if (!calendarApi.getEventById(`meal-${formattedDate}`)) {
            calendarApi.addEvent({
              id: `meal-${formattedDate}`,
              title: `${mealIsCompleted ? '✅ ' : ''}Meal Plan`,
              start: formattedDate,
              extendedProps: {
                mealDetails: mealDescriptions,
                completed: mealIsCompleted,
              },
              classNames: ['meal-event'],
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching meal for ${formattedDate}:`, error);
      }

      currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
    }
  };

  // Helper function to get the name of the day from a Date object
  const getDayName = (date) => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayNames[date.getUTCDay()];
  };

  // Initialize calendar and fetch events on component mount
  useEffect(() => {
    async function initializeCalendar() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const view = calendarApi.view;
        const endDate = new Date(view.activeEnd);
        await fetchAndAddEvents(new Date(), endDate);
      }
    }

    initializeCalendar();
  }, []);

  // Handle event click to open modal with event details
  const handleEventClick = useCallback((clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsCompleted(clickInfo.event.extendedProps.completed);
    setShowModal(true);
  }, []);

  // Mark event as completed (meal or workout)
  const handleCompleteEvent = useCallback(async () => {
    if (selectedEvent) {
      const userEmail = localStorage.getItem('userEmail');
      const eventDate = selectedEvent.startStr;

      if (selectedEvent.id.startsWith('meal-')) {
        await setMealComplete(userEmail, eventDate);
      } else {
        await setWorkoutComplete(userEmail, eventDate);
      }

      // Update event title and status
      selectedEvent.setProp('title', `✅ ${selectedEvent.title}`);
      selectedEvent.setExtendedProp('completed', true);
      setIsCompleted(true);
      setShowModal(false);
    }
  }, [selectedEvent]);

  // Function to mark a meal as complete in the backend
  const setMealComplete = async (userEmail, date) => {
    try {
      await axios.post('http://localhost:8080/api/food/setMealComplete', {
        userEmail: userEmail,
        date: date,
      });
      console.log('Meal marked as completed');
    } catch (error) {
      console.error('Error marking meal as completed:', error);
    }
  };

  // Function to mark a workout as complete in the backend
  const setWorkoutComplete = async (userEmail, date) => {
    try {
      await axios.post('http://localhost:8080/api/workout/setWorkoutComplete', {
        userEmail: userEmail,
        date: date,
      });
      console.log('Workout marked as completed');
    } catch (error) {
      console.error('Error marking workout as completed:', error);
    }
  };

  // Custom rendering of events to show a checkmark for completed ones
  const renderEventContent = (eventInfo) => (
    <div className="fc-event-content">
      <span>{eventInfo.event.title}</span>
    </div>
  );

  // Fetch new events when the visible date range changes
  const handleDatesSet = (arg) => {
    const { start, end } = arg;

    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.removeAllEvents(); // Clear existing events
    fetchAndAddEvents(start, end); // Fetch new events
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
        events={[]} // No initial events
        datesSet={handleDatesSet} // Callback for when dates change
        eventClick={handleEventClick} // Callback for event clicks
        eventContent={renderEventContent} // Custom render event content
      />
      <WorkoutModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        selectedEvent={selectedEvent} 
        onComplete={handleCompleteEvent} 
        isCompleted={isCompleted} 
      />
    </div>
  );
});
