import TerminalFrame from './components/TerminalFrame'
import SignalDisplay from './components/SignalDisplay'
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

      {/* Passing the whole apodData object down - SignalDisplay handles all the rendering logic */}
      {apodData && !loading && (
        <SignalDisplay apodData={apodData} />
      )}

    </TerminalFrame>
  )
}

export default App