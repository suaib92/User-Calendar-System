// src/components/EventForm.jsx
import React, { useState } from 'react';

const EventForm = ({ event, onSubmit, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    participants: event.participants.join(', ') || '',
    date: event.date ? new Date(event.date).toISOString().substring(0, 10) : '',
    time: event.time || '',
    duration: event.duration || 1,
    sessionNotes: event.sessionNotes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantsArray = formData.participants.split(',').map(participant => participant.trim());
    onSubmit({ ...event, ...formData, participants: participantsArray });
  };

  return (
    <div className="event-form fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg z-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          placeholder="Participants (comma separated)"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex space-x-2">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          min="1"
          className="w-1/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="sessionNotes"
          value={formData.sessionNotes}
          onChange={handleChange}
          placeholder="Session Notes"
          className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save
          </button>
          {event._id && (
            <button
              type="button"
              onClick={() => onDelete(event._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
