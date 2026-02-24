import { useState, useEffect } from 'react'

// This hook manages all read/write operations to the browser's localStorage
const STORAGE_KEY = 'parallax_memory_buffer'

function useMemoryBuffer() {

  // Loading saved signals out of localStorage on first mount
  // JSON.parse converts the stored string back into a real JavaScript array
  const [savedSignals, setSavedSignals] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      // If the stored data is corrupted somehow, start fresh
      return []
    }
  })

  // Every time savedSignals changes, write the updated array back to localStorage
  // JSON.stringify serializes the array into a string - localStorage only stores strings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSignals))
  }, [savedSignals])

  function writeSignal(apodData) {
    // Checking if this date is already in the buffer - no point storing duplicates
    const alreadySaved = savedSignals.some(signal => signal.date === apodData.date)
    if (alreadySaved) return

    // Prepending to the array so newest saves appear at the top
    setSavedSignals(prev => [apodData, ...prev])
  }

  function eraseSignal(date) {
    // Filtering out the signal with the matching date - like a targeted memory erase
    setSavedSignals(prev => prev.filter(signal => signal.date !== date))
  }

  function isWritten(date) {
    // Quick lookup - returns true if this date is already in the buffer
    return savedSignals.some(signal => signal.date === date)
  }

  return { savedSignals, writeSignal, eraseSignal, isWritten }
}

export default useMemoryBuffer