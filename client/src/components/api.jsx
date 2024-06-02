// src/api.js
import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:3000/events';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (event) => {
  try {
    const response = await axios.post(API_BASE_URL, event);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, event) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${eventId}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
