// src/App.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from './components/api';
import EventForm from './components/EventForm';
import './App.css';
import Header from './components/Header';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };

    loadEvents();
  }, []);

  const handleDateClick = (info) => {
    setSelectedEvent({
      title: '',
      description: '',
      participants: [],
      date: info.dateStr,
      time: '',
      duration: 1,
      sessionNotes: '',
      start: info.dateStr,
      end: info.dateStr,
    });
  };

  const handleEventClick = (info) => {
    const event = events.find((event) => event._id === info.event.id);
    setSelectedEvent(event);
  };

  const handleEventSubmit = async (event) => {
    try {
      if (event._id) {
        const updatedEvent = await updateEvent(event._id, event);
        setEvents(events.map((ev) => (ev._id === event._id ? updatedEvent : ev)));
      } else {
        const newEvent = await createEvent(event);
        setEvents([...events, newEvent]);
      }
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
  <> 
       <div>
    <Header/>
  </div>
    <div className="App">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              events={events.map((event) => ({
                ...event,
                start: event.date,
                end: event.date,
                id: event._id,
              }))}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>
          <div className="event-list bg-gray-100 p-4">
            <h2 className="text-lg font-bold mb-4">Added Events</h2>
            <ul>
              {events.map((event) => (
                <li key={event._id} className="mb-2 bg-gray-400 rounded p-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{event.title}</div>
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                  </div>
                  <div className="text-sm text-gray-600">{event.description}</div>
                  <div className="text-xs text-gray-500">
                    Participants: {event.participants.join(', ')}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEventClick({ event: { id: event._id } })}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleEventDelete(event._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedEvent && (
          <EventForm
            event={selectedEvent}
            onSubmit={handleEventSubmit}
            onDelete={handleEventDelete}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  
    </>
  );
}

export default App;
