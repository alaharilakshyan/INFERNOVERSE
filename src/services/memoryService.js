// src/services/memoryService.js
import api from './api';

export const getMemories = () => api.get('/memories');

export const getMemory = (id) => api.get(`/memories/${id}`);

export const createMemory = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return api.post('/memories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateMemory = (id, data) => api.put(`/memories/${id}`, data);

export const deleteMemory = (id) => api.delete(`/memories/${id}`);

export const downloadMemory = (id) => api.get(`/memories/${id}/download`, {
  responseType: 'blob',
});