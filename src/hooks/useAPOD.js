import { useState, useEffect } from 'react'

// This hook is responsible for one job: go get today's APOD data from NASA
function useAPOD(date) {

  // Three pieces of state I need to track - the data itself, loading status, and any errors
  const [apodData, setApodData]   = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    // useEffect runs after the component mounts 
    // It also re-runs whenever "date" changes

    // async/await lets me write async code that reads like normal top-to-bottom code
    // Without it, I'd have a mess of .then().then().catch() chains
    async function fetchSignal() {
      setLoading(true)
      setError(null)

      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY
        // Building the URL - if a date was passed in, append it, otherwise NASA sends today's
        const dateParam = date ? `&date=${date}` : ''
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${dateParam}`

        const response = await fetch(url)

        // Need to check if NASA actually responded OK before I try to parse the data
        if (!response.ok) {
          throw new Error(`Signal lost — NASA responded with status ${response.status}`)
        }

        const data = await response.json()
        setApodData(data)

      } catch (err) {
        // Something went wrong - store the error message so I can display it in the UI
        setError(err.message)
      } finally {
        // Whether it worked or failed, we're no longer loading
        setLoading(false)
      }
    }

    fetchSignal()

  }, [date]) // The [date] here means: re-run this effect whenever the date value changes

  // Returning all three so whatever component uses this hook has everything it needs
  return { apodData, loading, error }
}

export default useAPOD