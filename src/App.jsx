import { useState } from 'react'
import {
  Home, Film, Type, Music, Settings, Play, Pause, SkipBack, SkipForward,
  Volume2, Maximize, Download, Bell, Search, Sparkles, Send, Plus, Image,
  Mic, Layers, Scissors, ZoomIn, ZoomOut
} from 'lucide-react'
import './App.css'

const NAV_ITEMS = [
  { icon: Home, label: 'Home', active: true },
  { icon: Film, label: 'Media' },
  { icon: Type, label: 'Text' },
  { icon: Music, label: 'Audio' },
  { icon: Layers, label: 'Effects' },
  { icon: Settings, label: 'Settings' },
]

const HISTORY = [
  { name: 'Intro sequence', time: '2 min ago', hue: 260 },
  { name: 'Color grade pass', time: '8 min ago', hue: 220 },
  { name: 'Audio sync fix', time: '15 min ago', hue: 190 },
  { name: 'Title animation', time: '1 hr ago', hue: 300 },
]

const CHAT_MESSAGES = [
  { role: 'ai', text: 'Welcome to Vireonix AI! I can help you generate cinematic scene ideas, suggest transitions, and create visual concepts. What are you working on?' },
  { role: 'user', text: 'Generate cinematic scene ideas for a travel film in Japan' },
  { role: 'ai', text: 'Here are some cinematic concepts for your Japan travel film:\n\n1. Golden hour at Fushimi Inari shrine\n2. Rainy neon streets of Shibuya\n3. Zen garden with morning mist\n4. Bullet train time-lapse' },
]

