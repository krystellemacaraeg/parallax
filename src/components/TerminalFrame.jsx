import { useState } from 'react'
import MemoryBuffer from './MemoryBuffer'

function TerminalFrame({ children, savedSignals, onSelectDate, onErase }) {

  // This boolean controls whether the mobile drawer is open or closed
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="scanline-overlay min-h-screen font-mono" style={{ backgroundColor: '#0f1117', color: '#e8eaf0' }}>

      {/* Top bar */}
      <header style={{ borderBottom: '1px solid #2e3248' }} className="px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f87171', opacity: 0.7 }}></span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f59e0b', opacity: 0.7 }}></span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4ade80', opacity: 0.7 }}></span>
          <span className="text-xs tracking-widest ml-2" style={{ color: '#8b90a7' }}>
            PARALLAX // GROUND STATION
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs tracking-widest flex items-center gap-2" style={{ color: '#7b9cff' }}>
            <span className="animate-pulse">●</span>
            <span className="hidden sm:inline">SIGNAL NOMINAL</span>
          </span>

          {/* Hamburger - only visible on mobile */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-xs px-2 py-1 rounded"
            style={{ border: '1px solid #2e3248', color: '#8b90a7' }}
          >
            ☰ MENU
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex" style={{ minHeight: 'calc(100vh - 48px)' }}>

        {/* Sidebar - hidden on mobile, always visible on desktop */}
        <aside className="hidden md:flex w-56 p-5 flex-col gap-6 shrink-0" style={{ borderRight: '1px solid #2e3248' }}>
          <SidebarContent savedSignals={savedSignals} onSelectDate={onSelectDate} onErase={onErase} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-3 md:p-4">
          <div className="md:rounded-lg md:p-6 p-3 w-full" style={{ backgroundColor: '#1a1d27', border: '1px solid #2e3248' }}>
            {children}
          </div>
        </main>

      </div>

      {/* Mobile drawer overlay - sits on top of everything when open */}
      {/* The dark backdrop - tapping it closes the drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* The drawer panel itself - slides in from the left */}
      {/* translateX moves it off-screen when closed, back to 0 when open */}
      <div
        className="fixed top-0 left-0 h-full z-50 md:hidden flex flex-col p-5 gap-6 w-64"
        style={{
          backgroundColor: '#0f1117',
          borderRight: '1px solid #2e3248',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
        }}
      >
        {/* Drawer header with close button */}
        <div className="flex justify-between items-center">
          <span className="text-xs tracking-widest" style={{ color: '#4a4f6a' }}>
            GROUND STATION
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-xs px-2 py-1 rounded"
            style={{ border: '1px solid #2e3248', color: '#8b90a7' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Same sidebar content - reusing the component so nothing is duplicated */}
        <SidebarContent
          savedSignals={savedSignals}
          onSelectDate={(date) => { onSelectDate(date); setDrawerOpen(false) }}
          onErase={onErase}
        />

      </div>

      <footer className="px-6 py-2 text-xs tracking-widest" style={{ borderTop: '1px solid #2e3248', color: '#4a4f6a' }}>
        NASA APOD TERMINAL - PARALLAX v0.1.0
      </footer>

    </div>
  )
}

// Pulled sidebar content into its own component so both desktop and mobile drawer share it
// This way I only have to update one place if the sidebar content ever changes
function SidebarContent({ savedSignals, onSelectDate, onErase }) {
  return (
    <>
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

      <div style={{ borderTop: '1px solid #2e3248', paddingTop: '1rem' }}>
        <MemoryBuffer
          savedSignals={savedSignals}
          onSelectDate={onSelectDate}
          onErase={onErase}
        />
      </div>
    </>
  )
}

export default TerminalFrame