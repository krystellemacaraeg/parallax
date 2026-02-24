import TerminalFrame from './components/TerminalFrame'

function App() {
  return (
    <TerminalFrame>
      {/* Placeholer text - Phase 2 will replace this with real NASA data */}
      <p className="text-terminal-dim text-sm animate-pulse tracking-widest">
        &gt; AWAITING SIGNAL FROM SATELLITE...
      </p>
    </TerminalFrame>
  )
}

export default App