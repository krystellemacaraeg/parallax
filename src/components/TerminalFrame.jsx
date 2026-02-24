// TerminalFrame is the outer shell of the ground station - every screen will live inside this
function TerminalFrame({ children }) {
    return (
        // scanline-overlay activates the CRT sweep animation written in index.css
        <div className="scanline-overlay min-h-screen bg-station-black font-mono text-terminal-green p-4">
            {/* The top status bar - like a real terminal's title bar */}
            <header className="border border-terminal-dim rounded-t-md px-4 py-2 flex justify-between items-center">
                <span className="text-terminal-green text-sm tracking-widest">
                    ⬡ PARALLAX // GROUND STATION ACTIVE
                </span>
                {/* A little blinking dot to show the "connection" is live */}
                <span className="animate-pulse text-terminal-green text-xs">● SIGNAL NOMINAL</span> 
            </header>

            {/* Main content area - whatever passed intop this component renders here */}
            <main className="border border-t-0 border-terminal-dim rounded-b-md p-6">
                {children}
            </main>

            <footer className="mt-2 text-center text-terminal-dim text-xs tracking-widest">
                NASA APOD TERMINAL — PARALLAX v0.1.0
            </footer>

        </div>
    )
}

export default TerminalFrame