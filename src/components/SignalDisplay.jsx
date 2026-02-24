import { useState } from 'react'

function SignalDisplay({ apodData, onSave, isSaved }) {

  // This single boolean is the whole flip mechanism - true means show raw JSON, false means show media
  const [showRaw, setShowRaw] = useState(false)

  if (!apodData) return null

  const { title, url, hdurl, media_type, explanation, date, copyright } = apodData

  return (
    <div className="space-y-5">

      {/* Header row - metadata + action buttons */}
      <div>
        <p className="text-xs tracking-widest mb-3" style={{ color: '#4ade80' }}>
          ✓ SIGNAL ACQUIRED - DECODING TRANSMISSION
        </p>

        <h1 className="text-2xl leading-snug mb-3" style={{ color: '#e8eaf0' }}>
          {title}
        </h1>

        <div className="flex flex-wrap gap-4 py-2" style={{ borderTop: '1px solid #2e3248', borderBottom: '1px solid #2e3248' }}>
          <span className="text-xs" style={{ color: '#4a4f6a' }}>
            DATE: <span style={{ color: '#8b90a7' }}>{date}</span>
          </span>
          <span className="text-xs" style={{ color: '#4a4f6a' }}>
            TYPE: <span style={{ color: '#7b9cff' }}>{media_type.toUpperCase()}</span>
          </span>
          {copyright && (
            <span className="text-xs" style={{ color: '#4a4f6a' }}>
              © <span style={{ color: '#8b90a7' }}>{copyright.trim()}</span>
            </span>
          )}
        </div>
      </div>

      {/* Action buttons row - save + flip toggle sit side by side */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Write to buffer button */}
        <button
          onClick={() => onSave(apodData)}
          disabled={isSaved}
          className="text-xs px-3 py-1.5 rounded tracking-widest"
          style={{
            backgroundColor: isSaved ? '#1a1d27' : '#0f1117',
            border: `1px solid ${isSaved ? '#4a4f6a' : '#7b9cff'}`,
            color: isSaved ? '#4a4f6a' : '#7b9cff',
            cursor: isSaved ? 'default' : 'pointer',
          }}
        >
          {isSaved ? '✓ WRITTEN TO BUFFER' : '+ WRITE TO BUFFER'}
        </button>

        {/* The flip toggle - switches between decoded view and raw telemetry */}
        <button
          onClick={() => setShowRaw(prev => !prev)}
          className="text-xs px-3 py-1.5 rounded tracking-widest"
          style={{
            backgroundColor: showRaw ? '#22263a' : '#0f1117',
            border: `1px solid ${showRaw ? '#7b9cff' : '#2e3248'}`,
            color: showRaw ? '#7b9cff' : '#8b90a7',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#7b9cff'}
          onMouseLeave={e => e.currentTarget.style.borderColor = showRaw ? '#7b9cff' : '#2e3248'}
        >
          {showRaw ? '◈ DECODED VIEW' : '◇ RAW TELEMETRY'}
        </button>

      </div>

      {/* The flip - either show the raw JSON dump or the normal media + explanation */}
      {showRaw ? (
        <RawTelemetry apodData={apodData} />
      ) : (
        <DecodedView
          url={url}
          hdurl={hdurl}
          media_type={media_type}
          title={title}
          explanation={explanation}
        />
      )}

    </div>
  )
}

// --- RAW TELEMETRY VIEW ---
// Renders the full JSON payload exactly as NASA sent it - like reading raw serial output
function RawTelemetry({ apodData }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #2e3248' }}>

      <div className="px-3 py-1.5 flex items-center gap-2"
        style={{ backgroundColor: '#0f1117', borderBottom: '1px solid #2e3248' }}>
        <span className="text-xs tracking-widest" style={{ color: '#4a4f6a' }}>
          RAW JSON TELEMETRY - UNPROCESSED PAYLOAD
        </span>
      </div>

      {/* pre tag preserves whitespace and line breaks - perfect for JSON display */}
      {/* JSON.stringify with null, 2 formats it with 2-space indentation so it's readable */}
      <pre
        className="text-xs leading-6 p-4 overflow-auto"
        style={{
          backgroundColor: '#0f1117',
          color: '#7b9cff',
          maxHeight: '420px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {JSON.stringify(apodData, null, 2)}
      </pre>

    </div>
  )
}

// --- DECODED VIEW ---
// The normal rendered view - media on top, explanation below
function DecodedView({ url, hdurl, media_type, title, explanation }) {
  return (
    <div className="space-y-4">

      {media_type === 'image' && (
        <ImageDecoder url={url} hdurl={hdurl} title={title} explanation={explanation} />
      )}

      {media_type === 'video' && (
        <VideoDecoder url={url} title={title} explanation={explanation} />
      )}

      {media_type !== 'image' && media_type !== 'video' && (
        <div className="rounded p-4 text-xs tracking-widest"
          style={{ border: '1px solid #2e3248', color: '#8b90a7' }}>
          ⚠ UNKNOWN SIGNAL FORMAT: {media_type} - cannot decode
        </div>
      )}

    </div>
  )
}

// --- IMAGE DECODER ---
// On desktop: photo left, text right side by side
// On mobile: photo on top, explanation scrolls below
function ImageDecoder({ url, hdurl, title, explanation }) {
  const imageSource = hdurl || url

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* Photo column - on desktop takes up half, on mobile full width */}
      <div className="w-full md:w-1/2 rounded-lg overflow-hidden shrink-0"
        style={{ border: '1px solid #2e3248' }}>
        <img
          src={imageSource}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="px-3 py-1.5 text-xs"
          style={{ backgroundColor: '#0f1117', color: '#4a4f6a' }}>
          {hdurl ? 'HD TRANSMISSION RECEIVED' : 'STANDARD RESOLUTION SIGNAL'}
        </div>
      </div>

      {/* Text column - scrollable, fills the height of whatever the photo is */}
      <div
        className="text-sm leading-7 overflow-y-auto pr-2 md:w-1/2"
        style={{
          color: '#8b90a7',
          maxHeight: '420px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2e3248 #0f1117',
        }}
      >
        {explanation}
      </div>

    </div>
  )
}

// --- VIDEO DECODER ---
// Same side-by-side layout as images - video left, explanation right on desktop
function VideoDecoder({ url, title, explanation }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* Video column */}
      <div className="w-full md:w-1/2 rounded-lg overflow-hidden shrink-0"
        style={{ border: '1px solid #2e3248' }}>
        <div className="relative w-full aspect-video">
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="px-3 py-1.5 text-xs"
          style={{ backgroundColor: '#0f1117', color: '#4a4f6a' }}>
          VIDEO TRANSMISSION - EXTERNAL STREAM
        </div>
      </div>

      {/* Explanation column */}
      <div
        className="text-sm leading-7 overflow-y-auto pr-2 md:w-1/2"
        style={{
          color: '#8b90a7',
          maxHeight: '420px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2e3248 #0f1117',
        }}
      >
        {explanation}
      </div>

    </div>
  )
}

export default SignalDisplay