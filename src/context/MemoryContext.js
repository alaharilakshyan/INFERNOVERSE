import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const MemoryContext = createContext();

// 2. Create a custom hook for easy consumption
export const useMemories = () => {
  return useContext(MemoryContext);
};

// 3. Create the Provider component
export const MemoryProvider = ({ children }) => {
  // Initial state for memories. In a real app, this would come from an API.
  const [memories, setMemories] = useState([
    // Mock data for demonstration, using _id
    { _id: '1', title: 'Trip to the Mountains', description: 'A beautiful view from the top.', isFavorite: false },
    { _id: '2', title: 'Beach Day', description: 'Fun in the sun and sand.', isFavorite: true },
    { _id: '3', title: 'City Exploration', description: 'Discovering hidden gems in the city.', isFavorite: false },
  ]);

  // Toggle the favorite status of a memory
  const toggleFavorite = (_id) => {
    setMemories(memories.map(memory =>
      memory._id === _id ? { ...memory, isFavorite: !memory.isFavorite } : memory
    ));
  };

  // Delete a memory from the list
  const deleteMemory = (_id) => {
    setMemories(memories.filter(memory => memory._id !== _id));
  };

  // Update a memory's title and description
  const updateMemory = (_id, updatedMemory) => {
    setMemories(memories.map(memory =>
      memory._id === _id ? { ...memory, ...updatedMemory } : memory
    ));
  };

  // Add a new memory to the list
  const addMemory = (newMemory) => {
    const memoryWithId = { ...newMemory, _id: Date.now().toString(), isFavorite: false };
    setMemories([memoryWithId, ...memories]);
  };

  // Derived state for favorite memories
  const favoriteMemories = React.useMemo(() => memories.filter(m => m.isFavorite), [memories]);

  // In a real app, this would be true while fetching from an API
  const [loading, setLoading] = useState(false);

  // The value that will be supplied to any consuming components
  const value = {
    memories,
    favoriteMemories,
    loading,
    toggleFavorite,
    deleteMemory,
    updateMemory,
    addMemory,
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};