const GENERATED_IMAGES = [
  { gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
]

const MIXER_CHANNELS = [
  { name: 'Master', level: 82, color: '#8b5cf6', muted: false, solo: false },
  { name: 'BGM', level: 65, color: '#34d399', muted: false, solo: false },
  { name: 'Voice', level: 70, color: '#fbbf24', muted: false, solo: true },
  { name: 'SFX', level: 45, color: '#f87171', muted: true, solo: false },
]

const WAVEFORM_HEIGHTS = [4, 8, 12, 6, 14, 10, 8, 16, 12, 6, 10, 14, 8, 4, 12, 10, 6, 14, 8, 12, 16, 10, 6, 8, 14, 12, 4, 10, 8, 6]

function App() {
  const [activeNav, setActiveNav] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [prompt, setPrompt] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [mixerState, setMixerState] = useState(MIXER_CHANNELS)

  const toggleMute = (idx) => {
    setMixerState(prev => prev.map((ch, i) =>
      i === idx ? { ...ch, muted: !ch.muted } : ch
    ))
  }

  const toggleSolo = (idx) => {
    setMixerState(prev => prev.map((ch, i) =>
      i === idx ? { ...ch, solo: !ch.solo } : ch
    ))
  }

  return (
    <div className="app-layout">
      {/* ===== TOP BAR ===== */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="app-logo">Vireonix One</span>
          <span className="project-title">Travel Film</span>
        </div>
        <div className="topbar-center">
          {['16:9', '9:16', '1:1'].map(ar => (
            <button
              key={ar}
              className={`aspect-btn ${aspectRatio === ar ? 'active' : ''}`}
              onClick={() => setAspectRatio(ar)}
            >{ar}</button>
          ))}
        </div>
        <div className="topbar-right">
          <div className="topbar-icon"><Search size={16} /></div>
          <div className="topbar-icon"><Bell size={16} /></div>
          <button className="btn-export">
            <Download size={14} />
            Export
          </button>
        </div>
      </header>

      {/* ===== ICON NAV ===== */}
      <nav className="icon-nav">
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`nav-icon ${activeNav === i ? 'active' : ''}`}
            onClick={() => setActiveNav(i)}
            title={item.label}
          >
            <item.icon size={18} />
          </div>
        ))}
      </nav>

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="left-sidebar">
        <div className="sidebar-section">
          <div className="sidebar-section-title">AI Prompt</div>
          <textarea
            className="prompt-box"
            placeholder="Describe your edit... e.g. 'Add cinematic color grade with warm tones'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="btn-generate">
            <Sparkles size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Generate Edit
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">History</div>
          {HISTORY.map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-thumb">
                <div className="history-thumb-inner" style={{
                  background: `linear-gradient(135deg, hsl(${item.hue}, 60%, 30%), hsl(${item.hue + 40}, 60%, 20%))`
                }} />
              </div>
              <div className="history-info">
                <div className="history-name">{item.name}</div>
                <div className="history-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Assets</div>
          <div className="asset-grid">
            {[Film, Image, Music, Mic, Scissors, Plus].map((Icon, i) => (
              <div key={i} className="asset-item">
                <div className="asset-item-inner">
                  <Icon size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <main className="main-area">
        {/* Video Preview */}
        <div className="canvas-container">
          <div className="video-preview">
            <div className="video-content">
              <div className="video-overlay-top">
                <span className="video-badge">{aspectRatio}</span>
                <span className="video-badge">1080p</span>
              </div>
              <div className="video-placeholder">
                <div className="video-placeholder-icon">
                  <Play size={24} />
                </div>
                <p>Travel Film - Japan</p>
                <span>Use the prompt to generate your first edit</span>
              </div>
            </div>
          </div>

          <div className="playback-controls">
            <button className="control-btn"><SkipBack size={14} /></button>
            <button className="play-btn" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
            </button>
            <button className="control-btn"><SkipForward size={14} /></button>
            <span className="time-display">00:35 / 02:48</span>
            <div className="scrubber-container">
              <div className="scrubber-progress">
                <div className="scrubber-handle" />
              </div>
            </div>
            <button className="control-btn"><Volume2 size={14} /></button>
            <button className="control-btn"><Maximize size={14} /></button>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline">
            <div className="timeline-header">
              <div className="timeline-header-left">
                <span className="timeline-title">Timeline</span>
              </div>
              <div className="timeline-zoom">
                <button><ZoomOut size={12} /></button>
                <button><ZoomIn size={12} /></button>
              </div>
            </div>

            <div className="timeline-ruler">
              {['0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45'].map(t => (
                <span key={t} className="ruler-mark">{t}</span>
              ))}
            </div>

            <div className="timeline-tracks">
              <div className="playhead" />

              <div className="timeline-track">
                <div className="track-label">
                  <span className="track-label-dot" style={{ background: '#8b5cf6' }} />
                  Video
                </div>
                <div className="track-content">
                  <div className="clip-block video selected" style={{ width: '30%' }}>
                    <Scissors size={10} style={{ marginRight: 4 }} />
                    Intro.mp4
                    <span className="clip-trim clip-trim-left" />
                    <span className="clip-trim clip-trim-right" />
                  </div>
                  <div className="clip-block video" style={{ width: '25%' }}>
                    Scene_02.mp4
                    <span className="clip-trim clip-trim-left" />
                    <span className="clip-trim clip-trim-right" />
                  </div>
                  <div className="clip-block video" style={{ width: '35%' }}>
                    Tokyo_night.mp4
                    <span className="clip-trim clip-trim-left" />
                    <span className="clip-trim clip-trim-right" />
                  </div>
                </div>
              </div>

              <div className="timeline-track">
                <div className="track-label">
                  <span className="track-label-dot" style={{ background: '#34d399' }} />
                  Audio
                </div>
                <div className="track-content">
                  <div className="clip-block audio" style={{ width: '70%' }}>
                    BGM
                    <div className="waveform">
                      {WAVEFORM_HEIGHTS.slice(0, 20).map((h, i) => (
                        <span key={i} className="waveform-bar" style={{ height: h }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-track">
                <div className="track-label">
                  <span className="track-label-dot" style={{ background: '#fbbf24' }} />
                  Voice
                </div>
                <div className="track-content">
                  <div className="clip-block voice" style={{ width: '40%', marginLeft: '15%' }}>
                    Narration
                    <div className="waveform">
                      {WAVEFORM_HEIGHTS.slice(5, 20).map((h, i) => (
                        <span key={i} className="waveform-bar" style={{ height: h }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mixer */}
        <div className="mixer-container">
          <div className="mixer">
            <div className="mixer-header">
              <span className="mixer-title">Audio Mixer</span>
            </div>
            <div className="mixer-channels">
              {mixerState.map((ch, i) => (
                <div key={ch.name} className="mixer-channel">
                  <span className="channel-name">{ch.name}</span>
                  <div className="channel-meter">
                    <div className="meter-bar-track">
                      <div className="meter-bar-fill" style={{
                        height: `${ch.muted ? 0 : ch.level}%`,
                        background: `linear-gradient(to top, ${ch.color}, ${ch.color}88)`
                      }} />
                    </div>
                    <div className="meter-bar-track">
                      <div className="meter-bar-fill" style={{
                        height: `${ch.muted ? 0 : Math.max(0, ch.level - 12)}%`,
                        background: `linear-gradient(to top, ${ch.color}, ${ch.color}88)`
                      }} />
                    </div>
                  </div>
                  <div className="channel-slider-container">
                    <input
                      type="range"
                      className="channel-slider"
                      min="0" max="100"
                      value={ch.level}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        setMixerState(prev => prev.map((c, j) =>
                          j === i ? { ...c, level: val } : c
                        ))
                      }}
                    />
                    <span className="channel-db">{ch.level > 0 ? `-${Math.round((100 - ch.level) * 0.6)}` : '-inf'} dB</span>
                  </div>
                  <div className="channel-buttons">
                    <button
                      className={`channel-btn mute ${ch.muted ? 'active' : ''}`}
                      onClick={() => toggleMute(i)}
                    >M</button>
                    <button
                      className={`channel-btn solo ${ch.solo ? 'active' : ''}`}
                      onClick={() => toggleSolo(i)}
                    >S</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ===== RIGHT PANEL - AI CHAT ===== */}
      <aside className="right-panel">
        <div className="chat-header">
          <div className="chat-header-icon">
            <Sparkles size={14} />
          </div>
          <div className="chat-header-text">
            <h3>AI Inspiration</h3>
            <p>Creative assistant</p>
          </div>
        </div>

        <div className="chat-messages">
          {CHAT_MESSAGES.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-images">
          {GENERATED_IMAGES.map((img, i) => (
            <div key={i} className="chat-image">
              <div className="chat-image-inner" style={{ background: img.gradient }} />
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <input
              className="chat-input"
              placeholder="Ask for creative ideas..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="chat-send-btn">
              <Send size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
