import { useState } from 'react'
import TerminalFrame from './components/TerminalFrame'
import SignalDisplay from './components/SignalDisplay'
import DateTuner from './components/DateTuner'
import MemoryBuffer from './components/MemoryBuffer'
import useAPOD from './hooks/useAPOD'
import useMemoryBuffer from './hooks/useMemoryBuffer'

function App() {
  const [date, setDate] = useState('')
  const { apodData, loading, error } = useAPOD(date)
  const { savedSignals, writeSignal, eraseSignal, isWritten } = useMemoryBuffer()

  return (
    // Passing savedSignals and handlers down into TerminalFrame so the sidebar can render them
    <TerminalFrame savedSignals={savedSignals} onSelectDate={setDate} onErase={eraseSignal}>

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
        <SignalDisplay
          apodData={apodData}
          onSave={writeSignal}
          isSaved={isWritten(apodData.date)}
        />
      )}

    </TerminalFrame>
  )
}

export default App