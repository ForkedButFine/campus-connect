/**
 * Data Service
 * Handles loading seed data and API calls
 * 
 * In production, replace these functions with real API calls
 */

import studentsData from '../data/students.json'
import teachersData from '../data/teachers.json'

/**
 * Load all seed data
 * @returns {Promise<Object>} All application data
 */
export const loadSeedData = async () => {
  try {
    // In production, this would be:
    // const response = await fetch('/api/init-data')
    // return await response.json()
    
    return {
      users: studentsData,
      teachers: teachersData,
      posts: [],
      messages: [],
      events: [
        {
          id: 1,
          name: 'Tech Fest 2025',
          date: '2025-01-15',
          time: '10:00 AM',
          venue: 'Main Auditorium',
          description: 'Annual technical festival with workshops and competitions'
        },
        {
          id: 2,
          name: 'Cultural Night',
          date: '2025-01-20',
          time: '6:00 PM',
          venue: 'Open Ground',
          description: 'Celebrate diversity with music, dance and drama'
        }
      ],
      jobs: [
        {
          id: 1,
          company: 'Google',
          role: 'Software Engineer',
          location: 'Bangalore, India',
          salary: '₹15-20 LPA',
          type: 'Full-time',
          description: 'Join Google to work on cutting-edge technology'
        }
      ],
      alumni: [
        {
          id: 1,
          name: 'Rahul Sharma',
          batch: '2020',
          currentRole: 'Software Engineer',
          company: 'Google',
          location: 'Bangalore',
          email: 'rahul.sharma@alumni.com',
          expertise: 'Full Stack Development'
        }
      ]
    }
  } catch (error) {
    console.error('Error loading seed data:', error)
    return {
      users: [],
      teachers: [],
      posts: [],
      messages: [],
      events: [],
      jobs: [],
      alumni: []
    }
  }
}

/**
 * API service with placeholder functions
 * Replace these with real API calls in production
 */

// Base API URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    // In production:
    // return apiCall('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // })
    
    // Mock implementation
    const users = studentsData
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      return { success: true, user }
    }
    throw new Error('Invalid credentials')
  },
  
  signup: async (userData) => {
    // return apiCall('/auth/signup', {
    //   method: 'POST',
    //   body: JSON.stringify(userData)
    // })
    
    return { success: true, user: userData }
  },
  
  logout: async () => {
    // return apiCall('/auth/logout', { method: 'POST' })
    return { success: true }
  }
}

// Posts API
export const postsAPI = {
  getAll: async () => {
    // return apiCall('/posts')
    return []
  },
  
  create: async (postData) => {
    // return apiCall('/posts', {
    //   method: 'POST',
    //   body: JSON.stringify(postData)
    // })
    return { success: true, post: postData }
  },
  
  delete: async (postId) => {
    // return apiCall(`/posts/${postId}`, { method: 'DELETE' })
    return { success: true }
  },
  
  like: async (postId) => {
    // return apiCall(`/posts/${postId}/like`, { method: 'POST' })
    return { success: true }
  },
  
  comment: async (postId, comment) => {
    // return apiCall(`/posts/${postId}/comment`, {
    //   method: 'POST',
    //   body: JSON.stringify({ comment })
    // })
    return { success: true }
  }
}

// Messages API
export const messagesAPI = {
  getAll: async (userId) => {
    // return apiCall(`/messages?userId=${userId}`)
    return []
  },
  
  send: async (messageData) => {
    // return apiCall('/messages', {
    //   method: 'POST',
    //   body: JSON.stringify(messageData)
    // })
    return { success: true, message: messageData }
  }
}

// Events API
export const eventsAPI = {
  getAll: async () => {
    // return apiCall('/events')
    return []
  },
  
  create: async (eventData) => {
    // return apiCall('/events', {
    //   method: 'POST',
    //   body: JSON.stringify(eventData)
    // })
    return { success: true, event: eventData }
  }
}

export default {
  loadSeedData,
  authAPI,
  postsAPI,
  messagesAPI,
  eventsAPI
}
