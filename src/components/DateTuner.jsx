// DateTuner is the "frequency dial" - it lets me point the receiver at any date in the archive
function DateTuner({ date, onDateChange }) {

    // NASA's APOD archive starts here - no point letting the user pick anything earlier
    const MIN_DATE = '1995-06-16'

    // Ceiling is today - NASA hasn't sent tomorrow's signal yet
    const MAX_DATE = new Date().toISOString().split('T')[0]

    function handleChange(event) {
        // Passing the new date value up to App.jsx so it can retrigger the fetch
        onDateChange(event.target.value)
    }

    function handleToday() {
        // Clearing the data resets it to null, which tells useAPOD to fetch today's signal
        onDateChange('')
    }

    return (
    <div className="flex flex-col gap-2">

      <p className="text-xs tracking-widest" style={{ color: '#4a4f6a' }}>
        TUNE RECEIVER — SELECT DATE
      </p>

      <div className="flex items-center gap-3 flex-wrap">

        {/* The actual date input - styled to match the dark terminal theme */}
        <input
          type="date"
          value={date}
          min={MIN_DATE}
          max={MAX_DATE}
          onChange={handleChange}
          className="text-sm px-3 py-1.5 rounded outline-none"
          style={{
            backgroundColor: '#0f1117',
            border: '1px solid #2e3248',
            color: '#e8eaf0',
            // This removes the default browser calendar icon color weirdness
            colorScheme: 'dark',
          }}
        />

        {/* Quick reset button - jumps back to today's transmission */}
        <button
          onClick={handleToday}
          className="text-xs px-3 py-1.5 rounded tracking-widest transition-colors"
          style={{
            backgroundColor: '#1a1d27',
            border: '1px solid #2e3248',
            color: '#8b90a7',
          }}
          // Inline hover handled via onMouseEnter/Leave since Tailwind needs config for custom colors
          onMouseEnter={e => e.target.style.borderColor = '#7b9cff'}
          onMouseLeave={e => e.target.style.borderColor = '#2e3248'}
        >
          TODAY
        </button>

      </div>

      {/* Show which date is currently locked in, or confirm we're on today's signal */}
      <p className="text-xs" style={{ color: '#4a4f6a' }}>
        {date
          ? `LOCKED: ${date} — ARCHIVE SIGNAL`
          : `LOCKED: ${MAX_DATE} — LIVE SIGNAL`
        }
      </p>

    </div>
  )
}

export default DateTuner