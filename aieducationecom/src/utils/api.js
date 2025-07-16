// Mock API utility functions

// Simulate API call with delay
export const mockApiCall = (endpoint, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random API failures (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error('API call failed'));
      } else {
        resolve({ success: true, endpoint });
      }
    }, delay);
  });
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Constants for localStorage keys
export const STORAGE_KEYS = {
  FAVORITES: 'eduai_favorites',
  VIEW_HISTORY: 'eduai_view_history'
};