import TerminalFrame from './components/TerminalFrame'
import useAPOD from './hooks/useAPOD'

function App() {
  const { apodData, loading, error } = useAPOD()

  return (
    <TerminalFrame>

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
        <div className="space-y-4">

          <p className="text-xs tracking-widest" style={{ color: '#4ade80' }}>
            ✓ SIGNAL ACQUIRED — DECODING TRANSMISSION
          </p>

          <h1 className="text-2xl leading-snug" style={{ color: '#e8eaf0' }}>
            {apodData.title}
          </h1>

          <div className="flex gap-4 py-2" style={{ borderTop: '1px solid #2e3248', borderBottom: '1px solid #2e3248' }}>
            <span className="text-xs" style={{ color: '#4a4f6a' }}>
              DATE: <span style={{ color: '#8b90a7' }}>{apodData.date}</span>
            </span>
            <span className="text-xs" style={{ color: '#4a4f6a' }}>
              TYPE: <span style={{ color: '#7b9cff' }}>{apodData.media_type.toUpperCase()}</span>
            </span>
          </div>

          <p className="text-sm leading-7" style={{ color: '#8b90a7' }}>
            {apodData.explanation}
          </p>

        </div>
      )}

    </TerminalFrame>
  )
}

export default App