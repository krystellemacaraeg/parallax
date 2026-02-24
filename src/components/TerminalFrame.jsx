function TerminalFrame({ children }) {
  return (
    <div className="scanline-overlay min-h-screen font-mono" style={{ backgroundColor: '#0f1117', color: '#e8eaf0' }}>

      {/* Top bar */}
      <header style={{ borderBottom: '1px solid #2e3248' }} className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f87171', opacity: 0.7 }}></span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f59e0b', opacity: 0.7 }}></span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4ade80', opacity: 0.7 }}></span>
          <span className="text-xs tracking-widest ml-3" style={{ color: '#8b90a7' }}>
            PARALLAX // GROUND STATION
          </span>
        </div>
        <span className="text-xs tracking-widest flex items-center gap-2" style={{ color: '#7b9cff' }}>
          <span className="animate-pulse">●</span> SIGNAL NOMINAL
        </span>
      </header>

      {/* Sidebar + main */}
      <div className="flex" style={{ minHeight: 'calc(100vh - 48px)' }}>

        <aside className="w-56 p-5 flex flex-col gap-6 shrink-0" style={{ borderRight: '1px solid #2e3248' }}>
          <div>
            <p className="text-xs tracking-widest mb-2" style={{ color: '#4a4f6a' }}>SYSTEM</p>
            <p className="text-xs" style={{ color: '#8b90a7' }}>PARALLAX v0.1.0</p>
            <p className="text-xs" style={{ color: '#8b90a7' }}>NASA APOD API</p>
          </div>
          <div>
            <p className="text-xs tracking-widest mb-2" style={{ color: '#4a4f6a' }}>STATUS</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4ade80' }}></span>
              <span className="text-xs" style={{ color: '#8b90a7' }}>RECEIVER ONLINE</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#7b9cff' }}></span>
              <span className="text-xs" style={{ color: '#8b90a7' }}>DECODE READY</span>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest mb-2" style={{ color: '#4a4f6a' }}>MISSION</p>
            <p className="text-xs leading-relaxed" style={{ color: '#4a4f6a' }}>
              Capturing daily transmissions from the NASA APOD satellite.
            </p>
          </div>
        </aside>

        {/* Main card */}
        <main className="flex-1 p-6">
          <div className="rounded-lg p-6 max-w-3xl" style={{ backgroundColor: '#1a1d27', border: '1px solid #2e3248' }}>
            {children}
          </div>
        </main>

      </div>

      <footer className="px-6 py-2 text-xs tracking-widest" style={{ borderTop: '1px solid #2e3248', color: '#4a4f6a' }}>
        NASA APOD TERMINAL — PARALLAX v0.1.0
      </footer>

    </div>
  )
}

export default TerminalFrame