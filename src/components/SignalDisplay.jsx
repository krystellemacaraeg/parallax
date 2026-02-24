// This component has one job: look at what NASA sent and render the right media type
function SignalDisplay({ apodData }) {

  // Need to make sure the data actually exists before I try to show it
  if (!apodData) return null

  const { title, url, hdurl, media_type, explanation, date, copyright } = apodData

  return (
    <div className="space-y-5">

      {/* Status + metadata row */}
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
          {/* Copyright doesn't always exist in the API response, so check first */}
          {copyright && (
            <span className="text-xs" style={{ color: '#4a4f6a' }}>
              © <span style={{ color: '#8b90a7' }}>{copyright.trim()}</span>
            </span>
          )}
        </div>
      </div>

      {/* The decoder logic - switching to the video player if NASA didn't send an image today */}
      {media_type === 'image' && (
        <ImageDecoder url={url} hdurl={hdurl} title={title} />
      )}

      {media_type === 'video' && (
        <VideoDecoder url={url} title={title} />
      )}

      {/* Fallback for any unexpected media types NASA might send in the future */}
      {media_type !== 'image' && media_type !== 'video' && (
        <div className="rounded p-4 text-xs tracking-widest"
          style={{ border: '1px solid #2e3248', color: '#8b90a7' }}>
          ⚠ UNKNOWN SIGNAL FORMAT: {media_type} - cannot decode
        </div>
      )}

      {/* Capping the width at 65 characters per line — easier to read, less eye travel */}
      {/* Fixed height box with internal scroll so it doesn't push everything down */}
      <div
        className="text-sm leading-7 overflow-y-auto pr-2"
        style={{
          color: '#8b90a7',
          maxWidth: '100%',
          maxHeight: '180px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2e3248 #0f1117',
        }}
      >
        {explanation}
      </div>

    </div>
  )
}

// IMAGE DECODER
// Renders the APOD photo. I'm using hdurl when available since it's the full resolution shot
function ImageDecoder({ url, hdurl, title }) {
  // hdurl isn't always present in the API response, so fall back to the standard url
  const imageSource = hdurl || url

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #2e3248' }}>
      <img
        src={imageSource}
        alt={title}
        className="w-full object-cover"
        // Telling the browser to load the image lazily - no point fetching it until it's visible
        loading="lazy"
      />
      {/* Small label so I know which resolution I'm looking at */}
      <div className="px-3 py-1.5 text-xs" style={{ backgroundColor: '#0f1117', color: '#4a4f6a' }}>
        {hdurl ? 'HD TRANSMISSION RECEIVED' : 'STANDARD RESOLUTION SIGNAL'}
      </div>
    </div>
  )
}

// VIDEO DECODER
// NASA sometimes sends YouTube links - iframe is the cleanest way to embed these
function VideoDecoder({ url, title }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #2e3248' }}>
      {/*
        aspect-video is a Tailwind class that locks the iframe to a 16:9 ratio
        w-full makes it stretch to fill the card - important for responsiveness
      */}
      <div className="relative w-full aspect-video">
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full"
          // These allow attributes are required for YouTube embeds to work properly
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-3 py-1.5 text-xs" style={{ backgroundColor: '#0f1117', color: '#4a4f6a' }}>
        VIDEO TRANSMISSION - EXTERNAL STREAM
      </div>
    </div>
  )
}

export default SignalDisplay