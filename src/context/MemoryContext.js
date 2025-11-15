import React, { createContext, useContext, useState, useCallback } from 'react';

const MemoryContext = createContext();

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Safe toggle favorite function
  const toggleFavorite = useCallback((memoryId) => {
    if (!memoryId) {
      console.error('No memory ID provided for toggleFavorite');
      return;
    }
    
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(memoryId);
      if (isCurrentlyFavorite) {
        return prev.filter(id => id !== memoryId);
      } else {
        return [...prev, memoryId];
      }
    });
  }, []);

  // Safe memory operations
  const addMemory = useCallback((memory) => {
    if (!memory) {
      console.error('No memory provided for addMemory');
      return;
    }
    const newMemory = {
      ...memory,
      _id: memory._id || `memory-${Date.now()}`,
      createdAt: memory.createdAt || new Date()
    };
    setMemories(prev => [...prev, newMemory]);
  }, []);

  const updateMemory = useCallback((id, updatedMemory) => {
    if (!id) {
      console.error('No ID provided for updateMemory');
      return;
    }
    setMemories(prev => 
      prev.map(memory => 
        memory._id === id ? { ...memory, ...updatedMemory } : memory
      )
    );
  }, []);

  const deleteMemory = useCallback((id) => {
    if (!id) {
      console.error('No ID provided for deleteMemory');
      return;
    }
    setMemories(prev => prev.filter(memory => memory._id !== id));
    // Also remove from favorites if it was favorited
    setFavorites(prev => prev.filter(favId => favId !== id));
  }, []);

  const value = {
    memories,
    favorites,
    loading,
    toggleFavorite,
    addMemory,
    updateMemory,
    deleteMemory
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};