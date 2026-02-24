import { useState } from 'react'
import TerminalFrame from './components/TerminalFrame'
import SignalDisplay from './components/SignalDisplay'
import DateTuner from './components/DateTuner'
import useAPOD from './hooks/useAPOD'

function App() {
  // date lives here in App.jsx - it controls what useAPOD fetches
  // Empty string means "fetch today", any YYYY-MM-DD string fetches that specific day
  const [date, setDate] = useState('')

  // Passing date into the hook — it already watches for date changes via its [date] dependency
  const { apodData, loading, error } = useAPOD(date)

  return (
    <TerminalFrame>

      {/* DateTuner sits at the top of the card, above everything else */}
      <div className="mb-5 pb-4" style={{ borderBottom: '1px solid #2e3248' }}>
        <DateTuner date={date} onDateChange={setDate} />
      </div>

      {loading && (
        <p className="animate-pulse text-sm tracking-widest" style={{ color: '#4a4f6a' }}>
          &gt; ACQUIRING SIGNAL... STANDING BY
        </p>
      )}

      {error && (
        <div className="rounded p-3" style={{ border: '1px solid rgba(248,113,113,0.3)', backgroundColor: 'rgba(248,113,113,0.05)' }}>
          <p className="text-sm tracking-widest" style={{ color: '#f87171' }}>⚠ SIGNAL ERROR: {error}</p>
        </div>
      )}

      {apodData && !loading && (
        <SignalDisplay apodData={apodData} />
      )}

    </TerminalFrame>
  )
}

export default App