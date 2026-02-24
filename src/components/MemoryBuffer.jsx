// MemoryBuffer renders the list of saved signals in the sidebar
// Each entry is a "write" to the buffer - clicking one re-tunes the receiver to that date
function MemoryBuffer({ savedSignals, onSelectDate, onErase }) {

  if (savedSignals.length === 0) {
    return (
      <div>
        <p className="text-xs tracking-widest mb-2" style={{ color: '#4a4f6a' }}>
          MEMORY BUFFER
        </p>
        <p className="text-xs" style={{ color: '#4a4f6a' }}>
          NO SIGNALS SAVED - BUFFER EMPTY
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs tracking-widest mb-2" style={{ color: '#4a4f6a' }}>
        MEMORY BUFFER ({savedSignals.length})
      </p>

      {/* .map() loops over the array and returns a JSX element for each saved signal */}
      <div className="flex flex-col gap-1">
        {savedSignals.map(signal => (
          <div
            key={signal.date}
            className="rounded p-2 flex items-start justify-between gap-1"
            style={{ backgroundColor: '#0f1117', border: '1px solid #2e3248' }}
          >
            {/* Clicking the title re-tunes the receiver to that date */}
            <button
              onClick={() => onSelectDate(signal.date)}
              className="text-left flex-1"
              style={{ color: '#8b90a7' }}
              onMouseEnter={e => e.currentTarget.style.color = '#e8eaf0'}
              onMouseLeave={e => e.currentTarget.style.color = '#8b90a7'}
            >
              <p className="text-xs" style={{ color: '#7b9cff' }}>{signal.date}</p>
              {/* Trimming the title so it doesn't overflow the sidebar */}
              <p className="text-xs leading-tight mt-0.5" style={{ 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {signal.title}
              </p>
            </button>

            {/* Erase button - targeted memory wipe for this entry */}
            <button
              onClick={() => onErase(signal.date)}
              className="text-xs shrink-0 mt-0.5"
              style={{ color: '#4a4f6a' }}
              onMouseEnter={e => e.target.style.color = '#f87171'}
              onMouseLeave={e => e.target.style.color = '#4a4f6a'}
              title="Erase from buffer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemoryBuffer