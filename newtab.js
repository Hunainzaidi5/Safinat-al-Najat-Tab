// ============================================
// iOS New Tab Extension - JavaScript
// ============================================

// Default Settings - Comprehensive
const DEFAULT_SETTINGS = {
  userName: '',
  theme: 'system',
  accentColor: '#007AFF',
  // Motion / effects
  reduceMotion: false,
  // Stored by options UI today (future-tuning)
  blurIntensity: 20,
  // Clock settings
  hideClock: false,
  digitalClock: false,
  use12Hour: false,
  showSeconds: true,
  // Greeting settings
  showGreeting: true,
  showCustomText: true,
  // Search settings
  hideMic: false,
  hideEngines: false,
  voiceLanguage: 'auto',
  showQuotes: true,
  // Weather settings
  showWeather: true,
  useFahrenheit: false,
  weatherLocation: '',
  useGPS: false,
  weatherApiKey: '',
  // Apps settings
  showGoogleApps: true,
  adaptiveIcons: false,
  showTodoWidget: true,
  showStickyNotes: false,
  dockPosition: 'right',
  // Wallpaper
  wallpaper: '',
  // Wallpaper tuning (options UI)
  wallpaperEnabled: false,
  wallpaperUrl: '',
  wallpaperBlur: 0,
  wallpaperDim: 0,
  autoWallpaperEnabled: true,
  autoWallpaperTheme: 'minimal',
  prayerMadhab: 'jafari'
};

// Default custom dock apps - Users can fully customize
const DEFAULT_DOCK_APPS = [
  { id: 1, name: 'Gmail', url: 'https://mail.google.com/', icon: '', domain: 'gmail.com' },
  { id: 2, name: 'ITMIS', url: 'http://itmis.olmrts.com.pk/#/app/dashboard', icon: 'https://em-inventory-management.vercel.app/eminventory.png', domain: 'itmis.olmrts.com.pk' },
  { id: 3, name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: '', domain: 'whatsapp.com' },
  { id: 4, name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: '', domain: 'linkedin.com' },
  { id: 5, name: 'GitHub', url: 'https://www.github.com/', icon: '', domain: 'github.com' },
];

// Motivational Quotes
const quotes = [
  "Stay hungry, stay foolish. - Steve Jobs",
  "Focus creates results.",
  "Consistency beats intensity.",
  "Small steps still move you forward.",
  "Clarity turns effort into progress.",
  "Done is better than perfect.",
  "Simplicity scales.",
  "Discipline is choosing what matters most.",
  "Energy follows attention.",
  "You do not need more time, only less distraction.",
  "Start before you feel ready.",
  "Quality is a habit, not a mood.",
  "Protect your mornings, they shape your days.",
  "Progress compounds.",
  "Think long term, act today.",
  "The future depends on what you do today. - Mahatma Gandhi",
  "What you repeat, you become.",
  "If it matters, schedule it.",
  "Simple routines build extraordinary outcomes.",
  "Calm mind, sharp work."
];

const QUOTE_STATE_KEY = 'ios-newtab-quote-state';
let _quoteState = null;
let _quoteTransitionTimer = null;
let _quoteAnimating = false;
const QUOTE_TRANSITION_MS = 220;

// All 38 Google Apps
const allApps = [
  { name: 'Account', url: 'https://myaccount.google.com', domain: 'myaccount.google.com' },
  { name: 'YouTube', url: 'https://youtube.com', domain: 'youtube.com' },
  { name: 'Gmail', url: 'https://mail.google.com/', domain: 'gmail.com' },
  { name: 'ITMIS', url: 'http://itmis.olmrts.com.pk/#/app/dashboard', domain: 'itmis.olmrts.com.pk', icon: 'https://em-inventory-management.vercel.app/eminventory.png' },
  { name: 'WhatsApp', url: 'https://web.whatsapp.com/', domain: 'whatsapp.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/', domain: 'linkedin.com' },
  { name: 'GitHub', url: 'https://www.github.com/', domain: 'github.com' },
  { name: 'Maps', url: 'https://maps.google.com', domain: 'maps.google.com' },
  { name: 'YT Music', url: 'https://music.youtube.com', domain: 'music.youtube.com' },
  { name: 'Photos', url: 'https://photos.google.com', domain: 'photos.google.com' },
  { name: 'Calendar', url: 'https://calendar.google.com', domain: 'calendar.google.com' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', domain: 'openai.com' },
  { name: 'Drive', url: 'https://drive.google.com', domain: 'drive.google.com' },
  { name: 'Contacts', url: 'https://contacts.google.com', domain: 'contacts.google.com' },
  { name: 'News', url: 'https://news.google.com', domain: 'news.google.com' },
  { name: 'Sheets', url: 'https://sheets.google.com', domain: 'sheets.google.com' },
  { name: 'Translate', url: 'https://translate.google.com', domain: 'translate.google.com' },
  { name: 'Meet', url: 'https://meet.google.com', domain: 'meet.google.com' },
  { name: 'Chat', url: 'https://chat.google.com', domain: 'chat.google.com' },
  { name: 'Play', url: 'https://play.google.com', domain: 'play.google.com' },
  { name: 'Search', url: 'https://google.com', domain: 'google.com' },
  { name: 'Ad Center', url: 'https://myadcenter.google.com', domain: 'myadcenter.google.com' },
  { name: 'Shopping', url: 'https://shopping.google.com', domain: 'shopping.google.com' },
  { name: 'Business', url: 'https://business.google.com', domain: 'business.google.com' },
  { name: 'Docs', url: 'https://docs.google.com', domain: 'docs.google.com' },
  { name: 'Slides', url: 'https://slides.google.com', domain: 'slides.google.com' },
  { name: 'Forms', url: 'https://docs.google.com/forms', domain: 'docs.google.com' },
  { name: 'Finance', url: 'https://finance.google.com', domain: 'finance.google.com' },
  { name: 'Keep', url: 'https://keep.google.com', domain: 'keep.google.com' },
  { name: 'Passwords', url: 'https://passwords.google.com', domain: 'passwords.google.com' },
  { name: 'Google Ads', url: 'https://ads.google.com', domain: 'ads.google.com' },
  { name: 'Google One', url: 'https://one.google.com', domain: 'one.google.com' },
  { name: 'Travel', url: 'https://travel.google.com', domain: 'travel.google.com' },
  { name: 'Analytics', url: 'https://analytics.google.com', domain: 'analytics.google.com' },
  { name: 'Books', url: 'https://play.google.com/books', domain: 'play.google.com' },
  { name: 'Classroom', url: 'https://classroom.google.com', domain: 'classroom.google.com' },
  { name: 'Earth', url: 'https://earth.google.com', domain: 'earth.google.com' },
  { name: 'Blogger', url: 'https://www.blogger.com', domain: 'www.blogger.com' },
  { name: 'Saved', url: 'https://www.google.com/saved', domain: 'google.com' },
  { name: 'Arts', url: 'https://artsandculture.google.com', domain: 'artsandculture.google.com' },
  { name: 'Web Store', url: 'https://chrome.google.com/webstore', domain: 'chrome.google.com' }
];

// Weather icons
const weatherIcons = {
  'sunny': '☀️', 'clear': '☀️',
  'partly cloudy': '⛅', 'cloudy': '☁️', 'overcast': '☁️',
  'mist': '🌫️', 'fog': '🌫️', 'haze': '🌫️',
  'rain': '🌧️', 'light rain': '🌦️', 'heavy rain': '🌧️', 'drizzle': '🌦️', 'showers': '🌦️',
  'thunder': '⛈️', 'thunderstorm': '⛈️',
  'snow': '❄️', 'sleet': '🌨️', 'blizzard': '🌨️',
  'wind': '💨', 'windy': '💨'
};

const DEFAULT_ENGINE_ICON_LIGHT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666B74' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7.5'/%3E%3Cpath d='M20 20l-4.2-4.2'/%3E%3C/svg%3E";
const DEFAULT_ENGINE_ICON_DARK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F1F5FD' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7.5'/%3E%3Cpath d='M20 20l-4.2-4.2'/%3E%3C/svg%3E";

const SEARCH_ENGINES = Object.freeze({
  default: {
    id: 'default',
    label: 'Default',
    iconUrl: DEFAULT_ENGINE_ICON_DARK,
    useChromeDefault: true,
    buildUrl: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  },
  google: {
    id: 'google',
    label: 'Google',
    iconUrl: 'https://www.google.com/favicon.ico',
    buildUrl: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  },
  duckduckgo: {
    id: 'duckduckgo',
    label: 'DuckDuckGo',
    iconUrl: 'https://duckduckgo.com/favicon.ico',
    buildUrl: (query) => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
  },
  bing: {
    id: 'bing',
    label: 'Bing',
    iconUrl: 'https://www.bing.com/sa/simg/favicon-2x.ico',
    buildUrl: (query) => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
  },
  brave: {
    id: 'brave',
    label: 'Brave',
    iconUrl: 'https://brave.com/favicon.ico',
    buildUrl: (query) => `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    iconUrl: 'https://www.youtube.com/favicon.ico',
    buildUrl: (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
  },
});

let _appsGridInitialized = false;
let _appsGridItems = [];
let _appsFilterRafId = null;
let currentSearchEngine = 'default';
let _searchIconZoomAnimationTimer = null;
let _wallpaperSwapToken = 0;
let _wallpaperCurrentCssUrl = '';
let _randomWallpaperInFlight = false;
let _uiScrollRafPending = false;

// State
let settings = { ...DEFAULT_SETTINGS };
let customDockApps = [...DEFAULT_DOCK_APPS];
const GEOLOCATION_TOGGLE_KEY = 'useGeolocation';

const DEBUG = false;

// ============================================
// Security Utilities
// ============================================

// Input length limits
const INPUT_LIMITS = {
  userName: 22,
  todoText: 80,
  stickyNotes: 4000,
  dockAppName: 30,
  dockAppUrl: 2000,
  weatherLocation: 120,
  weatherApiKey: 80,
  maxDockApps: 10,
  maxTodos: 50,
  maxWallpaperBytes: 5 * 1024 * 1024,  // 5MB
  maxIconBytes: 512 * 1024,             // 512KB
  maxBackupBytes: 5 * 1024 * 1024,      // 5MB
};

// Strip HTML tags from text input (prevents XSS via textContent)
function sanitizeText(str, maxLen) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim().slice(0, maxLen || 200);
}

function collapseRepeatedProtocolPrefix(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  return trimmed.replace(/^(https?:\/\/){2,}/i, (match) => {
    const schemes = match.match(/https?:\/\//ig) || [];
    return schemes.length ? schemes[schemes.length - 1].toLowerCase() : match;
  });
}

// Validate URL strictly — must be http(s)
function validateUrl(url) {
  if (typeof url !== 'string') return { valid: false, message: 'URL must be a string.' };
  const trimmed = collapseRepeatedProtocolPrefix(url);
  if (!trimmed) return { valid: false, message: 'URL cannot be empty.' };
  if (trimmed.length > INPUT_LIMITS.dockAppUrl) return { valid: false, message: `URL too long (max ${INPUT_LIMITS.dockAppUrl} chars).` };

  // Block dangerous protocols
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:') || lower.startsWith('blob:')) {
    return { valid: false, message: 'Dangerous URL protocol blocked.' };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, message: 'Only https:// URLs are allowed.' };
    }

    // Security hardening: require HTTPS except localhost/private development.
    const host = (parsed.hostname || '').toLowerCase();
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (parsed.protocol === 'http:' && !isLocal) {
      return { valid: false, message: 'Use HTTPS URLs for security.' };
    }
    return { valid: true, url: parsed.toString() };
  } catch {
    // Try adding https://
    try {
      const parsed = new URL(`https://${trimmed}`);
      if (parsed.protocol === 'https:') {
        return { valid: true, url: parsed.toString() };
      }
    } catch {}
    return { valid: false, message: 'Invalid URL format. Example: https://example.com' };
  }
}

// Validate file upload (type + size)
function validateFileUpload(file, { allowedTypes, maxBytes, label }) {
  if (!file) return { valid: false, message: 'No file selected.' };
  if (allowedTypes && allowedTypes.length > 0) {
    const ext = (file.name || '').split('.').pop().toLowerCase();
    // Derive allowed extensions from MIME types (no hardcoded list)
    const mimeToExt = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/x-icon': 'ico', 'image/svg+xml': 'svg' };
    const allowedExts = allowedTypes.map(t => mimeToExt[t]).filter(Boolean);
    // Also accept 'jpeg' as alias for 'jpg'
    if (allowedExts.includes('jpg')) allowedExts.push('jpeg');
    const validType = allowedTypes.some(t => file.type === t) || allowedExts.includes(ext);
    if (!validType) {
      return { valid: false, message: `${label || 'File'}: unsupported format (${allowedExts.join(', ')}).` };
    }
  }
  if (maxBytes && file.size > maxBytes) {
    const sizeMB = (maxBytes / (1024 * 1024)).toFixed(1);
    return { valid: false, message: `${label || 'File'} too large (max ${sizeMB}MB). Please use a smaller file.` };
  }
  return { valid: true };
}

// Show a brief inline error message near an input element
function showInputError(inputEl, message, durationMs = 3000) {
  if (!inputEl) return;
  // Remove existing error tooltip
  const existing = inputEl.parentElement?.querySelector('.input-error-tooltip');
  if (existing) existing.remove();

  const tooltip = document.createElement('div');
  tooltip.className = 'input-error-tooltip';
  tooltip.textContent = message;
  tooltip.setAttribute('role', 'alert');

  // Style inline for safety (no CSS class needed)
  Object.assign(tooltip.style, {
    position: 'absolute',
    bottom: '-24px',
    left: '0',
    right: '0',
    fontSize: '11px',
    color: '#FF3B30',
    background: 'rgba(255,59,48,0.12)',
    padding: '3px 8px',
    borderRadius: '6px',
    zIndex: '200',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  // Make parent relative if not already
  const parent = inputEl.parentElement;
  if (parent && getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }
  if (parent) parent.appendChild(tooltip);

  // Pulse the input red briefly
  inputEl.style.outline = '2px solid #FF3B30';
  setTimeout(() => {
    inputEl.style.outline = '';
    if (tooltip.parentElement) tooltip.remove();
  }, durationMs);
}

// ============================================
// Lifecycle & Cleanup Management
// Prevents memory leaks on repeated page loads
// ============================================

// Tracked intervals - all intervals MUST be registered here
const _intervals = {
  clock: null,
  date: null,
  greeting: null,
  weather: null,
  quote: null,
  network: null,
  sessionTracker: null,
  prayers: null,
  prayersCountdown: null,
  tabAssistant: null,
  systemStats: null,
};

// Tracked timeouts
const _timeouts = {
  stickyNotesSave: null,
  clockAlign: null,
  weatherDebounce: null,
  ratePrompt: null,
  supportPrompt: null,
  feedbackPrompt: null,
  uiScroll: null,
  glassRestore: null,
};

// Tracked event listener references for removal
const _listeners = {
  storageChanged: null,
  themeChanged: null,
  appVisibilityChange: null,
  glassVisibilityChange: null,
  glassFocus: null,
  weatherVisibilityChange: null,
  pageShow: null,
  aiToolsClick: null,
  aiToolsResize: null,
  searchEngineDocClick: null,
  searchEngineKeydown: null,
  networkDocClick: null,
  networkOnline: null,
  networkOffline: null,
  networkConnectionChange: null,
};

let _networkConnectionTarget = null;
let _networkLastSampleAt = 0;
let _networkConnectedMs = 0;
let _networkEstimatedBytes = 0;
let _networkSpeedTestRunning = false;
let _miniCalendarOffsetMonths = 0;

// Initialization guard - prevents double-init
let _initialized = false;
// Unloading guard - prevents zombie async code from running after cleanup
let _unloading = false;

const GLASS_RESUME_DEBOUNCE_MS = 250;
let _lastGlassRestoreAt = 0;

const GLASS_REFRESH_SELECTOR = [
  '.glass',
  '.glass-card',
  '.dock',
  '.settings-panel',
  '.search-input-wrapper',
  '.clock-container.digital-mode .clock-face',
  '.todo-widget',
  '.sticky-notes',
  '.sticky-notes-fab',
  '.settings-btn',
  '.apps-modal'
].join(', ');

function forceSoftRepaint() {
  const body = document.body;
  if (!body) return;

  body.classList.add('glass-repaint-pulse');
  void body.offsetHeight;
  requestAnimationFrame(() => {
    body.classList.remove('glass-repaint-pulse');
  });
}

function restoreGlassEffect() {
  if (document.visibilityState !== 'visible') return;

  const targets = Array.from(document.querySelectorAll(GLASS_REFRESH_SELECTOR));
  if (!targets.length) {
    forceSoftRepaint();
    return;
  }

  const snapshots = targets.map((el) => ({
    el,
    backdrop: el.style.backdropFilter,
    webkitBackdrop: el.style.webkitBackdropFilter,
    transition: el.style.transition,
    willChange: el.style.willChange,
  }));

  snapshots.forEach(({ el, willChange }) => {
    el.style.transition = 'none';
    el.style.willChange = willChange ? `${willChange}, backdrop-filter` : 'backdrop-filter';
    el.style.backdropFilter = 'none';
    el.style.webkitBackdropFilter = 'none';
    void el.offsetHeight;
  });

  void document.body.offsetHeight;

  snapshots.forEach(({ el, backdrop, webkitBackdrop, transition, willChange }) => {
    el.style.backdropFilter = backdrop;
    el.style.webkitBackdropFilter = webkitBackdrop;
    el.style.transition = transition;
    el.style.willChange = willChange;
  });

  forceSoftRepaint();
}

function scheduleGlassRestore() {
  if (document.visibilityState !== 'visible') return;

  const now = Date.now();
  const elapsed = now - _lastGlassRestoreAt;
  const delay = elapsed >= GLASS_RESUME_DEBOUNCE_MS ? 80 : GLASS_RESUME_DEBOUNCE_MS;

  if (_timeouts.glassRestore) {
    try { clearTimeout(_timeouts.glassRestore); } catch (e) { /* ignore */ }
    _timeouts.glassRestore = null;
  }

  _timeouts.glassRestore = setTimeout(() => {
    _timeouts.glassRestore = null;
    _lastGlassRestoreAt = Date.now();
    restoreGlassEffect();
  }, delay);
}

function markUiScrolling() {
  const body = document.body;
  if (!body) return;

  if (_uiScrollRafPending) return;
  _uiScrollRafPending = true;

  requestAnimationFrame(() => {
    _uiScrollRafPending = false;
    body.classList.add('ui-scrolling');

    if (_timeouts.uiScroll) {
      try { clearTimeout(_timeouts.uiScroll); } catch (e) { /* ignore */ }
      _timeouts.uiScroll = null;
    }

    _timeouts.uiScroll = setTimeout(() => {
      _timeouts.uiScroll = null;
      body.classList.remove('ui-scrolling');
    }, 140);
  });
}

function bindScrollPerformance(container) {
  if (!container || container.dataset.scrollPerfBound === '1') return;
  container.dataset.scrollPerfBound = '1';

  const options = { passive: true };
  container.addEventListener('scroll', markUiScrolling, options);
  container.addEventListener('wheel', markUiScrolling, options);
  container.addEventListener('touchmove', markUiScrolling, options);
}

// Clear all tracked intervals
function clearAllIntervals() {
  Object.keys(_intervals).forEach(key => {
    if (_intervals[key] !== null) {
      try { clearInterval(_intervals[key]); } catch (e) { /* ignore */ }
      _intervals[key] = null;
    }
  });
}

// Clear all tracked timeouts
function clearAllTimeouts() {
  Object.keys(_timeouts).forEach(key => {
    if (_timeouts[key] !== null) {
      try { clearTimeout(_timeouts[key]); } catch (e) { /* ignore */ }
      _timeouts[key] = null;
    }
  });
}

// Remove all tracked event listeners
function removeAllListeners() {
  if (_listeners.storageChanged && hasChromeStorage() && chrome.storage.onChanged) {
    try { chrome.storage.onChanged.removeListener(_listeners.storageChanged); } catch (e) { /* ignore */ }
    _listeners.storageChanged = null;
  }
  if (_listeners.themeChanged) {
    try { window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', _listeners.themeChanged); } catch (e) { /* ignore */ }
    _listeners.themeChanged = null;
  }
  if (_listeners.appVisibilityChange) {
    try { document.removeEventListener('visibilitychange', _listeners.appVisibilityChange); } catch (e) { /* ignore */ }
    _listeners.appVisibilityChange = null;
  }
  if (_listeners.glassVisibilityChange) {
    try { document.removeEventListener('visibilitychange', _listeners.glassVisibilityChange); } catch (e) { /* ignore */ }
    _listeners.glassVisibilityChange = null;
  }
  if (_listeners.glassFocus) {
    try { window.removeEventListener('focus', _listeners.glassFocus); } catch (e) { /* ignore */ }
    _listeners.glassFocus = null;
  }
  if (_listeners.weatherVisibilityChange) {
    try { document.removeEventListener('visibilitychange', _listeners.weatherVisibilityChange); } catch (e) { /* ignore */ }
    _listeners.weatherVisibilityChange = null;
  }
  if (_listeners.pageShow) {
    try { window.removeEventListener('pageshow', _listeners.pageShow); } catch (e) { /* ignore */ }
    _listeners.pageShow = null;
  }
  if (_listeners.aiToolsClick) {
    try { document.removeEventListener('click', _listeners.aiToolsClick); } catch (e) { /* ignore */ }
    _listeners.aiToolsClick = null;
  }
  if (_listeners.aiToolsResize) {
    try { window.removeEventListener('resize', _listeners.aiToolsResize); } catch (e) { /* ignore */ }
    _listeners.aiToolsResize = null;
  }
  if (_listeners.searchEngineDocClick) {
    try { document.removeEventListener('click', _listeners.searchEngineDocClick); } catch (e) { /* ignore */ }
    _listeners.searchEngineDocClick = null;
  }
  if (_listeners.searchEngineKeydown) {
    try { document.removeEventListener('keydown', _listeners.searchEngineKeydown); } catch (e) { /* ignore */ }
    _listeners.searchEngineKeydown = null;
  }
  if (_listeners.networkDocClick) {
    try { document.removeEventListener('click', _listeners.networkDocClick); } catch (e) { /* ignore */ }
    _listeners.networkDocClick = null;
  }
  if (_listeners.networkOnline) {
    try { window.removeEventListener('online', _listeners.networkOnline); } catch (e) { /* ignore */ }
    _listeners.networkOnline = null;
  }
  if (_listeners.networkOffline) {
    try { window.removeEventListener('offline', _listeners.networkOffline); } catch (e) { /* ignore */ }
    _listeners.networkOffline = null;
  }
  if (_listeners.networkConnectionChange && _networkConnectionTarget && typeof _networkConnectionTarget.removeEventListener === 'function') {
    try { _networkConnectionTarget.removeEventListener('change', _listeners.networkConnectionChange); } catch (e) { /* ignore */ }
  }
  _listeners.networkConnectionChange = null;
  _networkConnectionTarget = null;
}

// Clear all images to release memory
function clearAllImages() {
  document.querySelectorAll('img').forEach(resetImgElement);
}

// Clear heavy DOM content
function clearHeavyContent() {
  // NOTE: We intentionally do NOT clear wallpaper.style.backgroundImage here.
  // The browser frees this memory when the page unloads. Clearing it causes
  // a race condition where zombie async init code sees empty wallpaper and
  // removes the ios-newtab-has-wallpaper localStorage flag, breaking the
  // fast-load hint for the next new tab.
  
  // Clear dock icons
  const dockIcons = document.querySelectorAll('.dock img, .apps-grid img');
  dockIcons.forEach(resetImgElement);
}

function resetImgElement(img) {
  if (!img) return;
  try {
    img.onload = null;
    img.onerror = null;
  } catch {
    // ignore
  }
  // Don't clear img.src — that causes broken-image placeholders in Chromium.
  // Just detach handlers; the browser handles memory for navigated-away pages.
}

// Full cleanup on page hide/unload
function cleanupForUnload() {
  if (_unloading) return;
  _unloading = true;
  if (_quoteTransitionTimer) {
    try { clearTimeout(_quoteTransitionTimer); } catch (e) { /* ignore */ }
    _quoteTransitionTimer = null;
  }
  _quoteAnimating = false;
  stopClockTimer();
  clearAllIntervals();
  clearAllTimeouts();
  removeAllListeners();
  stopGeolocationWatch();
  clearHeavyContent();
  _initialized = false;
}

// Register pagehide handler immediately (unload is deprecated, don't use it)
window.addEventListener('pagehide', cleanupForUnload, { capture: true });

// For Chrome New Tab: use freeze event (BFCache)
document.addEventListener('freeze', cleanupForUnload, { capture: true });

// Re-initialize when tab becomes visible again after cleanup
// Also toggle .tab-hidden class to pause CSS animations (battery saver)
if (!_listeners.appVisibilityChange) {
  _listeners.appVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      document.documentElement.classList.remove('tab-hidden');
      scheduleGlassRestore();

      // Recover critical runtime systems after tab resume/throttling.
      updateClock(new Date());
      restoreFavicons();
      refreshWeatherIfNeeded();

      if (!_initialized) {
        _initialized = true;
        void runFullInit('visibilitychange');
      }
    } else {
      document.documentElement.classList.add('tab-hidden');
    }
  };
  document.addEventListener('visibilitychange', _listeners.appVisibilityChange);
}

function initGlassResumeListeners() {
  if (!_listeners.glassVisibilityChange) {
    _listeners.glassVisibilityChange = () => {
      if (document.hidden) return;
      scheduleGlassRestore();
    };
    document.addEventListener('visibilitychange', _listeners.glassVisibilityChange);
  }

  if (!_listeners.glassFocus) {
    _listeners.glassFocus = () => {
      if (document.visibilityState !== 'visible') return;
      scheduleGlassRestore();
    };
    window.addEventListener('focus', _listeners.glassFocus);
  }
}

initGlassResumeListeners();

// When returning via back/forward cache, visibilitychange may not fire.
// pageshow is the reliable signal to restore cleared images/UI.
if (!_listeners.pageShow) {
  _listeners.pageShow = (e) => {
    if (_initialized) return;
    _initialized = true;
    void runFullInit(e && e.persisted ? 'pageshow-bfcache' : 'pageshow');
  };
  window.addEventListener('pageshow', _listeners.pageShow);
}

// ============================================
// Engagement Prompts (rate / support / feedback)
// ============================================
// NOTE: runFullInit() calls these three, but no rate/support/feedback
// banner markup exists in newtab.html or newtab.css in this build — the
// prompt UI itself appears to have been removed at some point while these
// call sites were left behind, which is what caused the
// "maybeShowRatePrompt is not defined" crash. These implementations are
// safe placeholders: they track cadence (so a real UI can be wired in
// later without redoing this bookkeeping) but render nothing yet.

const ENGAGEMENT_PROMPT_STATE_KEY = 'ios-newtab-engagement-prompts';
const ENGAGEMENT_PROMPT_MIN_INTERVAL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function loadEngagementPromptState() {
  try {
    const raw = localStorage.getItem(ENGAGEMENT_PROMPT_STATE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveEngagementPromptState(state) {
  try {
    localStorage.setItem(ENGAGEMENT_PROMPT_STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
}

// Returns true (and records a visit) the first time this cadence check is
// due; returns false otherwise. Keeps each prompt independent via `key`.
function isEngagementPromptDue(key, minIntervalMs = ENGAGEMENT_PROMPT_MIN_INTERVAL_MS) {
  const state = loadEngagementPromptState();
  const now = Date.now();
  const entry = state[key] && typeof state[key] === 'object' ? state[key] : { visits: 0, lastShownAt: 0 };

  entry.visits = (Number(entry.visits) || 0) + 1;
  const dismissed = !!entry.dismissed;
  const due = !dismissed && (now - (Number(entry.lastShownAt) || 0)) >= minIntervalMs && entry.visits >= 3;

  if (due) entry.lastShownAt = now;
  state[key] = entry;
  saveEngagementPromptState(state);

  return due;
}

async function maybeShowRatePrompt() {
  try {
    if (!isEngagementPromptDue('rate')) return;
    // No rate-prompt UI is wired up in this build yet — tracked so a
    // future banner/modal can pick up here without redoing cadence logic.
  } catch (e) {
    console.error('maybeShowRatePrompt error:', e);
  }
}

async function maybeShowSupportPrompt() {
  try {
    if (!isEngagementPromptDue('support')) return;
    // No support-prompt UI is wired up in this build yet.
  } catch (e) {
    console.error('maybeShowSupportPrompt error:', e);
  }
}

async function maybeShowFeedbackPrompt() {
  try {
    if (!isEngagementPromptDue('feedback')) return;
    // No feedback-prompt UI is wired up in this build yet.
  } catch (e) {
    console.error('maybeShowFeedbackPrompt error:', e);
  }
}

async function runFullInit(source = 'init') {
  const initTimerLabel = `init:${source}`;
  try {
    if (console && typeof console.time === 'function') console.time(initTimerLabel);
    _unloading = false;
    await loadSettings();

    // Abort if page started unloading while we were awaiting settings.
    // This prevents zombie init from running applyWallpaper() with empty
    // settings and erasing the ios-newtab-has-wallpaper fast-load flag.
    if (_unloading) return;

    // ── Restore-reload detection ──────────────────────────────────────────
    // When a backup restore triggers a reload, this flag tells the page to
    // log the context clearly and trust restored positions unconditionally.
    const isRestoreReload = sessionStorage.getItem('widget-restore-reload');
    if (isRestoreReload) {
      console.log('=== RESTORE RELOAD DETECTED ===');
      console.log('Page reloaded after backup restore — will apply restored positions');
      console.log('Stored widget layouts:', getStoredJson(WIDGET_LAYOUTS_KEY, {}));
      console.log('Stored widget sizes:',   getStoredJson(WIDGET_SIZES_KEY,   {}));
      sessionStorage.removeItem('widget-restore-reload');
    }
    // ─────────────────────────────────────────────────────────────────────

    initClock();
    initDate();
    initGreeting();
    initSearch();
    initWeather();
    initAutoWallpaper();
    initPrayerTimesWidget();
    initTabAssistantWidget();
    initNetworkInfoWidget();

    // Widget inits delayed by 100 ms to avoid race conditions where
    // localStorage writes from a restore haven't propagated yet, or where
    // other layout-affecting inits (dock, wallpaper, theme) haven't run.
    setTimeout(() => {
      initMovableWidgets();
      initSessionTrackerWidget();
      initScreenshotNoteWidget();
    }, 100);

    initDock();
    initAiTools();
    initSettingsPanel();
    initWidgetManager();
    initDockAppsSettings();
    initModals();
    initTodo();
    initStickyNotes();
    initEscapeKeyHandler();
    startQuoteInterval();
    initQuoteInteractions();
    applyTheme();
    applyAccentColor();
    applyWallpaper();
    applyAllSettings();

    
    // Rate prompt: count immediately (works even with rapid refresh)
    void maybeShowRatePrompt();

    // Support prompt: optional cadence
    void maybeShowSupportPrompt();

    // Feedback prompt: user feature request form cadence
    void maybeShowFeedbackPrompt();

    // Live-update when Options/settings pages save settings
    if (hasChromeStorage() && chrome.storage.onChanged) {
      if (!_listeners.storageChanged) {
        _listeners.storageChanged = (changes, areaName) => {
          if (areaName !== 'local') return;
          if (!changes.settings) return;

          const mapped = mapOptionsSettingsToNewtab(changes.settings.newValue);
          settings = { ...settings, ...sanitizeLoadedSettings(mapped) };
          applyMotionToggles();
          applyTheme();
          applyAccentColor();
          applyAllSettings();
        };
        chrome.storage.onChanged.addListener(_listeners.storageChanged);
      }
    }

    // Track theme change listener
    if (!_listeners.themeChanged) {
      _listeners.themeChanged = () => { if (settings.theme === 'system') applyTheme(); };
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', _listeners.themeChanged);
    }
  } catch (e) {
    console.error(source === 'init' ? 'Init error:' : `Re-init error (${source}):`, e);
  } finally {
    if (console && typeof console.timeEnd === 'function') console.timeEnd(initTimerLabel);
  }
}

// Debug helper - call window.__memDebug() in console to check status
if (DEBUG) {
  window.__memDebug = function() {
    const activeIntervals = Object.entries(_intervals).filter(([k,v]) => v !== null).map(([k]) => k);
    const activeTimeouts = Object.entries(_timeouts).filter(([k,v]) => v !== null).map(([k]) => k);
    const activeListeners = Object.entries(_listeners).filter(([k,v]) => v !== null).map(([k]) => k);
    const heap = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 'N/A';
    console.log('=== Memory Debug ===');
    console.log('Heap (MB):', heap);
    console.log('Active intervals:', activeIntervals.length ? activeIntervals.join(', ') : 'none');
    console.log('Active timeouts:', activeTimeouts.length ? activeTimeouts.join(', ') : 'none');
    console.log('Active listeners:', activeListeners.length ? activeListeners.join(', ') : 'none');
    console.log('Initialized:', _initialized);
    console.log('Geo watch ID:', geoWatchId);
    console.log('DOM nodes:', document.querySelectorAll('*').length);
      return { heap, activeIntervals, activeTimeouts, activeListeners, initialized: _initialized };
  };
}

// ============================================
// App Icon Helpers
// ============================================

function normalizeUrlForFavicon(rawUrl) {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = collapseRepeatedProtocolPrefix(rawUrl);
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    // Common during editing: allow "example.com" or "www.example.com"
    try {
      const parsed = new URL(`https://${trimmed}`);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
      return parsed.toString();
    } catch {
      return null;
    }
  }
}

function getHostnameFromAnyUrl(rawUrl) {
  const normalized = normalizeUrlForFavicon(rawUrl);
  if (!normalized) return null;
  try {
    return new URL(normalized).hostname;
  } catch {
    return null;
  }
}

const FAVICON_CACHE_KEY = 'ios-newtab-favicon-cache';
const FAVICON_CACHE_MAX_ENTRIES = 200;
let _faviconCache = null;

function isIpv4Hostname(hostname) {
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname || '');
}

function getBaseDomainFromHostname(hostname) {
  if (typeof hostname !== 'string') return '';
  const host = hostname.trim().toLowerCase();
  if (!host) return '';

  if (host === 'localhost' || isIpv4Hostname(host)) return host;

  const parts = host.split('.').filter(Boolean);
  if (parts.length <= 2) return host;

  // Common multi-part public suffixes where registrable domain needs 3 labels.
  const twoPartSuffixes = new Set([
    'co.uk', 'org.uk', 'ac.uk', 'gov.uk',
    'co.in', 'org.in', 'net.in',
    'com.au', 'net.au', 'org.au',
    'co.jp', 'ne.jp', 'or.jp'
  ]);

  const tail = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  if (parts.length >= 3 && twoPartSuffixes.has(tail)) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

function getBaseDomain(rawUrl) {
  const hostname = getHostnameFromAnyUrl(rawUrl);
  if (!hostname) return '';
  return getBaseDomainFromHostname(hostname);
}

function loadFaviconCache() {
  if (_faviconCache && typeof _faviconCache === 'object') return _faviconCache;
  try {
    const raw = localStorage.getItem(FAVICON_CACHE_KEY);
    if (!raw) {
      _faviconCache = {};
      return _faviconCache;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      _faviconCache = {};
      return _faviconCache;
    }
    _faviconCache = parsed;
    return _faviconCache;
  } catch {
    _faviconCache = {};
    return _faviconCache;
  }
}

function saveFaviconCache() {
  try {
    if (!_faviconCache || typeof _faviconCache !== 'object') return;
    localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(_faviconCache));
  } catch {
    // ignore cache write failures
  }
}

function getCachedFaviconUrl(hostname) {
  if (typeof hostname !== 'string' || !hostname) return '';
  const cache = loadFaviconCache();
  const key = hostname.toLowerCase();
  const value = cache[key];
  return typeof value === 'string' ? value : '';
}

function isGenericGoogleFallbackFavicon(iconUrl) {
  if (typeof iconUrl !== 'string' || !iconUrl) return false;
  try {
    const parsed = new URL(iconUrl);
    const host = parsed.hostname.toLowerCase();
    if (host !== 'www.google.com' && host !== 'google.com') return false;
    if (!parsed.pathname.startsWith('/s2/favicons')) return false;
    const domain = (parsed.searchParams.get('domain') || '').toLowerCase();
    return domain === 'google.com';
  } catch {
    return false;
  }
}

function shouldUseCachedFaviconForHost(hostname, iconUrl) {
  if (typeof hostname !== 'string' || !hostname) return false;
  if (typeof iconUrl !== 'string' || !iconUrl) return false;

  const host = hostname.toLowerCase();
  if (isGenericGoogleFallbackFavicon(iconUrl)) {
    return host === 'google.com' || host === 'www.google.com';
  }
  return true;
}

function setCachedFaviconUrl(hostname, iconUrl) {
  if (typeof hostname !== 'string' || !hostname) return;
  if (typeof iconUrl !== 'string' || !/^https?:\/\//i.test(iconUrl)) return;
  const cache = loadFaviconCache();
  const key = hostname.toLowerCase();
  cache[key] = iconUrl;

  const keys = Object.keys(cache);
  if (keys.length > FAVICON_CACHE_MAX_ENTRIES) {
    // Drop oldest-like keys deterministically to cap storage growth.
    // (Object key order preserves insertion order for string keys.)
    const overflow = keys.length - FAVICON_CACHE_MAX_ENTRIES;
    for (let i = 0; i < overflow; i += 1) {
      delete cache[keys[i]];
    }
  }

  _faviconCache = cache;
  saveFaviconCache();
}

function dedupeStrings(items) {
  const out = [];
  const seen = new Set();
  (items || []).forEach((item) => {
    if (typeof item !== 'string') return;
    const trimmed = item.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    out.push(trimmed);
  });
  return out;
}

function generateDefaultAppIcon() {
  return svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#7A8798"/>
          <stop offset="1" stop-color="#4F5B6A"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#g)"/>
      <path d="M32 13c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19zm0 4c6.2 0 11.6 3.6 14.1 8.9H17.9C20.4 20.6 25.8 17 32 17zm-14.9 13h29.8a15.4 15.4 0 0 1-2.6 8.3H19.7a15.4 15.4 0 0 1-2.6-8.3zm3.4 12.3h23c-2.8 2.9-6.7 4.7-11.5 4.7s-8.7-1.8-11.5-4.7z" fill="rgba(255,255,255,0.92)"/>
    </svg>`
  );
}

function getGoogleProductIconForUrl(rawUrl) {
  const normalized = normalizeUrlForFavicon(rawUrl);
  if (!normalized) return null;

  let hostname = null;
  let pathname = '/';
  try {
    const parsed = new URL(normalized);
    hostname = parsed.hostname;
    pathname = parsed.pathname || '/';
  } catch {
    return null;
  }

  // Microsoft Copilot - use their official icon
  if (hostname === 'copilot.microsoft.com' || hostname === 'www.copilot.microsoft.com') {
    return 'https://www.google.com/s2/favicons?sz=64&domain=bing.com';
  }

  // Perplexity AI
  if (hostname === 'www.perplexity.ai' || hostname === 'perplexity.ai') {
    return 'https://www.google.com/s2/favicons?sz=64&domain=perplexity.ai';
  }

  // Perchance
  if (hostname === 'www.perchance.org' || hostname === 'perchance.org') {
    return 'https://www.google.com/s2/favicons?sz=64&domain=perchance.org';
  }

  // Verified stable gstatic product icons (HEAD 200 in this workspace).
  const base = 'https://www.gstatic.com/images/branding/product/2x';

  // Account / profile (myaccount doesn't reliably expose a favicon)
  if (hostname === 'myaccount.google.com' || hostname === 'accounts.google.com') {
    return 'https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_48dp.png';
  }

  // Common Google product icons
  if (hostname === 'maps.google.com') return `${base}/maps_48dp.png`;
  if (hostname === 'music.youtube.com') return `${base}/youtube_music_48dp.png`;
  if (hostname === 'translate.google.com') return `${base}/translate_48dp.png`;
  if (hostname === 'calendar.google.com') return `${base}/calendar_48dp.png`;
  if (hostname === 'photos.google.com') return `${base}/photos_48dp.png`;
  // Use productlogos for exact modern Meet/Chat icons (the product/2x ones are not exact).
  if (hostname === 'meet.google.com') {
    return 'https://www.gstatic.com/images/branding/productlogos/meet_2020q4/v8/web-48dp/logo_meet_2020q4_color_2x_web_48dp.png';
  }
  if (hostname === 'chat.google.com') {
    return 'https://www.gstatic.com/images/branding/productlogos/chat_2020q4/v8/web-48dp/logo_chat_2020q4_color_2x_web_48dp.png';
  }
  if (hostname === 'news.google.com') return `${base}/news_48dp.png`;
  if (hostname === 'shopping.google.com') return `${base}/shopping_48dp.png`;
  if (hostname === 'analytics.google.com') return `${base}/analytics_96dp.png`;
  if (hostname === 'ads.google.com') return 'https://www.gstatic.com/images/branding/productlogos/ads/v5/192px.svg';
  if (hostname === 'travel.google.com') return 'https://www.gstatic.com/travel-trips-fe/travel_logo_192.png';
  // Google Business Profile ("Business" in the apps grid)
  if (hostname === 'business.google.com') return `${base}/google_my_business_48dp.png`;

  if (hostname === 'drive.google.com') return `${base}/drive_2020q4_48dp.png`;
  if (hostname === 'docs.google.com') {
    if (pathname.startsWith('/forms')) return `${base}/forms_2020q4_48dp.png`;
    return `${base}/docs_2020q4_48dp.png`;
  }
  if (hostname === 'sheets.google.com') return `${base}/sheets_2020q4_48dp.png`;
  if (hostname === 'slides.google.com') return `${base}/slides_2020q4_48dp.png`;
  if (hostname === 'keep.google.com') return `${base}/keep_2020q4_48dp.png`;
  if (hostname === 'mail.google.com') return `${base}/gmail_2020q4_48dp.png`;
  if (hostname === 'classroom.google.com') return `${base}/classroom_48dp.png`;
  if (hostname === 'passwords.google.com') return `${base}/password_manager_48dp.png`;
  if (hostname === 'contacts.google.com') return `${base}/contacts_48dp.png`;
  if (hostname === 'myadcenter.google.com') return `${base}/my_ad_center_48dp.png`;
  if (hostname === 'play.google.com' && pathname.startsWith('/books')) return `${base}/play_books_48dp.png`;
  if (hostname === 'books.google.com') return `${base}/play_books_48dp.png`;
  if (hostname === 'forms.gle') return `${base}/forms_2020q4_48dp.png`;

  // Chrome Web Store (old domain). No stable product-specific asset found here; use Chrome icon.
  if (hostname === 'chrome.google.com' && pathname.startsWith('/webstore')) return `${base}/chrome_48dp.png`;

  return null;
}

function svgDataUrl(svg) {
  if (typeof svg !== 'string' || !svg.trim()) return '';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getBuiltInIconForGooglePath(hostname, pathname) {
  const hostKey = hostname && hostname.startsWith('www.') ? hostname.slice(4) : hostname;
  if (hostKey !== 'google.com') return '';

  const safePath = typeof pathname === 'string' ? pathname : '/';

  // Use official service assets for Search/Saved on google.com paths.
  if (safePath.startsWith('/saved')) {
    return 'https://www.gstatic.com/save/icons/light/empty-light@2x.png';
  }

  // Search (google.com root)
  return 'https://www.gstatic.com/images/branding/productlogos/googleg/v6/192px.svg';
}

function getFaviconCandidates(rawUrl) {
  const normalized = normalizeUrlForFavicon(rawUrl);
  const candidates = [];

  const hostname = normalized ? getHostnameFromAnyUrl(normalized) : getHostnameFromAnyUrl(rawUrl);
  if (!hostname) {
    return ['https://www.google.com/s2/favicons?sz=64&domain=google.com'];
  }

  const host = hostname.toLowerCase();
  const baseDomain = getBaseDomainFromHostname(host) || host;

  let parsedPathname = '/';
  try {
    if (normalized) parsedPathname = new URL(normalized).pathname || '/';
  } catch {
    parsedPathname = '/';
  }

  // For direct google.com paths (Search/Saved), use a path-aware built-in icon
  // so we do not fall back to the generic Google "G" icon.
  const builtInGooglePathIcon = getBuiltInIconForGooglePath(host, parsedPathname);
  if (builtInGooglePathIcon) {
    candidates.push(builtInGooglePathIcon);
  }

  // Use Google product icons for known Google services
  const googleProductIcon = getGoogleProductIconForUrl(normalized || rawUrl);
  if (googleProductIcon) {
    candidates.push(googleProductIcon);
  }

  // Optional fast-path: use previously successful icon URL after explicit
  // product/path mappings so stale cache cannot override official icons.
  const cached = getCachedFaviconUrl(host);
  if (cached && shouldUseCachedFaviconForHost(host, cached)) {
    candidates.push(cached);
  }

  const isGoogleSubdomain = host.endsWith('.google.com') && host !== 'google.com';

  // 1) Primary favicon API candidates.
  // For Google subdomains, prefer hostname lookup first because using
  // baseDomain=google.com often resolves to the generic "G" icon.
  if (isGoogleSubdomain) {
    candidates.push(`https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(host)}`);
    candidates.push(`https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(baseDomain)}`);
  } else {
    candidates.push(`https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(baseDomain)}`);
    if (baseDomain !== host) {
      candidates.push(`https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(host)}`);
    }
  }

  // 2) Secondary: direct favicon from the host.
  candidates.push(`https://${host}/favicon.ico`);

  // Secondary fallback: direct favicon from normalized base domain.
  if (baseDomain !== host) {
    candidates.push(`https://${baseDomain}/favicon.ico`);
  }

  // 3) Final remote fallback: generic Google favicon endpoint.
  candidates.push('https://www.google.com/s2/favicons?sz=64&domain=google.com');

  return dedupeStrings(candidates);
}

function saveLastWeather(payload) {
  try {
    localStorage.setItem('ios-newtab-last-weather', JSON.stringify({
      t: Date.now(),
      v: payload
    }));
  } catch {
    // ignore
  }
}

function loadLastWeather(maxAgeMs = 2 * 60 * 60 * 1000) {
  try {
    const raw = localStorage.getItem('ios-newtab-last-weather');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !isPlainObject(parsed) || !parsed.v || !isPlainObject(parsed.v)) return null;
    if (typeof parsed.t === 'number' && Number.isFinite(parsed.t) && maxAgeMs > 0) {
      if (Date.now() - parsed.t > maxAgeMs) return null;
    }
    // Validate essential fields
    const v = parsed.v;
    if (typeof v.tempC !== 'number' || typeof v.feelsC !== 'number') return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Generate a colourful letter-icon SVG data URL as a guaranteed-to-render fallback.
 */
function generateLetterIcon(name) {
  const letter = (name || '?').charAt(0).toUpperCase();
  const palette = [
    '#FF3B30','#FF9500','#FFCC00','#34C759','#00C7BE',
    '#30B0C7','#007AFF','#5856D6','#AF52DE','#FF2D55'
  ];
  const color = palette[letter.charCodeAt(0) % palette.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${color}"/>
    <text x="32" y="32" text-anchor="middle" dominant-baseline="central"
      font-family="-apple-system,BlinkMacSystemFont,sans-serif"
      font-size="28" font-weight="600" fill="white">${letter}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function attachIconFallback(img, candidates, options = {}) {
  if (!img || !Array.isArray(candidates) || candidates.length === 0) return;

  const fallbackName = options.name || img.alt || '?';
  const cacheHost = typeof options.cacheHost === 'string' ? options.cacheHost.toLowerCase() : '';
  const defaultIcon = options.defaultIcon || generateDefaultAppIcon();

  // Limit candidates to prevent excessive retries
  const limitedCandidates = dedupeStrings(candidates).slice(0, 6);
  let index = 0;
  let settled = false;
  let activeCandidate = '';

  const cleanup = () => {
    settled = true;
    img.onerror = null;
    img.onload = null;
  };

  const advance = () => {
    index += 1;
    if (index < limitedCandidates.length) {
      activeCandidate = limitedCandidates[index];
      img.src = activeCandidate;
    } else {
      // All remote candidates failed — show stable local fallback icon.
      img.src = defaultIcon || generateLetterIcon(fallbackName);
      cleanup();
    }
  };

  img.onerror = function () {
    if (settled) return;
    advance();
  };

  img.onload = function () {
    if (settled) return;
    if (cacheHost && /^https?:\/\//i.test(activeCandidate) && shouldUseCachedFaviconForHost(cacheHost, activeCandidate)) {
      setCachedFaviconUrl(cacheHost, activeCandidate);
    }
    cleanup();
  };

  // Set the letter icon first so something always renders immediately,
  // then start loading the real icon.
  img.src = defaultIcon || generateLetterIcon(fallbackName);

  // After the letter icon is painted, start loading the remote icon.
  // Using a microtask so the letter icon renders on the current frame.
  Promise.resolve().then(() => {
    if (settled) return;
    activeCandidate = limitedCandidates[0];
    img.src = activeCandidate;
  });
}

function clearElement(el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const headers = { ...(options.headers || {}), 'Cache-Control': 'no-cache' };
    return await fetch(url, {
      ...options,
      headers,
      cache: options.cache || 'no-store',
      signal: controller ? controller.signal : undefined,
      referrerPolicy: 'no-referrer',
    });
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

// Weather geolocation state
let geoWatchId = null;
let lastGeoCoords = null;
let geoRequestInFlight = false;
let geoRequestPromise = null;
let geoWatchBootstrapInFlight = false;
let geoLastUpdateAt = 0;
let geoLastUpdateCoords = null;
let weatherApiKeyValidationInFlight = false;
// Note: weatherIntervalId is now tracked via _intervals.weather

const GEO_MIN_UPDATE_INTERVAL_MS = 15000;
const GEO_MIN_MOVE_METERS = 75;

// Approximate location is enough for weather. GPS (enableHighAccuracy) often hits "Timeout expired"
// on desktop Chrome and chrome-extension/new-tab contexts; Wi‑Fi/network fixes are faster & more reliable.
const GEO_OPTIONS_BOOTSTRAP = Object.freeze({
  enableHighAccuracy: false,
  maximumAge: 5 * 60 * 1000,
  timeout: 60 * 1000,
});
const GEO_OPTIONS_WATCH = Object.freeze({
  enableHighAccuracy: false,
  maximumAge: 3 * 60 * 1000,
  timeout: 45 * 1000,
});

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  if (_initialized) return;
  _initialized = true;
  void runFullInit('domcontentloaded');
});

// ============================================
// Sticky Notes (Simple)
// ============================================

const STICKY_NOTES_KEY = 'ios-newtab-sticky-notes';
// Note: stickyNotesSaveTimer is now tracked via _timeouts.stickyNotesSave
let stickyNotesOpen = false;

function loadStickyNotesText() {
  try {
    const raw = localStorage.getItem(STICKY_NOTES_KEY);
    if (typeof raw === 'string') return raw.slice(0, INPUT_LIMITS.stickyNotes);
    return '';
  } catch {
    return '';
  }
}

function saveStickyNotesText(nextText) {
  const safe = typeof nextText === 'string' ? nextText.slice(0, 4000) : '';
  try {
    localStorage.setItem(STICKY_NOTES_KEY, safe);
  } catch {
    // ignore
  }
}

function applyStickyNotesUiState() {
  const panel = document.getElementById('stickyNotes');
  const btn = document.getElementById('stickyNotesBtn');
  const overlay = document.getElementById('stickyNotesOverlay');
  if (!panel || !btn) return;

  const enabled = !!settings.showStickyNotes;
  btn.style.display = enabled ? 'flex' : 'none';

  if (!enabled) {
    stickyNotesOpen = false;
  }

  const isOpen = enabled && stickyNotesOpen;
  panel.classList.toggle('open', isOpen);
  panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (overlay) overlay.classList.toggle('open', isOpen);
}

function initStickyNotes() {
  const textArea = document.getElementById('stickyNotesText');
  if (!textArea) return;

  // Prevent double-binding
  if (textArea.dataset.initBound) return;
  textArea.dataset.initBound = '1';

  // Load persisted text
  textArea.value = loadStickyNotesText();

  const scheduleSave = () => {
    if (_timeouts.stickyNotesSave) clearTimeout(_timeouts.stickyNotesSave);
    _timeouts.stickyNotesSave = setTimeout(() => {
      saveStickyNotesText(textArea.value);
    }, 250);
  };

  textArea.addEventListener('input', scheduleSave);
}

// ============================================
// AI Tools Radial Menu
// ============================================

function initAiTools() {
  const container = document.getElementById('aiTools');
  const btn = document.getElementById('aiToolsBtn');
  const menu = document.getElementById('aiToolsMenu');

  if (!container || !btn || !menu) return;

  // Prevent double-binding
  if (container.dataset.initBound) return;
  container.dataset.initBound = '1';

  const items = Array.from(menu.querySelectorAll('.ai-tool-item'));
  const imgs = items.map(item => item.querySelector('img'));

  // Store the closed-position center so we can animate from a stable base.
  let baseCenter = null;

  // Attach icons using the existing, robust favicon candidate chain.
  items.forEach((item, i) => {
    const img = imgs[i];
    if (!img) return;
    img.loading = 'lazy';
    img.decoding = 'async';
    attachIconFallback(img, getFaviconCandidates(item.href), {
      name: item.textContent || item.title || '',
      cacheHost: getHostnameFromAnyUrl(item.href) || '',
    });
  });

  function getButtonCenter() {
    const iconBox = btn.querySelector('.ai-tools-icon-box') || btn;
    const rect = iconBox.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function resetHubPosition() {
    btn.style.setProperty('--tx', '0px');
    btn.style.setProperty('--ty', '0px');
  }

  function setOpen(isOpen) {
    container.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  function closeMenu() {
    if (!container.classList.contains('open')) return;
    setOpen(false);
    resetHubPosition();
    baseCenter = null;
  }

  function layoutFromBase() {
    if (!baseCenter) baseCenter = getButtonCenter();
    const { x: bx, y: by } = baseCenter;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const count = items.length;
    const itemSize = 56;
    const gap = 12;
    const spacing = itemSize + gap;

    // Ring radius so adjacent icons don't overlap: side length >= spacing.
    // For 6 items, adjacent distance on ring is exactly radius.
    // Smaller radius keeps the hub from moving too far up.
    const radius = Math.max(88, spacing);

    // Place the hub (AI button) as the center of the ring.
    // Keep the ring in a safe lower-left area so it doesn't cover main widgets.
    const margin = radius + itemSize / 2 + 10;

    // Target ring center is just enough up/right to fit the circle.
    const desiredCx = bx + radius + 10;
    const desiredCy = by - radius - 10;

    const cx = clamp(desiredCx, margin, vw - margin);
    const cy = clamp(desiredCy, margin, vh - margin);

    // Move the hub button to the ring center.
    const tx = Math.round(cx - bx);
    const ty = Math.round(cy - by);
    btn.style.setProperty('--tx', `${tx}px`);
    btn.style.setProperty('--ty', `${ty}px`);

    // Menu origin follows the hub center.
    menu.style.setProperty('--ox', `${Math.round(cx)}px`);
    menu.style.setProperty('--oy', `${Math.round(cy)}px`);

    const startDeg = -90;
    const step = 360 / Math.max(1, count);
    items.forEach((item, index) => {
      const deg = startDeg + (index * step);
      const rad = (deg * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      item.style.setProperty('--x', `${Math.round(x)}px`);
      item.style.setProperty('--y', `${Math.round(y)}px`);
      item.style.setProperty('--d', `${index * 35}ms`);
    });
  }

  function openMenu() {
    // Always start from a clean, closed hub position.
    resetHubPosition();
    // Measure after reset lands, then animate to the hub center + ring.
    requestAnimationFrame(() => {
      baseCenter = getButtonCenter();
      layoutFromBase();
      setOpen(true);
    });
  }

  function toggle() {
    if (container.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  });

  // Close when clicking outside - use tracked listener
  const aiToolsClickHandler = (e) => {
    if (!container.classList.contains('open')) return;
    if (container.contains(e.target)) return;
    closeMenu();
  };
  document.addEventListener('click', aiToolsClickHandler);
  _listeners.aiToolsClick = aiToolsClickHandler;

  // Keep positions correct if the page is resized - use tracked listener
  const aiToolsResizeHandler = () => {
    if (!container.classList.contains('open')) return;
    layoutFromBase();
  };
  window.addEventListener('resize', aiToolsResizeHandler);
  _listeners.aiToolsResize = aiToolsResizeHandler;
}

// ============================================
// Settings
// ============================================

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && !!chrome.storage && !!chrome.storage.local;
}

function storageLocalGet(keys) {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) return resolve({});
    chrome.storage.local.get(keys, (result) => resolve(result || {}));
  });
}

function storageLocalSet(items) {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) return resolve();
    chrome.storage.local.set(items, () => resolve());
  });
}

function mapOptionsSettingsToNewtab(storeSettings) {
  // Options/settingsStore.js schema -> New Tab schema
  const s = isPlainObject(storeSettings) ? storeSettings : {};
  const out = {};

  // Shared
  if (typeof s.theme === 'string') out.theme = s.theme;
  if (typeof s.accentColor === 'string') out.accentColor = s.accentColor;
  if (typeof s.reduceMotion === 'boolean') out.reduceMotion = s.reduceMotion;
  if (typeof s.blurIntensity === 'number') out.blurIntensity = s.blurIntensity;

  // Clock
  if (typeof s.showClock === 'boolean') out.hideClock = !s.showClock;
  if (typeof s.clockStyle === 'string') out.digitalClock = s.clockStyle === 'digital';
  if (typeof s.use12Hour === 'boolean') out.use12Hour = s.use12Hour;
  if (typeof s.showSeconds === 'boolean') out.showSeconds = s.showSeconds;

  // Greeting
  if (typeof s.showGreeting === 'boolean') out.showGreeting = s.showGreeting;
  if (typeof s.showQuotes === 'boolean') out.showQuotes = s.showQuotes;
  if (typeof s.userName === 'string') out.userName = s.userName;
  if (typeof s.showCustomText === 'boolean') out.showCustomText = s.showCustomText;

  // Search
  if (typeof s.showVoiceSearch === 'boolean') out.hideMic = !s.showVoiceSearch;
  if (typeof s.voiceLanguage === 'string') out.voiceLanguage = s.voiceLanguage;

  // Weather
  if (typeof s.showWeather === 'boolean') out.showWeather = s.showWeather;
  if (typeof s.weatherUnit === 'string') out.useFahrenheit = s.weatherUnit === 'fahrenheit';
  if (typeof s.weatherLocation === 'string' && s.weatherLocation.trim()) out.weatherLocation = s.weatherLocation;
  if (typeof s.weatherApiKey === 'string') out.weatherApiKey = s.weatherApiKey;
  if (typeof s.useGPS === 'boolean') out.useGPS = s.useGPS;

  // Dock
  if (typeof s.showDock === 'boolean') out.showGoogleApps = s.showDock;
  if (typeof s.adaptiveIcons === 'boolean') out.adaptiveIcons = s.adaptiveIcons;
  if (typeof s.dockPosition === 'string') out.dockPosition = s.dockPosition;
  if (typeof s.showTodoWidget === 'boolean') out.showTodoWidget = s.showTodoWidget;
  if (typeof s.showStickyNotes === 'boolean') out.showStickyNotes = s.showStickyNotes;
  if (typeof s.hideEngines === 'boolean') out.hideEngines = s.hideEngines;

  // Wallpaper tuning (no behavior change unless you wire it in)
  if (typeof s.wallpaperEnabled === 'boolean') out.wallpaperEnabled = s.wallpaperEnabled;
  if (typeof s.wallpaperUrl === 'string') out.wallpaperUrl = s.wallpaperUrl;
  if (typeof s.wallpaperBlur === 'number') out.wallpaperBlur = s.wallpaperBlur;
  if (typeof s.wallpaperDim === 'number') out.wallpaperDim = s.wallpaperDim;

  return out;
}

function mapNewtabSettingsToOptionsSchema(newtabSettings) {
  // New Tab schema -> Options/settingsStore.js schema (overlapping keys only)
  const s = isPlainObject(newtabSettings) ? newtabSettings : {};
  const out = {};

  if (typeof s.theme === 'string') out.theme = s.theme;
  if (typeof s.accentColor === 'string') out.accentColor = s.accentColor;
  if (typeof s.reduceMotion === 'boolean') out.reduceMotion = s.reduceMotion;
  if (typeof s.blurIntensity === 'number') out.blurIntensity = s.blurIntensity;

  if (typeof s.hideClock === 'boolean') out.showClock = !s.hideClock;
  if (typeof s.digitalClock === 'boolean') out.clockStyle = s.digitalClock ? 'digital' : 'analog';
  if (typeof s.use12Hour === 'boolean') out.use12Hour = s.use12Hour;
  if (typeof s.showSeconds === 'boolean') out.showSeconds = s.showSeconds;

  if (typeof s.showGreeting === 'boolean') out.showGreeting = s.showGreeting;
  if (typeof s.showQuotes === 'boolean') out.showQuotes = s.showQuotes;
  if (typeof s.userName === 'string') out.userName = s.userName;
  if (typeof s.showCustomText === 'boolean') out.showCustomText = s.showCustomText;

  if (typeof s.hideMic === 'boolean') out.showVoiceSearch = !s.hideMic;
  if (typeof s.voiceLanguage === 'string') out.voiceLanguage = s.voiceLanguage;

  if (typeof s.showWeather === 'boolean') out.showWeather = s.showWeather;
  if (typeof s.useFahrenheit === 'boolean') out.weatherUnit = s.useFahrenheit ? 'fahrenheit' : 'celsius';
  if (typeof s.weatherLocation === 'string') out.weatherLocation = s.weatherLocation;
  if (typeof s.weatherApiKey === 'string') out.weatherApiKey = s.weatherApiKey;
  if (typeof s.useGPS === 'boolean') out.useGPS = s.useGPS;

  if (typeof s.showGoogleApps === 'boolean') out.showDock = s.showGoogleApps;
  if (typeof s.adaptiveIcons === 'boolean') out.adaptiveIcons = s.adaptiveIcons;
  if (typeof s.dockPosition === 'string') out.dockPosition = s.dockPosition;
  if (typeof s.showTodoWidget === 'boolean') out.showTodoWidget = s.showTodoWidget;
  if (typeof s.showStickyNotes === 'boolean') out.showStickyNotes = s.showStickyNotes;
  if (typeof s.hideEngines === 'boolean') out.hideEngines = s.hideEngines;

  if (typeof s.wallpaperEnabled === 'boolean') out.wallpaperEnabled = s.wallpaperEnabled;
  if (typeof s.wallpaperUrl === 'string') out.wallpaperUrl = s.wallpaperUrl;
  if (typeof s.wallpaperBlur === 'number') out.wallpaperBlur = s.wallpaperBlur;
  if (typeof s.wallpaperDim === 'number') out.wallpaperDim = s.wallpaperDim;

  return out;
}

function applyMotionToggles() {
  document.body.classList.toggle('reduce-motion', !!settings.reduceMotion);

  const blur = Number.isFinite(Number(settings.wallpaperBlur)) ? Number(settings.wallpaperBlur) : 0;
  const dim = Number.isFinite(Number(settings.wallpaperDim)) ? Number(settings.wallpaperDim) : 0;
  const blurClamped = Math.min(20, Math.max(0, blur));
  const dimClamped = Math.min(50, Math.max(0, dim));
  document.documentElement.style.setProperty('--wallpaper-blur', `${blurClamped}px`);
  document.documentElement.style.setProperty('--wallpaper-dim', String(dimClamped / 100));
}

async function loadSettings() {
  let hadLocalSettings = false;
  try {
    const saved = localStorage.getItem('ios-newtab-settings');
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      settings = { ...DEFAULT_SETTINGS, ...sanitizeLoadedSettings(parsedSettings) };
      hadLocalSettings = true;
      // Ensure weather defaults are always set
      if (!settings.weatherLocation) {
        settings.weatherLocation = DEFAULT_SETTINGS.weatherLocation;
      }
    }
    
    // Load custom dock apps
    const savedDockApps = localStorage.getItem('ios-newtab-dock-apps');
    if (savedDockApps) {
      customDockApps = sanitizeDockApps(JSON.parse(savedDockApps));
    } else {
      customDockApps = sanitizeDockApps(customDockApps);
    }
  } catch (e) {
    console.error('Error loading settings:', e);
  }

  // Merge in Options/settingsStore.js settings (chrome.storage.local)
  try {
    const { settings: storedSettings, dockApps, wallpaper, [GEOLOCATION_TOGGLE_KEY]: storedUseGeolocation } = await storageLocalGet(['settings', 'dockApps', 'wallpaper', GEOLOCATION_TOGGLE_KEY]);

    const hasStoredSettings = !!storedSettings;

    if (storedSettings) {
      const mapped = mapOptionsSettingsToNewtab(storedSettings);
      settings = { ...settings, ...sanitizeLoadedSettings(mapped) };
    }

    if (typeof storedUseGeolocation === 'boolean') {
      settings.useGPS = storedUseGeolocation;
    }

    if (dockApps) {
      customDockApps = sanitizeDockApps(dockApps);
    }

    if (wallpaper) {
      settings.wallpaper = sanitizeWallpaperValue(wallpaper) || '';
    }

    // If the user has v1 localStorage settings but the Options store isn't seeded yet,
    // write a merged settings object so Options pages reflect current behavior.
    if (hadLocalSettings && !hasStoredSettings) {
      const patch = mapNewtabSettingsToOptionsSchema(settings);
      const safeExisting = isPlainObject(storedSettings) ? storedSettings : {};
      await storageLocalSet({
        settings: { ...safeExisting, ...patch },
        [GEOLOCATION_TOGGLE_KEY]: !!settings.useGPS,
      });
    }
  } catch (e) {
    console.error('Error loading chrome.storage.local settings:', e);
  }

  // Use right-side dock as the default layout direction.
  if (settings.dockPosition === 'bottom') {
    settings.dockPosition = 'right';
  }

  applyMotionToggles();
}

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  // Prototype pollution guard: only accept plain objects
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function sanitizeWallpaperValue(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return '';
  // Allow only https URLs or raster base64 data URLs for wallpapers.
  // (Block SVG data URLs to avoid scriptable image formats.)
  if (/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.protocol === 'https:') return u.toString();
  } catch {
    // ignore
  }
  return null;
}

function sanitizeIconValue(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  // Allow uploaded images only (avoid SVG data URLs).
  if (/^data:image\/(png|jpe?g|webp|gif|ico);base64,/i.test(trimmed)) return trimmed;

  // Allow only https URLs for remote icons.
  try {
    const u = new URL(trimmed);
    if (u.protocol === 'https:') return u.toString();
  } catch {
    // ignore
  }

  // Emoji / short marker (e.g. 🎫): reject strings that look like names/labels
  const compactNoSpace = trimmed.replace(/\s/g, '');
  const looksLikeTextLabel = /^[\p{L}\p{M}0-9\s\-_.]+$/u.test(trimmed) && compactNoSpace.length >= 3;
  if (!looksLikeTextLabel && trimmed.length <= 16 && !trimmed.includes('://') && !trimmed.includes('<') && !trimmed.includes('>')) {
    return trimmed;
  }
  return '';
}

function getPinnedDockIconForUrl(url) {
  try {
    const normalized = normalizeUrlForFavicon(url);
    if (!normalized) return '';
    const host = new URL(normalized).hostname.toLowerCase();
    if (host === 'itmis.olmrts.com.pk') {
      return 'https://em-inventory-management.vercel.app/eminventory.png';
    }
  } catch {
    // ignore
  }
  return '';
}

function sanitizeDockApps(input) {
  const fallback = [...DEFAULT_DOCK_APPS];
  if (!Array.isArray(input)) return fallback;

  const out = [];
  input.slice(0, INPUT_LIMITS.maxDockApps).forEach((raw, index) => {
    if (!isPlainObject(raw)) return;
    const idNum = Number(raw.id);
    const id = Number.isFinite(idNum) ? idNum : (index + 1);
    const name = (typeof raw.name === 'string' ? raw.name : '').replace(/<[^>]*>/g, '').trim().slice(0, INPUT_LIMITS.dockAppName) || 'App';
    const rawUrl = (typeof raw.url === 'string' ? raw.url : '').trim().slice(0, INPUT_LIMITS.dockAppUrl);
    // Normalize to safe http(s) URLs only (auto-prepend https:// for bare domains)
    const url = normalizeUrlForFavicon(rawUrl) || '';
    const icon = sanitizeIconValue(raw.icon) || getPinnedDockIconForUrl(url);
    const domain = (typeof raw.domain === 'string' ? raw.domain : '').trim().slice(0, 200);

    const next = { id, name, url, icon };
    if (domain) next.domain = domain;
    out.push(next);
  });

  return out.length ? out : fallback;
}

function sanitizeEnglishVoiceLanguage(value, fallback = 'auto') {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (trimmed.toLowerCase() === 'auto') return 'auto';

  // Accept English locale tags like en-US, en-GB, en-IN, en-001.
  if (/^en(?:[-_][a-zA-Z0-9]{2,8})*$/i.test(trimmed)) {
    const parts = trimmed.replace(/_/g, '-').split('-');
    return parts
      .map((part, idx) => (idx === 0 ? 'en' : part.toUpperCase()))
      .join('-');
  }

  return fallback;
}

function sanitizeLoadedSettings(input) {
  const i = isPlainObject(input) ? input : {};

  const sanitizeBool = (v, fallback) => (typeof v === 'boolean' ? v : fallback);
  const sanitizeStr = (v, maxLen, fallback) => {
    if (typeof v !== 'string') return fallback;
    return v.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
  };
  const clampNum = (v, min, max, fallback) => {
    if (typeof v !== 'number' || !Number.isFinite(v)) return fallback;
    return Math.min(max, Math.max(min, v));
  };

  const theme = (typeof i.theme === 'string' && ['system', 'light', 'dark'].includes(i.theme)) ? i.theme : DEFAULT_SETTINGS.theme;
  const accentColor = (typeof i.accentColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(i.accentColor.trim())) ? i.accentColor.trim() : DEFAULT_SETTINGS.accentColor;

  return {
    userName: sanitizeStr(i.userName, INPUT_LIMITS.userName, DEFAULT_SETTINGS.userName),
    theme,
    accentColor,

    reduceMotion: sanitizeBool(i.reduceMotion, DEFAULT_SETTINGS.reduceMotion),
    blurIntensity: clampNum(i.blurIntensity, 0, 40, DEFAULT_SETTINGS.blurIntensity),

    hideClock: sanitizeBool(i.hideClock, DEFAULT_SETTINGS.hideClock),
    digitalClock: sanitizeBool(i.digitalClock, DEFAULT_SETTINGS.digitalClock),
    use12Hour: sanitizeBool(i.use12Hour, DEFAULT_SETTINGS.use12Hour),
    showSeconds: sanitizeBool(i.showSeconds, DEFAULT_SETTINGS.showSeconds),

    showGreeting: sanitizeBool(i.showGreeting, DEFAULT_SETTINGS.showGreeting),
    showCustomText: sanitizeBool(i.showCustomText, DEFAULT_SETTINGS.showCustomText),

    hideMic: sanitizeBool(i.hideMic, DEFAULT_SETTINGS.hideMic),
    hideEngines: sanitizeBool(i.hideEngines, DEFAULT_SETTINGS.hideEngines),
    voiceLanguage: sanitizeEnglishVoiceLanguage(i.voiceLanguage, DEFAULT_SETTINGS.voiceLanguage),
    showQuotes: sanitizeBool(i.showQuotes, DEFAULT_SETTINGS.showQuotes),

    showWeather: sanitizeBool(i.showWeather, DEFAULT_SETTINGS.showWeather),
    useFahrenheit: sanitizeBool(i.useFahrenheit, DEFAULT_SETTINGS.useFahrenheit),
    weatherLocation: sanitizeStr(i.weatherLocation, INPUT_LIMITS.weatherLocation, DEFAULT_SETTINGS.weatherLocation),
    useGPS: sanitizeBool(i.useGPS, DEFAULT_SETTINGS.useGPS),
    weatherApiKey: sanitizeStr(i.weatherApiKey, INPUT_LIMITS.weatherApiKey, DEFAULT_SETTINGS.weatherApiKey),

    showGoogleApps: sanitizeBool(i.showGoogleApps, DEFAULT_SETTINGS.showGoogleApps),
    adaptiveIcons: sanitizeBool(i.adaptiveIcons, DEFAULT_SETTINGS.adaptiveIcons),
    showTodoWidget: sanitizeBool(i.showTodoWidget, DEFAULT_SETTINGS.showTodoWidget),
    showStickyNotes: sanitizeBool(i.showStickyNotes, DEFAULT_SETTINGS.showStickyNotes),
    dockPosition: (typeof i.dockPosition === 'string' && ['bottom', 'top', 'left', 'right'].includes(i.dockPosition)) ? i.dockPosition : DEFAULT_SETTINGS.dockPosition,

    wallpaperEnabled: sanitizeBool(i.wallpaperEnabled, DEFAULT_SETTINGS.wallpaperEnabled),
    wallpaperUrl: sanitizeStr(i.wallpaperUrl, 900, DEFAULT_SETTINGS.wallpaperUrl),
    wallpaperBlur: clampNum(i.wallpaperBlur, 0, 20, DEFAULT_SETTINGS.wallpaperBlur),
    wallpaperDim: clampNum(i.wallpaperDim, 0, 50, DEFAULT_SETTINGS.wallpaperDim),
    autoWallpaperEnabled: sanitizeBool(i.autoWallpaperEnabled, DEFAULT_SETTINGS.autoWallpaperEnabled),
    autoWallpaperTheme: (typeof i.autoWallpaperTheme === 'string' && ['minimal', 'nature', 'city'].includes(i.autoWallpaperTheme))
      ? i.autoWallpaperTheme
      : DEFAULT_SETTINGS.autoWallpaperTheme,
    prayerMadhab: (typeof i.prayerMadhab === 'string' && ['jafari', 'hanafi'].includes(i.prayerMadhab))
      ? i.prayerMadhab
      : DEFAULT_SETTINGS.prayerMadhab,

    // wallpaper is stored separately in chrome.storage.local
  };
}

function saveSettings() {
  try {
    // Save settings without wallpaper (wallpaper is stored separately)
    const settingsToSave = { ...settings };
    delete settingsToSave.wallpaper;
    localStorage.setItem('ios-newtab-settings', JSON.stringify(settingsToSave));

    // Keep Options UI in sync for overlapping settings
    const patch = mapNewtabSettingsToOptionsSchema(settingsToSave);
    storageLocalGet(['settings'])
      .then(({ settings: existing }) => {
        const safeExisting = isPlainObject(existing) ? existing : {};
        return storageLocalSet({
          settings: { ...safeExisting, ...patch },
          [GEOLOCATION_TOGGLE_KEY]: !!settings.useGPS,
        });
      })
      .catch(() => {});
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}

function saveDockApps() {
  try {
    customDockApps = sanitizeDockApps(customDockApps);
    localStorage.setItem('ios-newtab-dock-apps', JSON.stringify(customDockApps));

    storageLocalSet({ dockApps: customDockApps }).catch(() => {});
  } catch (e) {
    console.error('Error saving dock apps:', e);
  }
}

// Save wallpaper to chrome.storage.local (handles large data)
function saveWallpaper(wallpaperData) {
  if (DEBUG) console.log('Saving wallpaper...', wallpaperData ? 'Has data' : 'Empty');

  const safe = sanitizeWallpaperValue(wallpaperData);
  if (safe === null) {
    alert('Unsupported wallpaper URL. Use an uploaded image or an https URL.');
    return;
  }
  
  if (chrome && chrome.storage) {
    chrome.storage.local.set({ wallpaper: safe }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error saving wallpaper:', chrome.runtime.lastError);
        alert('Wallpaper too large. Please use a smaller image.');
      } else {
        if (DEBUG) console.log('Wallpaper saved successfully!');
      }
    });
  } else {
    console.error('chrome.storage not available');
  }
}

function applyMicVisibility() {
  const micBtn = document.getElementById('micBtn');
  if (!micBtn) return;

  const hidden = !!settings.hideMic;
  micBtn.classList.toggle('mic-hidden', hidden);
  micBtn.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  micBtn.tabIndex = hidden ? -1 : 0;

  if (hidden) {
    micBtn.classList.remove('listening');
  }
}

// Apply all visual settings
function applyAllSettings() {
  // Clock visibility
  const clockContainer = document.querySelector('.clock-container');
  if (clockContainer) {
    clockContainer.style.display = settings.hideClock ? 'none' : 'block';
  }
  
  // Digital vs Analog clock
  updateClockDisplay();
  restartClockTimer();
  
  // Greeting visibility - apply to container and text
  const greetingContainer = document.querySelector('.greeting-container');
  const greetingText = document.getElementById('greetingText');
  if (greetingContainer) {
    greetingContainer.style.display = settings.showGreeting ? 'block' : 'none';
  }
  if (greetingText) {
    greetingText.style.display = settings.showGreeting ? 'block' : 'none';
  }
  
  // Custom text visibility
  const userName = document.getElementById('userName');
  if (userName) {
    userName.style.display = settings.showCustomText ? 'block' : 'none';
  }
  
  // Microphone visibility
  applyMicVisibility();

  const voiceLanguageSelect = document.getElementById('voiceLanguageSelect');
  if (voiceLanguageSelect) {
    const nextVoiceLang = sanitizeEnglishVoiceLanguage(settings.voiceLanguage, DEFAULT_SETTINGS.voiceLanguage);
    if (voiceLanguageSelect.value !== nextVoiceLang) {
      voiceLanguageSelect.value = nextVoiceLang;
    }
  }
  
  // Search engines visibility
  const searchEnginesEl = document.getElementById('searchEngines');
  if (searchEnginesEl) {
    searchEnginesEl.style.display = settings.hideEngines ? 'none' : 'flex';
    if (settings.hideEngines && currentSearchEngine !== 'google') {
      currentSearchEngine = 'google';
      updateSearchEngineUI();
    }
    if (settings.hideEngines) {
      closeSearchEnginesMenu();
    }
  }
  
  // Quotes visibility
  const quoteContainer = document.getElementById('quoteContainer');
  if (quoteContainer) {
    quoteContainer.style.display = settings.showQuotes ? 'block' : 'none';
    // Only show a quote if none is displayed yet (avoid randomizing on every settings change)
    if (settings.showQuotes && !quoteContainer.querySelector('.quote-text')?.textContent) {
      displayRandomQuote();
    }
  }
  
  // Weather visibility
  const weatherCard = document.getElementById('weatherCard');
  if (weatherCard) {
    weatherCard.style.display = settings.showWeather ? 'flex' : 'none';
  }
  
  // Dock visibility
  const dockContainer = document.querySelector('.dock-container');
  if (dockContainer) {
    dockContainer.style.display = settings.showGoogleApps ? 'flex' : 'none';
  }
  
  // Apply dock position
  applyDockPosition();
  
  // ToDo widget visibility
  const todoWidget = document.getElementById('todoWidget');
  if (todoWidget) {
    todoWidget.style.display = settings.showTodoWidget ? 'flex' : 'none';
  }

  // Sticky notes enabled/open state
  applyStickyNotesUiState();

  applyWidgetManagerState();
  
  // Apply adaptive icons
  applyAdaptiveIcons();
  
  // Seconds hand visibility
  const secondHand = document.getElementById('secondHand');
  if (secondHand) {
    secondHand.style.display = settings.showSeconds ? 'block' : 'none';
  }
  
  // Update wallpaper preview
  updateWallpaperPreview();
}

function updateClockDisplay() {
  const clockContainer = document.querySelector('.clock-container');
  const clockFace = document.querySelector('.clock-face');
  if (!clockFace || !clockContainer) return;
  
  if (settings.digitalClock) {
    // Add digital mode class for Apple widget styling
    clockContainer.classList.add('digital-mode');
    
    // Hide analog elements including second hand
    document.querySelectorAll('.hour-num, .hand, .center-dot').forEach(el => {
      el.style.display = 'none';
    });
    // Explicitly hide second hand
    const secondHand = document.getElementById('secondHand');
    if (secondHand) secondHand.style.display = 'none';
    
    // Create tick marks container if not exists
    let tickMarks = clockFace.querySelector('.tick-marks');
    if (!tickMarks) {
      tickMarks = document.createElement('div');
      tickMarks.className = 'tick-marks';
      // Create 60 tick marks (one per minute)
      for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.className = i % 5 === 0 ? 'tick hour-tick' : 'tick';
        tick.style.transform = `rotate(${i * 6}deg)`;
        tickMarks.appendChild(tick);
      }
      clockFace.appendChild(tickMarks);
    }
    tickMarks.style.display = 'block';
    
    // Create or update digital display
    let digitalDisplay = document.getElementById('digitalDisplay');
    if (!digitalDisplay) {
      digitalDisplay = document.createElement('div');
      digitalDisplay.id = 'digitalDisplay';
      digitalDisplay.className = 'digital-display';
      clockFace.appendChild(digitalDisplay);
    }
    digitalDisplay.style.display = 'flex';
    updateDigitalClock();
  } else {
    // Remove digital mode class
    clockContainer.classList.remove('digital-mode');
    
    // Show analog elements
    document.querySelectorAll('.hour-num, .hand, .center-dot').forEach(el => {
      el.style.display = '';
    });
    
    // Restore second hand visibility based on settings
    const secondHand = document.getElementById('secondHand');
    if (secondHand) {
      secondHand.style.display = settings.showSeconds ? 'block' : 'none';
    }
    
    // Hide tick marks
    const tickMarks = clockFace.querySelector('.tick-marks');
    if (tickMarks) {
      tickMarks.style.display = 'none';
    }
    
    // Hide digital display
    const digitalDisplay = document.getElementById('digitalDisplay');
    if (digitalDisplay) {
      digitalDisplay.style.display = 'none';
    }
  }
}

function updateDigitalClock() {
  const digitalDisplay = document.getElementById('digitalDisplay');
  if (!digitalDisplay) return;
  
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  let period = '';
  if (settings.use12Hour) {
    period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }
  
  // Format hours (no leading zero for 12-hour, with leading zero for 24-hour)
  const hoursStr = settings.use12Hour ? hours.toString() : hours.toString().padStart(2, '0');
  
  // Create Apple-style display (no innerHTML)
  let timeDisplay = digitalDisplay.querySelector('.time-display');
  if (!timeDisplay) {
    clearElement(digitalDisplay);

    timeDisplay = document.createElement('span');
    timeDisplay.className = 'time-display';

    const hoursEl = document.createElement('span');
    hoursEl.className = 'time-hours';

    const colon1 = document.createElement('span');
    colon1.className = 'time-colon';
    colon1.appendChild(document.createElement('span'));
    colon1.appendChild(document.createElement('span'));

    const minutesEl = document.createElement('span');
    minutesEl.className = 'time-minutes';

    timeDisplay.appendChild(hoursEl);
    timeDisplay.appendChild(colon1);
    timeDisplay.appendChild(minutesEl);
    digitalDisplay.appendChild(timeDisplay);

    const periodEl = document.createElement('span');
    periodEl.className = 'time-period';
    digitalDisplay.appendChild(periodEl);
  }

  const hoursEl = digitalDisplay.querySelector('.time-hours');
  const minutesEl = digitalDisplay.querySelector('.time-minutes');
  const periodEl = digitalDisplay.querySelector('.time-period');
  if (hoursEl) hoursEl.textContent = hoursStr;
  if (minutesEl) minutesEl.textContent = minutes;

  // Seconds
  const existingSeconds = digitalDisplay.querySelector('.time-seconds');
  const existingSecondColon = existingSeconds ? existingSeconds.previousElementSibling : null;
  const wantSeconds = !!settings.showSeconds;
  if (wantSeconds && !existingSeconds) {
    const colon2 = document.createElement('span');
    colon2.className = 'time-colon';
    colon2.appendChild(document.createElement('span'));
    colon2.appendChild(document.createElement('span'));

    const secondsEl = document.createElement('span');
    secondsEl.className = 'time-seconds';

    timeDisplay.appendChild(colon2);
    timeDisplay.appendChild(secondsEl);
  } else if (!wantSeconds && existingSeconds) {
    if (existingSecondColon && existingSecondColon.classList.contains('time-colon')) {
      existingSecondColon.remove();
    }
    existingSeconds.remove();
  }
  const secondsEl = digitalDisplay.querySelector('.time-seconds');
  if (secondsEl) secondsEl.textContent = seconds;

  // Period
  if (periodEl) {
    if (settings.use12Hour) {
      periodEl.textContent = period;
      periodEl.style.display = '';
    } else {
      periodEl.textContent = '';
      periodEl.style.display = 'none';
    }
  }
}

// ============================================
// Clock
// ============================================

function updateDigitalClockSubOptions() {
  const show = !!settings.digitalClock;
  const el12 = document.getElementById('setting12Hour');
  const elSec = document.getElementById('settingSeconds');
  if (el12) el12.style.display = show ? '' : 'none';
  if (elSec) elSec.style.display = show ? '' : 'none';
}

let _clockRafId = null;
let _clockRafRunning = false;
let _clockLastSecond = -1;
let _clockLastMinute = -1;

const _clockDom = {
  hourHand: null,
  minuteHand: null,
  secondHand: null,
};

function getClockDom() {
  if (!_clockDom.hourHand) _clockDom.hourHand = document.getElementById('hourHand');
  if (!_clockDom.minuteHand) _clockDom.minuteHand = document.getElementById('minuteHand');
  if (!_clockDom.secondHand) _clockDom.secondHand = document.getElementById('secondHand');
  return _clockDom;
}

function initClock() {
  if (_clockRafRunning) return;

  const secondHand = document.getElementById('secondHand');
  if (secondHand) {
    secondHand.style.display = settings.showSeconds ? 'block' : 'none';
  }

  updateClockDisplay();
  restartClockTimer();
}

function stopClockTimer() {
  _clockRafRunning = false;
  if (_clockRafId !== null) {
    try { cancelAnimationFrame(_clockRafId); } catch {}
    _clockRafId = null;
  }
  if (_timeouts.clockAlign !== null) {
    try { clearTimeout(_timeouts.clockAlign); } catch {}
    _timeouts.clockAlign = null;
  }
}

function startClockLoop() {
  if (_clockRafRunning) return;
  _clockRafRunning = true;

  const tick = () => {
    if (!_clockRafRunning) return;

    if (!settings.hideClock && document.visibilityState === 'visible') {
      const now = new Date();
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const shouldUpdate = settings.showSeconds
        ? sec !== _clockLastSecond || min !== _clockLastMinute
        : min !== _clockLastMinute;

      if (shouldUpdate) {
        updateClock(now);
        _clockLastSecond = sec;
        _clockLastMinute = min;
      }
    }

    _clockRafId = requestAnimationFrame(tick);
  };

  _clockLastSecond = -1;
  _clockLastMinute = -1;
  _clockRafId = requestAnimationFrame(tick);
}

function restartClockTimer() {
  stopClockTimer();
  if (settings.hideClock) return;
  updateClock(new Date());
  startClockLoop();
}

function updateClock(now = new Date()) {
  if (settings.digitalClock) {
    updateDigitalClock();
    return;
  }

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const secDeg = ((s + ms / 1000) / 60) * 360;
  const minDeg = (settings.showSeconds ? (m + s / 60) : m) / 60 * 360;
  const hourDeg = ((h % 12 + m / 60) / 12) * 360;

  const { hourHand, minuteHand, secondHand } = getClockDom();
  if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minDeg}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${secDeg}deg)`;
}

// ============================================
// Date & Greeting
// ============================================

function initDate() {
  if (_intervals.date !== null) return; // Already running
  const nextBtn = document.getElementById('miniCalendarNextBtn');
  const resetBtn = document.getElementById('miniCalendarResetBtn');
  if (nextBtn && nextBtn.dataset.bound !== '1') {
    nextBtn.addEventListener('click', () => {
      _miniCalendarOffsetMonths += 1;
      renderMiniCalendar(new Date(), _miniCalendarOffsetMonths);
    });
    nextBtn.dataset.bound = '1';
  }
  if (resetBtn && resetBtn.dataset.bound !== '1') {
    resetBtn.addEventListener('click', () => {
      _miniCalendarOffsetMonths = 0;
      renderMiniCalendar(new Date(), _miniCalendarOffsetMonths);
    });
    resetBtn.dataset.bound = '1';
  }
  updateDate();
  _intervals.date = setInterval(updateDate, 60000);
}

function renderMiniCalendar(now = new Date(), monthOffset = 0) {
  const monthYearEl = document.getElementById('miniCalendarMonthYear');
  const todayNumberEl = document.getElementById('miniCalendarTodayNumber');
  const todayTextEl = document.getElementById('miniCalendarTodayText');
  const gridEl = document.getElementById('miniCalendarGrid');
  if (!monthYearEl || !todayNumberEl || !todayTextEl || !gridEl) return;

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const today = now.getDate();
  const viewDate = new Date(todayYear, todayMonth + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const isCurrentMonthView = monthOffset === 0;

  monthYearEl.textContent = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  todayNumberEl.textContent = String(today);
  todayTextEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement('span');
    empty.className = 'mini-calendar-day is-empty';
    empty.textContent = '';
    fragment.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d += 1) {
    const day = document.createElement('span');
    day.className = 'mini-calendar-day';
    if (isCurrentMonthView && d === today) day.classList.add('is-today');
    day.textContent = String(d);
    fragment.appendChild(day);
  }

  clearElement(gridEl);
  gridEl.appendChild(fragment);
}

function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateText = document.getElementById('dateText');
  if (dateText) dateText.textContent = now.toLocaleDateString('en-US', options);
  renderMiniCalendar(now, _miniCalendarOffsetMonths);
}

function initGreeting() {
  if (_intervals.greeting !== null) return; // Already running
  updateGreeting();
  _intervals.greeting = setInterval(updateGreeting, 60000);
  
  // Update name display
  const nameEl = document.getElementById('userName');
  nameEl.textContent = settings.userName || 'Name';
  
  // Click to edit - only add once
  if (!nameEl.dataset.clickBound) {
    nameEl.addEventListener('click', openNameModal);
    nameEl.dataset.clickBound = '1';
  }
}

function updateGreeting() {
  // Prefer the detected location timezone (WeatherAPI tz_id), otherwise system local time.
  let hour = null;
  try {
    const cached = loadLastWeather(24 * 60 * 60 * 1000);
    const tzId = cached && typeof cached.tzId === 'string' ? cached.tzId : null;
    if (tzId && typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      const parts = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        hour12: false,
        timeZone: tzId,
      }).formatToParts(new Date());
      const h = parts.find(p => p.type === 'hour');
      const parsed = h ? Number(h.value) : NaN;
      if (Number.isFinite(parsed)) hour = parsed;
    }

    // Fallback: use WeatherAPI's localtime_epoch if tz formatting isn't available.
    if (!Number.isFinite(hour)) {
      const epoch = cached && typeof cached.localtimeEpochSec === 'number' ? cached.localtimeEpochSec : null;
      if (Number.isFinite(epoch) && epoch > 0) {
        hour = new Date(epoch * 1000).getHours();
      }
    }
  } catch {
    // ignore
  }
  if (!Number.isFinite(hour)) hour = new Date().getHours();
  let greeting;
  
  if (hour >= 5 && hour < 12) greeting = 'Good Morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good Evening';
  else greeting = 'Good Night';
  
  const greetingEl = document.getElementById('greetingText');
  if (greetingEl) greetingEl.textContent = greeting;
}

// ============================================
// Character Count Display Helper
// ============================================

function createCharCountDisplay() {
  const modal = document.getElementById('nameModal');
  if (!modal) return null;
  
  let countEl = document.getElementById('nameCharCount');
  if (!countEl) {
    countEl = document.createElement('div');
    countEl.id = 'nameCharCount';
    countEl.style.cssText = `
      position: absolute;
      bottom: 55px;
      right: 40px;
      font-size: 12px;
      color: rgba(255,255,255,0.6);
      font-weight: 500;
    `;
    modal.appendChild(countEl);
  }
  return countEl;
}

// ============================================
// Name Modal
// ============================================

function openNameModal() {
  const modal = document.getElementById('nameModal');
  const overlay = document.getElementById('nameOverlay');
  const input = document.getElementById('nameInput');
  
  input.value = settings.userName || '';
  modal.classList.add('active');
  overlay.classList.add('active');
  input.focus();
}

function closeNameModal() {
  document.getElementById('nameModal').classList.remove('active');
  document.getElementById('nameOverlay').classList.remove('active');
}

function saveName() {
  const raw = document.getElementById('nameInput').value;
  const name = sanitizeText(raw, INPUT_LIMITS.userName);
  if (raw.trim().length > INPUT_LIMITS.userName) {
    showInputError(document.getElementById('nameInput'), `⚠️ Name too long! Maximum ${INPUT_LIMITS.userName} characters allowed. Current: ${raw.trim().length}`);
  }
  settings.userName = name;
  saveSettings();
  
  document.getElementById('userName').textContent = name || 'Name';
  document.getElementById('settingsName').value = name;
  
  closeNameModal();
}

// ============================================
// Search
// ============================================

function initSearch() {
  const input = document.getElementById('searchInput');
  const micBtn = document.getElementById('micBtn');

  initSearchEnginePicker();

  // Prevent double-binding
  if (input.dataset.initBound) return;
  input.dataset.initBound = '1';
  
  // Search on Enter
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Voice Search
  if (micBtn && !settings.hideMic) {
    initVoiceSearch(micBtn, input);
  }
}

function normalizeSearchEngineId(engineId) {
  const id = typeof engineId === 'string' ? engineId.trim().toLowerCase() : '';
  return SEARCH_ENGINES[id] ? id : 'default';
}

function getDefaultEngineIconForTheme() {
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
  return isLightTheme ? DEFAULT_ENGINE_ICON_LIGHT : DEFAULT_ENGINE_ICON_DARK;
}

function closeSearchEnginesMenu() {
  const menu = document.getElementById('searchEnginesMenu');
  const pickerBtn = document.getElementById('enginePickerBtn');
  if (!menu || !pickerBtn) return;
  menu.hidden = true;
  pickerBtn.setAttribute('aria-expanded', 'false');
}

function updateSearchEngineUI() {
  const pickerBtn = document.getElementById('enginePickerBtn');
  const pickerLogo = document.getElementById('enginePickerLogo');
  const menu = document.getElementById('searchEnginesMenu');
  const engine = SEARCH_ENGINES[normalizeSearchEngineId(currentSearchEngine)] || SEARCH_ENGINES.default;
  const defaultIconUrl = getDefaultEngineIconForTheme();
  const pickerIconUrl = engine.id === 'default' ? defaultIconUrl : engine.iconUrl;

  if (pickerLogo) {
    pickerLogo.src = pickerIconUrl;
    pickerLogo.alt = engine.label;
  }
  if (pickerBtn) {
    pickerBtn.title = `Search with ${engine.label}`;
    pickerBtn.setAttribute('aria-label', `Search engine: ${engine.label}`);
    pickerBtn.classList.toggle('default-engine-mode', engine.id === 'default');
  }

  if (menu) {
    const defaultOptionLogo = menu.querySelector('.search-engine-item[data-engine="default"] .search-engine-logo');
    if (defaultOptionLogo instanceof HTMLImageElement) {
      defaultOptionLogo.src = defaultIconUrl;
    }

    const options = menu.querySelectorAll('.search-engine-item');
    options.forEach((option) => {
      option.classList.toggle('active', option.dataset.engine === engine.id);
    });
  }
}

function shouldReduceSearchMotion() {
  if (settings && settings.reduceMotion) return true;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function animateSearchIconZoom() {
  const pickerBtn = document.getElementById('enginePickerBtn');
  if (!pickerBtn) return;

  pickerBtn.classList.remove('search-zoom-animate');
  // Force a reflow so the class re-add reliably restarts animation.
  void pickerBtn.offsetWidth;
  pickerBtn.classList.add('search-zoom-animate');

  if (_searchIconZoomAnimationTimer) {
    window.clearTimeout(_searchIconZoomAnimationTimer);
  }
  _searchIconZoomAnimationTimer = window.setTimeout(() => {
    pickerBtn.classList.remove('search-zoom-animate');
    _searchIconZoomAnimationTimer = null;
  }, 360);
}

function initSearchEnginePicker() {
  const pickerBtn = document.getElementById('enginePickerBtn');
  const menu = document.getElementById('searchEnginesMenu');
  if (!pickerBtn || !menu) return;

  // Keep "Default" as the initial engine each time a new tab initializes.
  currentSearchEngine = 'default';
  updateSearchEngineUI();
  closeSearchEnginesMenu();

  if (pickerBtn.dataset.bound === '1') return;

  pickerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!shouldReduceSearchMotion()) animateSearchIconZoom();
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    pickerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });

  const options = menu.querySelectorAll('.search-engine-item');
  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const nextEngine = normalizeSearchEngineId(option.dataset.engine);
      currentSearchEngine = nextEngine;
      updateSearchEngineUI();
      closeSearchEnginesMenu();
    });
  });

  if (!_listeners.searchEngineDocClick) {
    _listeners.searchEngineDocClick = (e) => {
      if (menu.hidden) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (pickerBtn.contains(target) || menu.contains(target)) return;
      closeSearchEnginesMenu();
    };
    document.addEventListener('click', _listeners.searchEngineDocClick);
  }

  if (!_listeners.searchEngineKeydown) {
    _listeners.searchEngineKeydown = (e) => {
      if (e.key === 'Escape') {
        closeSearchEnginesMenu();
      }
    };
    document.addEventListener('keydown', _listeners.searchEngineKeydown);
  }

  pickerBtn.dataset.bound = '1';
}

function initVoiceSearch(micBtn, input) {
  // Prevent double-binding
  if (micBtn.dataset.voiceBound) return;
  micBtn.dataset.voiceBound = '1';

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    micBtn.title = 'Voice search not supported in this browser';
    micBtn.style.opacity = '0.5';
    micBtn.style.cursor = 'not-allowed';
    return;
  }
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = resolveVoiceRecognitionLanguage();
  
  let isListening = false;
  
  micBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
      return;
    }
    recognition.lang = resolveVoiceRecognitionLanguage();
    try {
      recognition.start();
    } catch (e) {
      // Fallback to en-US if the selected English locale isn't supported.
      try {
        recognition.lang = 'en-US';
        recognition.start();
      } catch {
        console.error('Speech recognition start failed:', e);
      }
    }
  });
  
  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('listening');
    input.placeholder = 'Listening...';
  };
  
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    
    input.value = transcript;
    
    if (event.results[0].isFinal) {
      setTimeout(() => performSearch(), 500);
    }
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    micBtn.classList.remove('listening');
    input.placeholder = 'Search the web...';
  };
  
  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('listening');
    input.placeholder = 'Search the web...';
  };
}

function resolveVoiceRecognitionLanguage() {
  const selected = sanitizeEnglishVoiceLanguage(settings.voiceLanguage, DEFAULT_SETTINGS.voiceLanguage);
  if (selected !== 'auto') return selected;

  const preferred = Array.isArray(navigator.languages) && navigator.languages.length
    ? String(navigator.languages[0] || '')
    : String(navigator.language || '');

  const browserLang = sanitizeEnglishVoiceLanguage(preferred, 'en-US');
  return browserLang === 'auto' ? 'en-US' : browserLang;
}

function performSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const engineId = normalizeSearchEngineId(currentSearchEngine);
  const engine = SEARCH_ENGINES[engineId] || SEARCH_ENGINES.default;

  const executeSearch = () => {
    if (engine.useChromeDefault) {
      try {
        if (typeof chrome !== 'undefined' && chrome.search && typeof chrome.search.query === 'function') {
          const maybePromise = chrome.search.query({ text: query, disposition: 'CURRENT_TAB' });
          if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.catch(() => {
              window.location.href = engine.buildUrl(query);
            });
          }
          return;
        }
      } catch {
        // Fall through to URL fallback.
      }
    }

    window.location.href = engine.buildUrl(query);
  };

  if (!shouldReduceSearchMotion()) {
    animateSearchIconZoom();
    window.setTimeout(executeSearch, 130);
    return;
  }

  executeSearch();
}

// ============================================
// Weather
// ============================================

// Debounce state for weather visibility refresh
let _weatherLastRefreshAt = 0;
const WEATHER_LOCATION_CACHE_KEYS = {
  city: 'city',
  coords: 'coords',
};

function normalizeStoredCoords(value) {
  if (!value || typeof value !== 'object') return null;
  const lat = Number(value.latitude);
  const lon = Number(value.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { latitude: lat, longitude: lon };
}

function updateLocationUI(locationText) {
  const locationEl = document.getElementById('weatherLocationText');
  if (!locationEl) return;
  locationEl.textContent = locationText || 'Locating...';
}

function showLocationLoadingState() {
  updateLocationUI('Locating...');
}

function persistWeatherLocationCache(city, coords = null) {
  const patch = {};
  if (typeof city === 'string') {
    const safeCity = city.trim().slice(0, INPUT_LIMITS.weatherLocation || 120);
    if (safeCity) patch[WEATHER_LOCATION_CACHE_KEYS.city] = safeCity;
  }
  const normalizedCoords = normalizeStoredCoords(coords);
  if (normalizedCoords) {
    patch[WEATHER_LOCATION_CACHE_KEYS.coords] = normalizedCoords;
  }
  if (Object.keys(patch).length) {
    storageLocalSet(patch).catch(() => {});
  }
}

async function primeWeatherLocationFromCache() {
  try {
    const data = await storageLocalGet([WEATHER_LOCATION_CACHE_KEYS.city, WEATHER_LOCATION_CACHE_KEYS.coords]);
    const cachedCity = typeof data[WEATHER_LOCATION_CACHE_KEYS.city] === 'string' ? data[WEATHER_LOCATION_CACHE_KEYS.city].trim() : '';
    const cachedCoords = normalizeStoredCoords(data[WEATHER_LOCATION_CACHE_KEYS.coords]);

    if (cachedCity) {
      updateLocationUI(cachedCity);
    } else {
      showLocationLoadingState();
    }

    if (cachedCoords) {
      lastGeoCoords = cachedCoords;
      if (settings.showWeather) {
        safeWeatherFetch(0);
      }
    }
  } catch {
    showLocationLoadingState();
  }
}

function safeWeatherFetch(delayMs = 500) {
  if (_timeouts.weatherDebounce) {
    try { clearTimeout(_timeouts.weatherDebounce); } catch {}
  }
  _timeouts.weatherDebounce = setTimeout(() => {
    _timeouts.weatherDebounce = null;
    void fetchWeatherByLocation();
  }, Math.max(0, Number(delayMs) || 0));
}

function refreshWeatherIfNeeded() {
  if (!settings.showWeather) return;
  const now = Date.now();
  if (now - _weatherLastRefreshAt < 30_000) return;
  _weatherLastRefreshAt = now;
  safeWeatherFetch(250);
}

function restoreFavicons() {
  // Rebuild icon nodes after tab resume so suspended image pipelines recover.
  renderDock();
  if (_appsGridInitialized) initAppsGrid();
}

function initWeather() {
  void primeWeatherLocationFromCache();

  if (settings.showWeather) {
    startWeatherPolling();
    if (settings.useGPS) {
      startGeolocationWatch();
    }
  } else {
    stopWeatherPolling();
  }

  // Refresh on tab visibility so the widget feels real-time.
  if (!_listeners.weatherVisibilityChange) {
    _listeners.weatherVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      refreshWeatherIfNeeded();
    };
    document.addEventListener('visibilitychange', _listeners.weatherVisibilityChange);
  }
}

function startWeatherPolling() {
  if (_intervals.weather !== null) return;
  safeWeatherFetch(0);
  _intervals.weather = setInterval(() => safeWeatherFetch(0), 600000); // 10 minutes
}

function stopWeatherPolling() {
  if (_intervals.weather === null) return;
  try {
    clearInterval(_intervals.weather);
  } catch {
    // ignore
  }
  _intervals.weather = null;
}

function formatNetworkSpeedMbps(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return '-- Mbps';
  if (n >= 100) return `${Math.round(n)} Mbps`;
  if (n >= 10) return `${n.toFixed(1)} Mbps`;
  return `${n.toFixed(2)} Mbps`;
}

function getNetworkConnectionLabel(connection) {
  if (!navigator.onLine) return 'Offline';
  if (!connection) return 'Unknown';

  const effectiveType = String(connection.effectiveType || '').toLowerCase();
  const type          = String(connection.type          || '').toLowerCase();

  // `type` is more specific; fall back to effectiveType (widely supported)
  if (type === 'wifi')     return 'Wi-Fi';
  if (type === 'ethernet') return 'LAN';
  if (type === 'cellular') return 'Mobile Data';
  if (type === 'bluetooth') return 'Bluetooth';
  if (type === 'none')     return 'Offline';

  // effectiveType fallback (4g / 3g / 2g / slow-2g)
  if (effectiveType === '4g') return 'Mobile (4G)';
  if (effectiveType === '3g') return 'Mobile (3G)';
  if (effectiveType === '2g' || effectiveType === 'slow-2g') return 'Mobile (2G)';

  return 'Unknown';
}

async function fetchPublicIP() {
  if (_state.ipCache) return _state.ipCache;   // return cached value
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { ip } = await res.json();
    _state.ipCache = ip;
    return ip;
  } catch {
    return null;
  }
}

// ── State ─────────────────────────────────────────────────────────────────────
const _state = {
  lastSampleAt       : -1,
  connectedMs        : 0,
  estimatedBytes     : 0,
  speedTestRunning   : false,
  ipCache            : null,
  lastMeasuredSpeed  : null,   // ← persists real speed test result
  intervals          : { network: null },
  listeners          : { online: null, offline: null, connectionChange: null },
  connectionTarget   : null,
};

// ── Formatters ────────────────────────────────────────────────────────────────
function formatNetworkSpeedMbps(mbps) {
  if (!Number.isFinite(mbps) || mbps <= 0) return 'N/A';
  if (mbps >= 1000) return `${(mbps / 1000).toFixed(2)} Gbps`;
  if (mbps >= 1)    return `${mbps.toFixed(1)} Mbps`;
  return `${(mbps * 1000).toFixed(0)} Kbps`;
}

// ── Connection type detection ─────────────────────────────────────────────────
async function detectConnectionType() {
  if (!navigator.onLine) return 'Offline';

  // Best effort: RTCPeerConnection ICE candidate inspection
  try {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    await pc.setLocalDescription(await pc.createOffer());

    const type = await new Promise((resolve) => {
      const timer = setTimeout(() => { pc.close(); resolve(null); }, 2000);

      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        clearTimeout(timer);
        pc.close();

        const c  = e.candidate.candidate.toLowerCase();
        const ip = (c.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/) || [])[1] || '';
        if (ip.startsWith('169.254.')) resolve('Mobile Data'); // link-local → tether
        else resolve(null);                                    // private IP → LAN; fall through
      };
    });

    if (type) return type;
  } catch { /* fall through */ }

  return getFallbackConnectionType();
}

function getFallbackConnectionType() {
  const conn = navigator.connection
             || navigator.mozConnection
             || navigator.webkitConnection
             || null;

  if (!conn) return navigator.onLine ? 'Connected' : 'Offline';

  const type = String(conn.type || '').toLowerCase();
  if (type === 'wifi')      return 'Wi-Fi';
  if (type === 'ethernet')  return 'LAN';
  if (type === 'cellular')  return 'Mobile Data';
  if (type === 'bluetooth') return 'Bluetooth';
  if (type === 'none')      return 'Offline';

  // Avoid effectiveType — it reflects quality, not medium.
  // Use downlink ceiling heuristic instead.
  const dl = Number(conn.downlink);
  if (Number.isFinite(dl)) {
    if (dl >= 9.5) return 'Wi-Fi / LAN';
    if (dl >= 1.5) return 'Wi-Fi';
    if (dl > 0)    return 'Connected';
  }

  return navigator.onLine ? 'Connected' : 'Offline';
}

// ── IP fetch — sequential fallbacks + XHR escape hatch ───────────────────────
async function fetchPublicIP() {
  if (_state.ipCache) return _state.ipCache;

  // Helper: fetch-based provider
  const via = {
    json: async (url, key) => {
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json())[key];
    },
    text: async (url) => {
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.text()).trim();
    },
    // XHR fallback — bypasses some extension CSP/fetch blocks
    xhr: (url, parseJson = false) => new Promise((resolve, reject) => {
      const x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.timeout = 5000;
      x.onload = () => {
        if (x.status >= 200 && x.status < 300) {
          try {
            resolve(parseJson ? JSON.parse(x.responseText).ip : x.responseText.trim());
          } catch { reject(new Error('Parse error')); }
        } else {
          reject(new Error(`HTTP ${x.status}`));
        }
      };
      x.onerror   = () => reject(new Error('Network error'));
      x.ontimeout = () => reject(new Error('Timeout'));
      x.send();
    }),
  };

  const providers = [
    // Fetch-based
    () => via.json('https://api.ipify.org?format=json',    'ip'),
    () => via.json('https://api64.ipify.org?format=json',  'ip'),
    () => via.text('https://checkip.amazonaws.com/'),
    () => via.json('https://api.my-ip.io/v2/ip.json',      'ip'),
    () => via.json('https://ipapi.co/json/',                'ip'),

    // XHR fallbacks — same providers, different API path
    () => via.xhr('https://api.ipify.org?format=json',     true),
    () => via.xhr('https://checkip.amazonaws.com/',        false),
    () => via.xhr('https://api64.ipify.org?format=json',   true),
  ];

  for (const provider of providers) {
    try {
      const ip = await provider();
      // Validate: must contain digits and dots (IPv4) or colons (IPv6)
      if (ip && typeof ip === 'string' && /^[\d.:a-f]+$/i.test(ip.trim())) {
        _state.ipCache = ip.trim();
        return _state.ipCache;
      }
    } catch { /* try next */ }
  }

  // Last resort: WebRTC local IP (works offline too, shows LAN IP)
  return await getLocalIPviaWebRTC();
}

// ── WebRTC local IP — last resort ─────────────────────────────────────────────
// Note: returns LAN IP, not public IP — but better than "Unavailable"
function getLocalIPviaWebRTC() {
  return new Promise((resolve) => {
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      const ips = new Set();
      const done = (ip) => { pc.close(); resolve(ip); };
      const timer = setTimeout(() => done(null), 3000);

      pc.onicecandidate = (e) => {
        if (!e || !e.candidate) {
          clearTimeout(timer);
          // Return first collected IP or null
          done(ips.size ? [...ips][0] + ' (local)' : null);
          return;
        }
        const m = e.candidate.candidate.match(
          /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/
        );
        if (m && !m[1].startsWith('0.')) ips.add(m[1]);
      };

      pc.createOffer().then(o => pc.setLocalDescription(o));
    } catch {
      resolve(null);
    }
  });
}

// ── Status + Type only (called on 15 s interval) ──────────────────────────────
async function updateStatusAndType() {
  const badge  = document.getElementById('networkStatusBadge');
  const typeEl = document.getElementById('networkConnectionType');
  if (!badge || !typeEl) return;

  const online = navigator.onLine;

  badge.textContent = online ? 'Online' : 'Offline';
  badge.classList.toggle('is-online',  online);
  badge.classList.toggle('is-offline', !online);

  if (online) {
    typeEl.textContent = 'Detecting…';
    typeEl.textContent = await detectConnectionType();
  } else {
    typeEl.textContent = 'Offline';
  }
}

// ── Speed + IP (only called from Run Speed Test button) ───────────────────────
async function runInternalSpeedTest() {
  if (_state.speedTestRunning) return;

  const resultEl = document.getElementById('networkSpeedTestResult');
  const btn      = document.getElementById('networkSpeedTestBtn');
  const speedEl  = document.getElementById('networkSpeedValue');
  const ipEl     = document.getElementById('networkIpAddress');

  _state.speedTestRunning = true;
  if (btn)      { btn.disabled = true; btn.textContent = 'Testing…'; }
  if (resultEl) resultEl.textContent = 'Running speed test…';
  if (speedEl)  speedEl.textContent  = 'Testing…';
  if (ipEl && !_state.ipCache) ipEl.textContent = 'Fetching…';

  // ── Run speed test and IP fetch in parallel ──
  const [speedResult, ip] = await Promise.allSettled([
    (async () => {
      const TEST_BYTES = 5_000_000;
      const controller = new AbortController();
      const timerId    = setTimeout(() => controller.abort(), 20_000);
      try {
        const url        = `https://speed.cloudflare.com/__down?bytes=${TEST_BYTES}&nocache=${Date.now()}`;
        const start      = performance.now();
        const res        = await fetch(url, { cache: 'no-store', signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf        = await res.arrayBuffer();
        const elapsedSec = Math.max(0.001, (performance.now() - start) / 1000);
        const bytes      = Math.max(TEST_BYTES, buf.byteLength || 0);
        return (bytes * 8) / elapsedSec / 1_000_000;
      } finally {
        clearTimeout(timerId);
      }
    })(),
    fetchPublicIP(),
  ]);

  // ── Apply speed result — never overwritten by interval again ──
  if (speedResult.status === 'fulfilled') {
    const pretty             = formatNetworkSpeedMbps(speedResult.value);
    _state.lastMeasuredSpeed = pretty;            // ← store so interval won't stomp it
    if (speedEl)  speedEl.textContent  = pretty;
    if (resultEl) resultEl.textContent = `Last test: ${pretty}`;
  } else {
    const msg = speedResult.reason?.name === 'AbortError'
      ? 'Timed out'
      : (speedResult.reason?.message ?? 'Unknown error');
    if (resultEl) resultEl.textContent = `Last test: Failed (${msg})`;
    if (speedEl)  speedEl.textContent  = _state.lastMeasuredSpeed ?? 'Run speed test';
  }

  // ── Apply IP result ──
  if (ipEl) {
    console.log('IP result status:', ip.status);
    console.log('IP result value:', ip.value);
    console.log('IP result reason:', ip.reason);
    
    if (ip.status === 'fulfilled' && ip.value) {
      ipEl.textContent = ip.value;
      console.log('IP set to:', ip.value);
    } else {
      ipEl.textContent = 'Unavailable';
      console.log('IP unavailable - status:', ip.status, 'value:', ip.value);
    }
  }

  _state.speedTestRunning = false;
  if (btn) { btn.disabled = false; btn.textContent = 'Run Speed Test'; }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function initNetworkInfoWidget() {
  // Speed test button → updates Speed + IP
  const btn = document.getElementById('networkSpeedTestBtn');
  if (btn && !btn.dataset.initBound) {
    btn.addEventListener('click', runInternalSpeedTest);
    btn.dataset.initBound = '1';
  }

  // online/offline events → immediately refresh status + type
  if (!_state.listeners.online) {
    _state.listeners.online = () => {
      _state.ipCache = null;   // stale after reconnect
      updateStatusAndType();
    };
    window.addEventListener('online', _state.listeners.online);
  }
  if (!_state.listeners.offline) {
    _state.listeners.offline = () => updateStatusAndType();
    window.addEventListener('offline', _state.listeners.offline);
  }

  // navigator.connection change event
  const conn = navigator.connection
             || navigator.mozConnection
             || navigator.webkitConnection
             || null;
  if (conn && !_state.listeners.connectionChange
      && typeof conn.addEventListener === 'function') {
    _state.listeners.connectionChange = () => updateStatusAndType();
    _state.connectionTarget = conn;
    conn.addEventListener('change', _state.listeners.connectionChange);
  }

  // 15-second interval for Status + Type only
  if (_state.intervals.network === null) {
    _state.intervals.network = setInterval(updateStatusAndType, 15_000);
  }

  // Immediate first paint
  updateStatusAndType();

  // Show last known speed if available (don't blank it out on init)
  const speedEl = document.getElementById('networkSpeedValue');
  if (speedEl && !_state.lastMeasuredSpeed) {
    speedEl.textContent = 'Run speed test';
  }

  // Show IP if already cached
  const ipEl = document.getElementById('networkIpAddress');
  if (ipEl) {
    ipEl.textContent = _state.ipCache ?? 'Click speed test to fetch';
  }
}

const WIDGET_LAYOUTS_KEY = 'fgt-widget-layouts';
const WIDGET_MANAGER_KEY = 'fgt-widget-manager';
const SCREENSHOT_NOTES_KEY = 'fgt-screenshot-notes';
const BREAK_REMINDER_MINUTES = 45;

const DEFAULT_WIDGET_LAYOUTS = Object.freeze({
  sessionTrackerWidget: { right: 20, top: 20 },
  todoWidget: { right: 20, top: 120 },
  autoWallpaperWidget: { right: 20, top: 380 },
  prayerTimesWidget: { left: 20, bottom: 100 },
  screenshotNoteWidget: { right: 20, bottom: 100 },
  stickyNotesWidget: { left: 20, top: 20 },
  tabAssistantWidget: { right: 220, top: 320 },
  networkInfoWidget: { left: 20, top: 220 },
});

function getStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function setStoredJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ============================================
// Grid Widget System — Snap to Grid on Drop
// ============================================

// Grid: 8 cols × 6 rows — compact, manageable, user-friendly
const GRID_COLS = 40;
const GRID_ROWS = 20;

function getGridCell(x, y) {
  const cellW = window.innerWidth / GRID_COLS;
  const cellH = window.innerHeight / GRID_ROWS;
  return {
    col: Math.round(x / cellW),
    row: Math.round(y / cellH),
    cellW,
    cellH
  };
}

function snapToGrid(x, y, w, h) {
  const cellW = window.innerWidth / GRID_COLS;
  const cellH = window.innerHeight / GRID_ROWS;
  const col = Math.round(x / cellW);
  const row = Math.round(y / cellH);
  const snappedX = Math.min(Math.max(col * cellW, 0), window.innerWidth - w);
  const snappedY = Math.min(Math.max(row * cellH, 0), window.innerHeight - h);
  return { left: Math.round(snappedX), top: Math.round(snappedY) };
}

// Highlight cells under the drop ghost with performance optimization
function highlightGridCells(snappedLeft, snappedTop, w, h) {
  const inner = document.getElementById('widgetGridOverlayInner');
  if (!inner) return;
  
  const cellW = window.innerWidth / GRID_COLS;
  const cellH = window.innerHeight / GRID_ROWS;
  const startCol = Math.round(snappedLeft / cellW);
  const startRow = Math.round(snappedTop / cellH);
  const spanCols = Math.max(1, Math.round(w / cellW));
  const spanRows = Math.max(1, Math.round(h / cellH));
  
  // Clear all highlights first (more efficient than individual toggles)
  clearGridHighlights();
  
  // Highlight only the cells we need
  const cells = inner.children;
  for (let row = startRow; row < startRow + spanRows && row < GRID_ROWS; row++) {
    for (let col = startCol; col < startCol + spanCols && col < GRID_COLS; col++) {
      const index = row * GRID_COLS + col;
      if (cells[index]) {
        cells[index].classList.add('highlight');
      }
    }
  }
  
  // Add snap feedback
  console.log(`Grid snap: Col ${startCol}-${startCol + spanCols - 1}, Row ${startRow}-${startRow + spanRows - 1}`);
}

function clearGridHighlights() {
  const inner = document.getElementById('widgetGridOverlayInner');
  if (!inner) return;
  Array.from(inner.children).forEach(cell => cell.classList.remove('highlight'));
}

function buildGridOverlay() {
  const inner = document.getElementById('widgetGridOverlayInner');
  if (!inner) return;
  inner.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
  inner.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
  if (inner.children.length === GRID_COLS * GRID_ROWS) return;
  inner.innerHTML = '';
  const total = GRID_COLS * GRID_ROWS;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'widget-grid-cell';
    frag.appendChild(cell);
  }
  inner.appendChild(frag);
}

function showGridOverlay() {
  buildGridOverlay();
  const overlay = document.getElementById('widgetGridOverlay');
  if (overlay) overlay.classList.add('active');
  document.body.classList.add('widget-dragging');
}

function hideGridOverlay() {
  const overlay = document.getElementById('widgetGridOverlay');
  if (overlay) overlay.classList.remove('active');
  const ghost = document.getElementById('widgetDropGhost');
  if (ghost) ghost.classList.remove('active');
  clearGridHighlights();
  document.body.classList.remove('widget-dragging');
}

function updateDropGhost(snappedLeft, snappedTop, w, h) {
  const ghost = document.getElementById('widgetDropGhost');
  if (!ghost) return;
  ghost.style.left = `${snappedLeft}px`;
  ghost.style.top = `${snappedTop}px`;
  ghost.style.width = `${w}px`;
  ghost.style.height = `${h}px`;
  ghost.classList.add('active');
  
  // Highlight cells underneath
  highlightGridCells(snappedLeft, snappedTop, w, h);
  
  // Update coordinate display
  const cellW = window.innerWidth / GRID_COLS;
  const cellH = window.innerHeight / GRID_ROWS;
  const col = Math.round(snappedLeft / cellW);
  const row = Math.round(snappedTop / cellH);
  const spanCols = Math.max(1, Math.round(w / cellW));
  const spanRows = Math.max(1, Math.round(h / cellH));
  
  // Update ghost with position info
  ghost.setAttribute('data-grid-info', `${col},${row} (${spanCols}×${spanRows})`);
}

const WIDGET_SIZES_KEY = 'fgt-widget-sizes';

function getStoredWidgetSizes() {
  return getStoredJson(WIDGET_SIZES_KEY, {});
}

function saveWidgetSize(widgetId, w, h) {
  const sizes = getStoredWidgetSizes();
  sizes[widgetId] = { w: Math.round(w), h: Math.round(h) };
  setStoredJson(WIDGET_SIZES_KEY, sizes);
}

function injectResizeHandles(el) {
  if (el.dataset.resizeHandlesInjected) return;
  el.dataset.resizeHandlesInjected = '1';
  const handles = ['nw','n','ne','w','e','sw','s','se'];
  handles.forEach(dir => {
    const h = document.createElement('div');
    h.className = `widget-resize-handle resize-${dir}`;
    h.dataset.dir = dir;
    el.appendChild(h);
  });
}

function bindWidgetResize(el, widgetId) {
  if (el.dataset.resizeBound === '1') return;
  el.dataset.resizeBound = '1';

  let resizing = false;
  let startX = 0, startY = 0;
  let startW = 0, startH = 0;
  let startLeft = 0, startTop = 0;
  let dir = '';

  const MIN_W = parseInt(getComputedStyle(el).minWidth) || 120;
  const MIN_H = parseInt(getComputedStyle(el).minHeight) || 60;
  const MAX_W = 600;
  const MAX_H = 800;

  el.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('.widget-resize-handle');
    if (!handle) return;
    e.preventDefault();
    e.stopPropagation();

    dir = handle.dataset.dir;
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = el.getBoundingClientRect();
    startW = rect.width;
    startH = rect.height;
    startLeft = rect.left;
    startTop = rect.top;

    el.classList.add('resizing');
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.style.left = `${startLeft}px`;
    el.style.top = `${startTop}px`;
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newW = startW, newH = startH;
    let newLeft = startLeft, newTop = startTop;

    if (dir.includes('e')) newW = Math.min(MAX_W, Math.max(MIN_W, startW + dx));
    if (dir.includes('s')) newH = Math.min(MAX_H, Math.max(MIN_H, startH + dy));
    if (dir.includes('w')) {
      const candidate = startW - dx;
      if (candidate >= MIN_W && candidate <= MAX_W) {
        newW = candidate;
        newLeft = startLeft + dx;
      }
    }
    if (dir.includes('n')) {
      const candidate = startH - dy;
      if (candidate >= MIN_H && candidate <= MAX_H) {
        newH = candidate;
        newTop = startTop + dy;
      }
    }

    el.style.width = `${Math.round(newW)}px`;
    el.style.height = `${Math.round(newH)}px`;
    el.style.left = `${Math.round(newLeft)}px`;
    el.style.top = `${Math.round(newTop)}px`;
  });

  const endResize = (e) => {
    if (!resizing) return;
    resizing = false;
    try { el.releasePointerCapture(e.pointerId); } catch {}
    el.classList.remove('resizing');
    saveWidgetSize(widgetId, el.offsetWidth, el.offsetHeight);
    // Also save position
    const layouts = getStoredJson(WIDGET_LAYOUTS_KEY, {});
    const left = parseInt(el.style.left) || 0;
    const top  = parseInt(el.style.top)  || 0;
    layouts[widgetId] = { left, top };
    setStoredJson(WIDGET_LAYOUTS_KEY, layouts);
    console.log(`SAVED POSITION for ${widgetId} (after resize):`, { left, top });
    console.log(`SAVED SIZE    for ${widgetId}:`, { w: el.offsetWidth, h: el.offsetHeight });
  };

  el.addEventListener('pointerup', endResize);
  el.addEventListener('pointercancel', endResize);
}

function initMovableWidgets() {
  // DISABLED — layout is now a fixed CSS grid (#bentoGrid).
  // Drag-and-drop and position persistence are no longer used.
  // Kept as a stub so existing call-sites don't throw.
  return;
  /* eslint-disable no-unreachable */
  const layouts = getStoredJson(WIDGET_LAYOUTS_KEY, {});
  const sizes = getStoredWidgetSizes();
  
  // Debug: Log restored layouts
  console.log('Restoring widget layouts:', layouts);
  
  document.querySelectorAll('.movable-widget[data-widget-id]').forEach((el) => {
    const widgetId = el.getAttribute('data-widget-id');
    if (!widgetId) return;

    // Apply saved size if available
    const savedSize = sizes[widgetId];
    if (savedSize && savedSize.w) {
      el.style.width = `${savedSize.w}px`;
      if (savedSize.h) el.style.height = `${savedSize.h}px`;
    }

    // Apply position with better validation
    const saved = layouts[widgetId];
    const fallback = DEFAULT_WIDGET_LAYOUTS[widgetId] || { left: 20, top: 20 };
    
    // More robust position check
    let pos;
    if (saved && typeof saved === 'object' && saved !== null) {
      // Check if saved position has valid coordinates
      const hasValidPosition = Object.keys(saved).some(key => {
        const value = saved[key];
        return Number.isFinite(Number(value)) && value !== null && value !== undefined;
      });
      
      if (hasValidPosition) {
        pos = saved;
        console.log(`Applied restored position for ${widgetId}:`, pos);
      } else {
        pos = fallback;
        console.log(`Invalid position for ${widgetId}, using fallback:`, fallback);
      }
    } else {
      pos = fallback;
      console.log(`No saved position for ${widgetId}, using fallback:`, fallback);
    }
    
    // Clear all position properties first
    el.style.removeProperty('left');
    el.style.removeProperty('right');
    el.style.removeProperty('top');
    el.style.removeProperty('bottom');
    
    // Apply valid positions
    if (Number.isFinite(Number(pos.left))) el.style.left = `${Number(pos.left)}px`;
    if (Number.isFinite(Number(pos.right))) el.style.right = `${Number(pos.right)}px`;
    if (Number.isFinite(Number(pos.top))) el.style.top = `${Number(pos.top)}px`;
    if (Number.isFinite(Number(pos.bottom))) el.style.bottom = `${Number(pos.bottom)}px`;

    // Inject resize handles
    injectResizeHandles(el);

    bindWidgetDrag(el, widgetId);
    bindWidgetResize(el, widgetId);
  });
}

function bindWidgetDrag(el, widgetId) {
  if (!el || el.dataset.dragBound === '1') return;
  el.dataset.dragBound = '1';

  // Drag state
  let dragging = false;
  let startClientX = 0, startClientY = 0;
  let startElLeft = 0, startElTop = 0;
  let currentLeft = 0, currentTop = 0;
  let hasMoved = false;

  const DRAG_THRESHOLD = 6; // px before drag activates

  const saveLayout = (left, top) => {
    const layouts = getStoredJson(WIDGET_LAYOUTS_KEY, {});
    layouts[widgetId] = { left: Math.round(left), top: Math.round(top) };
    setStoredJson(WIDGET_LAYOUTS_KEY, layouts);
    console.log(`SAVED POSITION for ${widgetId}:`, { left: Math.round(left), top: Math.round(top) });
  };

  el.addEventListener('pointerdown', (e) => {
    const target = e.target;
    if (target && (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'SELECT' ||
      target.closest('button') ||
      target.closest('a')
    )) return;

    const rect = el.getBoundingClientRect();
    startClientX = e.clientX;
    startClientY = e.clientY;
    // Normalize: always use left/top coordinates
    startElLeft = rect.left;
    startElTop = rect.top;
    currentLeft = rect.left;
    currentTop = rect.top;
    hasMoved = false;
    dragging = true;
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startClientX;
    const dy = e.clientY - startClientY;

    if (!hasMoved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

    if (!hasMoved) {
      // Start of real drag
      hasMoved = true;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.classList.add('grid-dragging');
      showGridOverlay();
    }

    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const rawLeft = startElLeft + dx;
    const rawTop = startElTop + dy;

    // Clamp within viewport
    const maxX = window.innerWidth - w;
    const maxY = window.innerHeight - h;
    currentLeft = Math.min(maxX, Math.max(0, rawLeft));
    currentTop = Math.min(maxY, Math.max(0, rawTop));

    // Show dragged element at cursor position (following mouse)
    el.style.left = `${currentLeft}px`;
    el.style.top = `${currentTop}px`;

    // Show ghost at snapped position
    const snapped = snapToGrid(currentLeft, currentTop, w, h);
    updateDropGhost(snapped.left, snapped.top, w, h);
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;

    try { el.releasePointerCapture(e.pointerId); } catch {}

    if (!hasMoved) {
      el.classList.remove('grid-dragging');
      hideGridOverlay();
      return;
    }

    // Snap the widget to grid
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const snapped = snapToGrid(currentLeft, currentTop, w, h);

    // Animate snap
    el.classList.remove('grid-dragging');
    el.classList.add('grid-snapping');
    el.style.left = `${snapped.left}px`;
    el.style.top = `${snapped.top}px`;

    setTimeout(() => {
      el.classList.remove('grid-snapping');
    }, 400);

    hideGridOverlay();
    saveLayout(snapped.left, snapped.top);
  };

  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
}

const DEFAULT_WIDGET_MANAGER_STATE = Object.freeze({
  autoWallpaperCard:    { visible: true,  size: 'medium', position: 'left' },
  prayerTimesWidget:    { visible: true,  size: 'medium', position: 'top-left' },
  tabAssistantWidget:   { visible: true,  size: 'medium', position: 'top-right' },
  sessionTrackerWidget: { visible: true,  size: 'medium', position: 'top-left' },
  todoWidget:           { visible: true,  size: 'medium', position: 'top-left' },
  autoWallpaperWidget:  { visible: true,  size: 'medium', position: 'top-left' },
  screenshotNoteWidget: { visible: true,  size: 'medium', position: 'bottom-left' },
  stickyNotesWidget:    { visible: true,  size: 'medium', position: 'bottom-left' },
  networkInfoWidget:    { visible: true,  size: 'medium', position: 'top-left' },
  // Islamic widgets
  ziyaratPlayerWidget:  { visible: true,  size: 'medium', position: 'bottom-center' },
  islamicDateWidget:    { visible: true,  size: 'medium', position: 'top-right' },
  tasbeehWidget:        { visible: true,  size: 'medium', position: 'top-right' },
  quranVerseWidget:     { visible: true,  size: 'medium', position: 'top-left' },
  hadithWidget:         { visible: true,  size: 'medium', position: 'bottom-right' },
});

function getWidgetManagerState() {
  const saved = getStoredJson(WIDGET_MANAGER_KEY, {});
  const out = {};
  Object.entries(DEFAULT_WIDGET_MANAGER_STATE).forEach(([key, def]) => {
    const row = saved && typeof saved[key] === 'object' ? saved[key] : {};
    out[key] = {
      visible: typeof row.visible === 'boolean' ? row.visible : def.visible,
      size: ['small', 'medium', 'large'].includes(row.size) ? row.size : def.size,
      position: typeof row.position === 'string' ? row.position : def.position,
    };
  });
  return out;
}

function setWidgetManagerState(next) {
  setStoredJson(WIDGET_MANAGER_KEY, next);
}

function applyWidgetClassState(el, config) {
  if (!el) return;
  el.style.display = config.visible ? '' : 'none';
  el.classList.remove('wm-size-small', 'wm-size-medium', 'wm-size-large');
  el.classList.add(`wm-size-${config.size}`);
}

function applyWidgetPosition(widgetKey, position) {
  const el = document.getElementById(widgetKey);
  if (!el) return;

  if (widgetKey === 'autoWallpaperCard' || widgetKey === 'prayerTimesCard') {
    el.style.order = position === 'right' ? '2' : '1';
    return;
  }

  if (!el.classList.contains('movable-widget')) return;

  el.style.left = '';
  el.style.right = '';
  el.style.top = '';
  el.style.bottom = '';
  if (position === 'top-left') {
    el.style.left = '20px';
    el.style.top = widgetKey === 'screenshotNoteWidget' ? '420px' : '120px';
  } else if (position === 'bottom-left') {
    el.style.left = '20px';
    el.style.bottom = '90px';
  } else if (position === 'bottom-right') {
    el.style.right = '220px';
    el.style.bottom = '90px';
  } else {
    el.style.right = '220px';
    el.style.top = widgetKey === 'tabAssistantWidget' ? '320px' : '120px';
  }
}

function applyWidgetManagerState() {
  const state = getWidgetManagerState();
  // Widgets inside #bentoGrid use CSS grid flow — only apply visibility/size, skip position.
  const gridEl = document.getElementById('bentoGrid');
  Object.entries(state).forEach(([widgetKey, config]) => {
    const el = document.getElementById(widgetKey);
    if (!el) return;
    applyWidgetClassState(el, config);
    // Only apply position for widgets NOT inside the CSS grid
    if (!gridEl || !gridEl.contains(el)) {
      applyWidgetPosition(widgetKey, config.position);
    }
  });
}

function initWidgetManager() {
  const list = document.getElementById('widgetManagerList');
  if (!list || list.dataset.bound === '1') return;
  list.dataset.bound = '1';

  const state = getWidgetManagerState();
  list.querySelectorAll('.widget-manager-item').forEach((row) => {
    const key = row.getAttribute('data-widget-key');
    if (!key || !state[key]) return;
    const visible = row.querySelector('.wm-visible');
    const size = row.querySelector('.wm-size');
    const position = row.querySelector('.wm-position');

    if (visible) visible.checked = !!state[key].visible;
    if (size) size.value = state[key].size;
    if (position) position.value = state[key].position;

    const onChange = () => {
      state[key] = {
        visible: !!(visible && visible.checked),
        size: (size && ['small', 'medium', 'large'].includes(size.value)) ? size.value : 'medium',
        position: (position && position.value) ? position.value : (DEFAULT_WIDGET_MANAGER_STATE[key]?.position || 'top-right'),
      };
      setWidgetManagerState(state);
      applyWidgetManagerState();
    };

    if (visible) visible.addEventListener('change', onChange);
    if (size) size.addEventListener('change', onChange);
    if (position) position.addEventListener('change', onChange);
  });

  applyWidgetManagerState();
}

function cleanGpuName(renderer) {
  if (!renderer) return 'Unknown GPU';
  let name = renderer;
  const angleMatch = name.match(/^ANGLE \([^,]+,\s*([^,]+)(?:,|\))/);
  if (angleMatch) {
    name = angleMatch[1];
  }
  name = name.replace(/Direct3D\d+/g, '')
             .replace(/vs_\d+_\d+ ps_\d+_\d+/g, '')
             .replace(/PCI-Express/g, '')
             .replace(/Driver/g, '')
             .replace(/(\b\d+\.\d+\.\d+\b)/g, '')
             .replace(/\(TM\)/g, '')
             .replace(/\(R\)/g, '')
             .replace(/\b(D3D11|D3D12|D3D9|OpenGL|Vulkan|Metal)\b/gi, '')
             .replace(/\s+/g, ' ')
             .trim();
  return name;
}

function getGpuModel() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'WebGL Not Supported';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'GPU Spec Hidden';
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return cleanGpuName(renderer);
  } catch (e) {
    return 'Unknown GPU';
  }
}

let lastCpuInfo = null;

function updateSystemCpu(cpuValEl, cpuBarEl, cpuModelEl) {
  if (!cpuValEl || !cpuBarEl) return;
  const hasCpuAPI = typeof chrome !== 'undefined' && chrome.system && chrome.system.cpu;
  if (hasCpuAPI) {
    chrome.system.cpu.getInfo((info) => {
      if (!info) return;
      if (cpuModelEl && (!cpuModelEl.dataset.set || cpuModelEl.textContent.startsWith('Detecting') || cpuModelEl.textContent.startsWith('Loading'))) {
        cpuModelEl.textContent = info.modelName || 'Unknown CPU';
        cpuModelEl.dataset.set = '1';
        cpuModelEl.title = `Cores: ${info.numOfProcessors || 0} (${info.archName || ''})`;
      }
      if (!lastCpuInfo) {
        lastCpuInfo = info;
        return;
      }
      let totalDiff = 0;
      let idleDiff = 0;
      for (let i = 0; i < info.processors.length; i++) {
        if (!lastCpuInfo.processors[i]) continue;
        const lastUsage = lastCpuInfo.processors[i].usage;
        const currentUsage = info.processors[i].usage;
        const totalVal = currentUsage.total - lastUsage.total;
        const idleVal = currentUsage.idle - lastUsage.idle;
        totalDiff += totalVal;
        idleDiff += idleVal;
      }
      lastCpuInfo = info;
      let usagePercent = 0;
      if (totalDiff > 0) {
        usagePercent = Math.round((1 - (idleDiff / totalDiff)) * 100);
      }
      cpuValEl.textContent = `${usagePercent}%`;
      cpuBarEl.style.width = `${usagePercent}%`;
    });
  } else {
    if (cpuModelEl && (!cpuModelEl.dataset.set || cpuModelEl.textContent.startsWith('Detecting') || cpuModelEl.textContent.startsWith('Loading'))) {
      cpuModelEl.textContent = 'Intel Core i7-12700K (Simulated)';
      cpuModelEl.dataset.set = '1';
      cpuModelEl.title = 'Simulated CPU Stats (No extension context)';
    }
    const t = Date.now() / 2000;
    const usagePercent = Math.round(15 + Math.sin(t) * 10 + Math.cos(t * 1.5) * 5 + Math.random() * 3);
    cpuValEl.textContent = `${usagePercent}%`;
    cpuBarEl.style.width = `${usagePercent}%`;
  }
}

function updateSystemMemory(ramValEl, ramBarEl, ramModelEl) {
  if (!ramValEl || !ramBarEl) return;
  const hasMemoryAPI = typeof chrome !== 'undefined' && chrome.system && chrome.system.memory;
  if (hasMemoryAPI) {
    chrome.system.memory.getInfo((info) => {
      if (!info) return;
      const capacityGB = info.capacity / (1024 * 1024 * 1024);
      const availableGB = info.availableCapacity / (1024 * 1024 * 1024);
      const usedGB = capacityGB - availableGB;
      const usagePercent = Math.round((usedGB / capacityGB) * 100);
      ramValEl.textContent = `${usagePercent}%`;
      ramBarEl.style.width = `${usagePercent}%`;
      if (ramModelEl) {
        ramModelEl.textContent = `${usedGB.toFixed(1)} / ${capacityGB.toFixed(1)} GB`;
        ramModelEl.title = `Total Capacity: ${capacityGB.toFixed(2)} GB, Available: ${availableGB.toFixed(2)} GB`;
      }
    });
  } else {
    const capacityGB = 16.0;
    const t = Date.now() / 10000;
    const usagePercent = Math.round(45 + Math.sin(t) * 5);
    const usedGB = (usagePercent / 100) * capacityGB;
    ramValEl.textContent = `${usagePercent}%`;
    ramBarEl.style.width = `${usagePercent}%`;
    if (ramModelEl) {
      ramModelEl.textContent = `${usedGB.toFixed(1)} / ${capacityGB.toFixed(1)} GB (Simulated)`;
      ramModelEl.title = 'Simulated Memory Stats (No extension context)';
    }
  }
}

function initSessionTrackerWidget() {
  const elapsedEl = document.getElementById('sessionElapsedText');
  const breakEl = document.getElementById('sessionBreakEtaText');
  if (!elapsedEl || !breakEl) return;

  const cpuValEl = document.getElementById('sysCpuVal');
  const cpuBarEl = document.getElementById('sysCpuBar');
  const cpuModelEl = document.getElementById('sysCpuModel');
  const ramValEl = document.getElementById('sysRamVal');
  const ramBarEl = document.getElementById('sysRamBar');
  const ramModelEl = document.getElementById('sysRamModel');
  const gpuModelEl = document.getElementById('sysGpuModel');

  if (gpuModelEl) {
    gpuModelEl.textContent = getGpuModel();
    gpuModelEl.title = 'Detected via WebGL';
  }

  const updateSysStats = () => {
    updateSystemCpu(cpuValEl, cpuBarEl, cpuModelEl);
    updateSystemMemory(ramValEl, ramBarEl, ramModelEl);
  };

  updateSysStats();
  if (_intervals.systemStats === null) {
    _intervals.systemStats = setInterval(updateSysStats, 2000);
  }

  const fallbackStartMs = Date.now();
  let fallbackAccumulatedMs = 0;
  let fallbackLastTickMs = fallbackStartMs;
  let lastReminderBucket = -1;

  const getSharedElapsedMs = async () => {
    if (!hasChromeStorage()) return null;
    try {
      const data = await storageLocalGet(['fgt_global_session']);
      const state = data && data.fgt_global_session;
      if (!state || typeof state !== 'object') return null;
      const totalMs = Number(state.totalMs) || 0;
      const isTracking = !!state.isTracking;
      const lastTick = Number(state.lastTick) || Date.now();
      return totalMs + (isTracking ? Math.max(0, Date.now() - lastTick) : 0);
    } catch {
      return null;
    }
  };

  const update = async () => {
    const sharedElapsedMs = await getSharedElapsedMs();
    if (sharedElapsedMs === null) {
      const now = Date.now();
      fallbackAccumulatedMs += Math.max(0, now - fallbackLastTickMs);
      fallbackLastTickMs = now;
    }

    const elapsedMs = sharedElapsedMs === null ? fallbackAccumulatedMs : sharedElapsedMs;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    const h = Math.floor(elapsedMin / 60);
    const m = elapsedMin % 60;
    elapsedEl.textContent = `${h}h ${m}m`;
    const untilBreak = Math.max(0, BREAK_REMINDER_MINUTES - ((elapsedMin) % BREAK_REMINDER_MINUTES));
    breakEl.textContent = `${untilBreak}m`;

    const reminderBucket = Math.floor(elapsedMin / BREAK_REMINDER_MINUTES);
    if (reminderBucket > 0 && reminderBucket !== lastReminderBucket) {
      lastReminderBucket = reminderBucket;
      showSmallToast(`Break reminder: You've been browsing for ${h}h ${m}m`);
    }
  };

  void update();
  if (_intervals.sessionTracker === null) _intervals.sessionTracker = setInterval(() => { void update(); }, 30000);
}

function showSmallToast(message) {
  if (!message) return;
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;background:rgba(20,20,25,0.88);color:#fff;padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);font-size:12px;';
  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2800);
}


function initScreenshotNoteWidget() {
  const zone = document.getElementById('screenshotPasteZone');
  const listEl = document.getElementById('screenshotNotesList');
  if (!zone || !listEl || zone.dataset.bound === '1') return;
  zone.dataset.bound = '1';

  const render = () => {
    const notes = getStoredJson(SCREENSHOT_NOTES_KEY, []);
    clearElement(listEl);
    notes.slice(0, 12).forEach((n) => {
      const item = document.createElement('div');
      item.className = 'utility-item';

      const actions = document.createElement('div');
      actions.className = 'screenshot-note-actions';
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'screenshot-delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        const current = getStoredJson(SCREENSHOT_NOTES_KEY, []);
        const filtered = current.filter((x) => x && x.id !== n.id);
        setStoredJson(SCREENSHOT_NOTES_KEY, filtered);
        render();
      });
      actions.appendChild(deleteBtn);

      const img = document.createElement('img');
      img.src = n.image;
      img.alt = 'Screenshot note';
      item.appendChild(actions);
      item.appendChild(img);
      listEl.appendChild(item);
    });
  };

  const handlePaste = (e) => {
    const items = e.clipboardData && e.clipboardData.items ? Array.from(e.clipboardData.items) : [];
    const imageItem = items.find((it) => it.type && it.type.startsWith('image/'));
    if (!imageItem) return;
    const file = imageItem.getAsFile();
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const notes = getStoredJson(SCREENSHOT_NOTES_KEY, []);
      notes.unshift({ id: Date.now(), image: String(reader.result || ''), createdAt: Date.now() });
      setStoredJson(SCREENSHOT_NOTES_KEY, notes.slice(0, 30));
      render();
      showSmallToast('Screenshot note saved');
    };
    reader.readAsDataURL(file);
  };

  zone.addEventListener('paste', handlePaste);
  render();
}

function parseCoordinatesFromString(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  // Accept formats like: "12.34, 56.78" or "12.34 56.78"
  const m = trimmed.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lon = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { latitude: lat, longitude: lon };
}

function getWeatherQuery() {
  if (settings.useGPS && lastGeoCoords) {
    return {
      type: 'coords',
      latitude: lastGeoCoords.latitude,
      longitude: lastGeoCoords.longitude,
      label: 'Current Location'
    };
  }

  const fromText = parseCoordinatesFromString(settings.weatherLocation || '');
  if (fromText) {
    return { type: 'coords', ...fromText, label: `${fromText.latitude.toFixed(2)}, ${fromText.longitude.toFixed(2)}` };
  }

  const name = (settings.weatherLocation || '').trim();
  return { type: 'name', name, label: name };
}

function setUseGpsToggleUi(enabled) {
  const toggle = document.getElementById('toggleUseGPS');
  if (toggle) toggle.checked = !!enabled;
}

function setWeatherLocationInputValue(value) {
  const input = document.getElementById('weatherLocation');
  if (input && typeof value === 'string') {
    input.value = value;
  }
}

function haversineMeters(a, b) {
  if (!a || !b) return Number.POSITIVE_INFINITY;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const r = 6371000;
  const dLat = toRad((b.latitude || 0) - (a.latitude || 0));
  const dLon = toRad((b.longitude || 0) - (a.longitude || 0));
  const lat1 = toRad(a.latitude || 0);
  const lat2 = toRad(b.latitude || 0);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
}

function shouldProcessGeoUpdate(nextCoords) {
  const now = Date.now();
  if (!geoLastUpdateCoords) {
    geoLastUpdateCoords = nextCoords;
    geoLastUpdateAt = now;
    return true;
  }

  const elapsed = now - geoLastUpdateAt;
  const movedMeters = haversineMeters(geoLastUpdateCoords, nextCoords);
  if (elapsed < GEO_MIN_UPDATE_INTERVAL_MS && movedMeters < GEO_MIN_MOVE_METERS) {
    return false;
  }

  geoLastUpdateCoords = nextCoords;
  geoLastUpdateAt = now;
  return true;
}

async function syncLocationFromCoordinates(latitude, longitude) {
  try {
    const place = await reverseGeocodeOpenMeteo(latitude, longitude);
    if (!place || !place.name) return;
    const nextName = [place.name, place.country].filter(Boolean).join(', ');
    if (!nextName) return;
    persistWeatherLocationCache(nextName, { latitude, longitude });
    updateLocationUI(nextName);
    if (settings.weatherLocation === nextName) return;

    settings.weatherLocation = sanitizeText(nextName, INPUT_LIMITS.weatherLocation);
    setWeatherLocationInputValue(settings.weatherLocation);
    saveSettings();
  } catch {
    // ignore reverse geocode failures
  }
}

function geolocationUserMessage(err) {
  if (!err || typeof err !== 'object') return 'Unable to access location.';
  if (err.code === 1) return err.message || 'Location permission denied.';
  if (err.code === 2) return 'Location unavailable. Try entering a city manually.';
  if (err.code === 3) return 'Location timed out. Try again or enter a city manually.';
  return err.message || 'Unable to access location.';
}

function handleGeolocationError(err) {
  const msg = geolocationUserMessage(err);
  if (err && err.code === 3) {
    console.warn('Geolocation timeout:', err.message || msg);
  } else {
    console.error('Geolocation error:', err.message || msg);
  }

  // Permission denied: disable GPS mode so toggle state and behavior stay consistent.
  if (err && err.code === 1) {
    settings.useGPS = false;
    setUseGpsToggleUi(false);
    stopGeolocationWatch();
    saveSettings();
  }

  const input = document.getElementById('weatherLocation');
  if (input) showInputError(input, msg);

  const locationEl = document.getElementById('weatherLocationText');
  if (locationEl && settings.showWeather) {
    const fallbackLabel = (settings.weatherLocation || '').trim() || 'Location unavailable';
    locationEl.textContent = fallbackLabel;
  }
}

function startGeolocationWatch() {
  if (!settings.useGPS) return;
  if (!navigator.geolocation) {
    console.error('Geolocation not supported by this browser');
    return;
  }
  if (geoWatchId !== null || geoWatchBootstrapInFlight) return;
  geoWatchBootstrapInFlight = true;

  // Clear old geocode cache to force fresh local-area lookup
  geocodeCache = null;
  geocodeCacheKey = '';
  try { localStorage.removeItem('ios-newtab-geocode-cache'); } catch (e) {}

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      geoWatchBootstrapInFlight = false;
      // Permission granted - start watching
      const nextCoords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      if (!shouldProcessGeoUpdate(nextCoords)) return;
      lastGeoCoords = nextCoords;
      await syncLocationFromCoordinates(lastGeoCoords.latitude, lastGeoCoords.longitude);
      if (settings.showWeather) safeWeatherFetch(300);

      // Now start the continuous watch
      if (geoWatchId !== null) return;
      geoWatchId = navigator.geolocation.watchPosition(
        async (pos2) => {
          const nextCoords = {
            latitude: pos2.coords.latitude,
            longitude: pos2.coords.longitude,
          };
          if (!shouldProcessGeoUpdate(nextCoords)) return;
          lastGeoCoords = nextCoords;
          await syncLocationFromCoordinates(lastGeoCoords.latitude, lastGeoCoords.longitude);
          if (settings.showWeather) safeWeatherFetch(300);
        },
        (err) => {
          handleGeolocationError(err);
        },
        GEO_OPTIONS_WATCH
      );
    },
    (err) => {
      geoWatchBootstrapInFlight = false;
      handleGeolocationError(err);
    },
    GEO_OPTIONS_BOOTSTRAP
  );
}

function stopGeolocationWatch() {
  if (geoWatchId !== null) {
    try {
      navigator.geolocation.clearWatch(geoWatchId);
    } catch (e) {
      // ignore
    }
  }
  geoWatchId = null;
  geoWatchBootstrapInFlight = false;
  lastGeoCoords = null;
  geoRequestInFlight = false; // Reset in-flight flag to allow new requests
  geoRequestPromise = null;
  geoLastUpdateAt = 0;
  geoLastUpdateCoords = null;
}

function requestGeolocationOnce() {
  if (!settings.useGPS) return Promise.resolve(false);
  if (!navigator.geolocation) return Promise.resolve(false);
  if (geoRequestPromise) return geoRequestPromise;
  if (geoRequestInFlight) return Promise.resolve(false);
  geoRequestInFlight = true;
  // Clear old geocode cache to force fresh local-area lookup
  geocodeCache = null;
  geocodeCacheKey = '';
  try { localStorage.removeItem('ios-newtab-geocode-cache'); } catch (e) {}

  geoRequestPromise = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        geoRequestInFlight = false;
        const nextCoords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        if (!shouldProcessGeoUpdate(nextCoords)) {
          geoRequestPromise = null;
          resolve(!!lastGeoCoords);
          return;
        }
        lastGeoCoords = nextCoords;
        await syncLocationFromCoordinates(lastGeoCoords.latitude, lastGeoCoords.longitude);
        if (settings.showWeather) safeWeatherFetch(300);
        geoRequestPromise = null;
        resolve(true);
      },
      (err) => {
        geoRequestInFlight = false;
        if (err && err.code === 3) {
          console.warn('Geolocation timeout:', err.message || err);
        } else {
          console.error('Geolocation error:', err && err.message ? err.message : err);
        }
        geoRequestPromise = null;
        resolve(false);
      },
      GEO_OPTIONS_BOOTSTRAP
    );
  });

  return geoRequestPromise;
}

function normalizeConditionToIcon(conditionText, isDay = null) {
  const t = (conditionText || '').toLowerCase().trim();
  if (!t) return '🌡️';
  const normalized = t.replace(/\s+/g, ' ');
  // Night-specific variants for common sky conditions.
  // (We intentionally keep rain/snow/fog/thunder icons the same day/night.)
  if (isDay === false) {
    if (normalized.includes('clear') || normalized.includes('sun')) return '🌙';
    if (normalized.includes('partly cloudy') || normalized.includes('mostly clear')) return '🌙☁️';
    if (normalized.includes('cloud') || normalized.includes('overcast')) return '☁️';
  }

  if (weatherIcons[normalized]) return weatherIcons[normalized];
  if (weatherIcons[t]) return weatherIcons[t];

  // Keyword-based fallback for providers with varied phrasing
  if (normalized.includes('thunder')) return '⛈️';
  if (normalized.includes('snow') || normalized.includes('sleet') || normalized.includes('blizzard') || normalized.includes('ice')) return '❄️';
  if (normalized.includes('drizzle') || normalized.includes('shower')) return '🌦️';
  if (normalized.includes('rain')) return '🌧️';
  if (normalized.includes('fog') || normalized.includes('mist') || normalized.includes('haze')) return '🌫️';
  if (normalized.includes('overcast')) return '☁️';
  if (normalized.includes('cloud')) {
    if (isDay === false) return '🌙☁️';
    return '⛅';
  }
  if (normalized.includes('clear') || normalized.includes('sun')) {
    if (isDay === false) return '🌙';
    return '☀️';
  }
  if (normalized.includes('wind')) return '💨';
  return '🌡️';
}

// Cache for reverse geocode results to avoid repeated API calls
let geocodeCache = null;
let geocodeCacheKey = '';

// Load cached geocode from localStorage on init
try {
  const cached = localStorage.getItem('ios-newtab-geocode-cache');
  if (cached) {
    const parsed = JSON.parse(cached);
    // Invalidate old caches (2 decimal precision) - new format uses 3 decimals
    if (parsed && parsed.key && parsed.result && parsed.key.match(/^-?\d+\.\d{3},-?\d+\.\d{3}$/)) {
      geocodeCacheKey = parsed.key;
      geocodeCache = parsed.result;
    } else {
      // Clear stale cache with old precision
      localStorage.removeItem('ios-newtab-geocode-cache');
    }
  }
} catch (e) {}

function saveGeocodeCache(key, result) {
  try {
    localStorage.setItem('ios-newtab-geocode-cache', JSON.stringify({ key, result }));
  } catch (e) {}
}

async function reverseGeocodeOpenMeteo(latitude, longitude) {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  
  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }
  
  // Round to 3 decimal places for cache key (about 100m precision)
  const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  
  // Return cached result if coordinates haven't changed significantly
  if (geocodeCache && geocodeCacheKey === cacheKey) {
    return geocodeCache;
  }
  
  // Method 1: BigDataCloud (free, CORS-friendly, most reliable)
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res = await fetchWithTimeout(url, {}, 8000);
    if (res.ok) {
      const data = await res.json();
      if (data) {
        // Prefer most specific: locality/neighbourhood > city > state
        const localArea = data.locality || data.city || data.principalSubdivision || '';
        const cityName = data.city || data.principalSubdivision || '';
        const countryName = data.countryName || '';
        // Show "LocalArea, City" if they differ, otherwise just city
        let displayName = localArea;
        if (localArea && cityName && localArea !== cityName) {
          displayName = `${localArea}, ${cityName}`;
        }
        if (displayName) {
          const result = { name: displayName, country: countryName };
          geocodeCache = result;
          geocodeCacheKey = cacheKey;
          saveGeocodeCache(cacheKey, result);
          return result;
        }
      }
    }
  } catch (e) {
    // Continue to fallback
  }

  // Method 2: Nominatim/OpenStreetMap
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const res = await fetchWithTimeout(url, { 
      headers: { 'User-Agent': 'GlassNewTab/2.0' }
    }, 8000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        // Prefer most specific: suburb/neighbourhood > city_district > city
        const localArea = addr.suburb || addr.neighbourhood || addr.city_district || '';
        const cityName = addr.city || addr.town || addr.village || addr.municipality || 
                        addr.county || addr.state || '';
        const countryName = addr.country || '';
        // Show "LocalArea, City" if local area differs from city
        let displayName = localArea || cityName;
        if (localArea && cityName && localArea !== cityName) {
          displayName = `${localArea}, ${cityName}`;
        }
        if (displayName) {
          const result = { name: displayName, country: countryName };
          geocodeCache = result;
          geocodeCacheKey = cacheKey;
          saveGeocodeCache(cacheKey, result);
          return result;
        }
      }
    }
  } catch (e) {
    // Continue
  }
  
  return null;
}

function renderWeather({ tempC, feelsC, humidity, conditionText, locationText, icon, localtimeEpochSec, tzId, isDay, latitude, longitude }) {
  const temp = settings.useFahrenheit ? (tempC * 9/5) + 32 : tempC;
  const feels = settings.useFahrenheit ? (feelsC * 9/5) + 32 : feelsC;

  // If provider tells us it's night, prefer a moon icon for clear conditions.
  const resolvedIcon = (() => {
    if (typeof isDay === 'boolean') {
      const baseIcon = icon || normalizeConditionToIcon(conditionText, isDay);
      // Only override for sky-condition icons; keep rain/snow/etc unchanged.
      if (!isDay) {
        if (baseIcon === '☀️' || baseIcon === '🌤️' || baseIcon === '🌥️') return '🌙';
        if (baseIcon === '⛅') return '🌙☁️';
      }
      return baseIcon;
    }
    return icon || normalizeConditionToIcon(conditionText);
  })();

  document.getElementById('tempValue').textContent = Math.round(temp);
  document.getElementById('weatherCondition').textContent = conditionText || 'Unknown';
  const locationEl = document.getElementById('weatherLocationText');
  if (locationEl) locationEl.textContent = locationText || '';
  document.getElementById('weatherHumidity').textContent = `💧 ${Math.round(humidity)}%`;
  document.getElementById('weatherFeels').textContent = `🌡️ ${Math.round(feels)}°`;
  document.getElementById('weatherIcon').textContent = resolvedIcon || '🌡️';

  saveLastWeather({ tempC, feelsC, humidity, conditionText, locationText, icon: resolvedIcon, localtimeEpochSec, tzId, isDay });

  if (locationText) {
    persistWeatherLocationCache(locationText, { latitude, longitude });
  }

  // Keep greeting aligned with the detected location's local time.
  updateGreeting();
}

async function fetchWeatherFromWeatherApi(query) {
  const key = (settings.weatherApiKey || '').trim();
  if (!key) return null;

  let q = query.type === 'coords'
    ? `${query.latitude},${query.longitude}`
    : (query.name || '').trim();

  // If GPS is enabled but no coords available yet, don't use IP fallback - will try Open-Meteo instead
  if (!q && settings.useGPS) {
    return null;
  }

  // Only use IP fallback if GPS is explicitly disabled
  if (!q && !settings.useGPS) q = 'auto:ip';

  if (!q) return null; // No location data available

  const url = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&aqi=no`;
  let res;
  try {
    res = await fetchWithTimeout(url, {}, 10000);
  } catch (e) {
    return null;
  }
  if (!res.ok) {
    return null;
  }
  let data;
  try {
    data = await res.json();
  } catch {
    return null;
  }
  if (!data || !data.current || !data.location) return null;

  const conditionText = data.current.condition && data.current.condition.text ? data.current.condition.text : 'Unknown';
  const isDay = data.current && (data.current.is_day === 1 || data.current.is_day === 0)
    ? data.current.is_day === 1
    : null;
  const icon = normalizeConditionToIcon(conditionText, isDay);
  const locationTextParts = [data.location.name, data.location.country].filter(Boolean);
  const locationText = locationTextParts.join(', ');

  const localtimeEpochSec = Number(data.location.localtime_epoch);

  return {
    tempC: Number(data.current.temp_c),
    feelsC: Number(data.current.feelslike_c),
    humidity: Number(data.current.humidity),
    conditionText,
    locationText: locationText || (query.label || ''),
    icon,
    localtimeEpochSec: Number.isFinite(localtimeEpochSec) ? localtimeEpochSec : null,
    tzId: typeof data.location.tz_id === 'string' ? data.location.tz_id : null,
    isDay: typeof isDay === 'boolean' ? isDay : null,
    latitude: Number(data.location.lat),
    longitude: Number(data.location.lon),
  };
}

async function fetchWeatherFromOpenMeteo(query) {
  let latitude = null;
  let longitude = null;
  let locationName = '';
  let country = '';

  if (query.type === 'coords') {
    latitude = query.latitude;
    longitude = query.longitude;
    // Try to turn GPS coordinates into a friendly place name
    const place = await reverseGeocodeOpenMeteo(latitude, longitude);
    locationName = (place && place.name) ? place.name : (query.label || 'Current Location');
    country = (place && place.country) ? place.country : '';
  } else {
    const locationNameInput = (query.name || '').trim();
    if (!locationNameInput) {
      return null;
    }
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationNameInput)}&count=1&language=en&format=json`;
    let geoRes;
    try {
      geoRes = await fetchWithTimeout(geoUrl, {}, 9000);
    } catch {
      return null;
    }
    if (!geoRes.ok) {
      return null;
    }

    let geoData;
    try {
      geoData = await geoRes.json();
    } catch {
      return null;
    }
    if (!geoData.results || geoData.results.length === 0) {
      return null;
    }

    ({ latitude, longitude, name: locationName, country } = geoData.results[0]);
  }

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,is_day&timezone=auto`;
  let weatherRes;
  try {
    weatherRes = await fetchWithTimeout(weatherUrl, {}, 10000);
  } catch {
    return null;
  }
  if (!weatherRes.ok) {
    return null;
  }

  let weatherData;
  try {
    weatherData = await weatherRes.json();
  } catch {
    return null;
  }
  if (!weatherData || !weatherData.current) return null;

  const current = weatherData.current;
  const weatherCode = current.weather_code;
  const isDay = current && (current.is_day === 1 || current.is_day === 0)
    ? current.is_day === 1
    : null;
  const condition = weatherConditions[weatherCode] || { text: 'Unknown', icon: '🌡️' };
  const locationText = country ? `${locationName}, ${country}` : `${locationName}`;

  let icon = condition.icon;
  if (isDay === false) {
    if ((weatherCode === 0 || weatherCode === 1) && (icon === '☀️' || icon === '🌤️')) {
      icon = '🌙';
    }
    if (weatherCode === 2 && icon === '⛅') {
      icon = '🌙☁️';
    }
  }

  return {
    tempC: Number(current.temperature_2m),
    feelsC: Number(current.apparent_temperature),
    humidity: Number(current.relative_humidity_2m),
    conditionText: condition.text,
    locationText,
    icon,
    isDay: typeof isDay === 'boolean' ? isDay : null,
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
}

let _weatherFetchInFlight = false;

async function fetchWeatherByLocation() {
  try {
    if (!settings.showWeather) return;
    if (_weatherFetchInFlight) return; // Prevent overlapping fetches
    _weatherFetchInFlight = true;
    if (settings.useGPS && !lastGeoCoords) {
      await requestGeolocationOnce();
      if (!lastGeoCoords) {
        const locationEl = document.getElementById('weatherLocationText');
        if (locationEl) {
          locationEl.textContent = (settings.weatherLocation || '').trim() || 'Location unavailable';
        }
        return;
      }
    }

    const query = getWeatherQuery();

    // Prefer WeatherAPI if user provided a key, fallback to Open-Meteo.
    const fromWeatherApi = await fetchWeatherFromWeatherApi(query);
    if (fromWeatherApi) {
      renderWeather(fromWeatherApi);
      return;
    }

    const fromOpenMeteo = await fetchWeatherFromOpenMeteo(query);
    if (fromOpenMeteo) {
      renderWeather(fromOpenMeteo);
      return;
    }

    // If network blocked, show last known weather (silent fallback)
    const cached = loadLastWeather();
    if (cached) {
      renderWeather(cached);
    }
  } catch (err) {
    // Avoid noisy console errors for transient network issues
    const cached = loadLastWeather();
    if (cached) {
      renderWeather(cached);
      return;
    }
    // silent
  } finally {
    _weatherFetchInFlight = false;
  }
}

// Weather code to condition mapping (WMO codes)
const weatherConditions = {
  0: { text: 'Clear', icon: '☀️' },
  1: { text: 'Mainly Clear', icon: '🌤️' },
  2: { text: 'Partly Cloudy', icon: '⛅' },
  3: { text: 'Overcast', icon: '☁️' },
  45: { text: 'Foggy', icon: '🌫️' },
  48: { text: 'Rime Fog', icon: '🌫️' },
  51: { text: 'Light Drizzle', icon: '🌧️' },
  53: { text: 'Drizzle', icon: '🌧️' },
  55: { text: 'Heavy Drizzle', icon: '🌧️' },
  61: { text: 'Light Rain', icon: '🌧️' },
  63: { text: 'Rain', icon: '🌧️' },
  65: { text: 'Heavy Rain', icon: '🌧️' },
  71: { text: 'Light Snow', icon: '❄️' },
  73: { text: 'Snow', icon: '❄️' },
  75: { text: 'Heavy Snow', icon: '❄️' },
  77: { text: 'Snow Grains', icon: '❄️' },
  80: { text: 'Light Showers', icon: '🌦️' },
  81: { text: 'Showers', icon: '🌦️' },
  82: { text: 'Heavy Showers', icon: '🌦️' },
  85: { text: 'Light Snow Showers', icon: '🌨️' },
  86: { text: 'Snow Showers', icon: '🌨️' },
  95: { text: 'Thunderstorm', icon: '⛈️' },
  96: { text: 'Thunderstorm with Hail', icon: '⛈️' },
  99: { text: 'Thunderstorm with Heavy Hail', icon: '⛈️' }
};

function updateWeatherUI(data, locationName, country) {
  const current = data.current;
  
  const tempC = current.temperature_2m;
  const feelsC = current.apparent_temperature;
  const temp = settings.useFahrenheit ? (tempC * 9/5) + 32 : tempC;
  const feels = settings.useFahrenheit ? (feelsC * 9/5) + 32 : feelsC;
  
  const weatherCode = current.weather_code;
  const condition = weatherConditions[weatherCode] || { text: 'Unknown', icon: '🌡️' };
  
  document.getElementById('tempValue').textContent = Math.round(temp);
  document.getElementById('weatherCondition').textContent = condition.text;
  const locationEl = document.getElementById('weatherLocationText');
  if (locationEl) locationEl.textContent = `${locationName}, ${country}`;
  document.getElementById('weatherHumidity').textContent = `💧 ${current.relative_humidity_2m}%`;
  document.getElementById('weatherFeels').textContent = `🌡️ ${Math.round(feels)}°`;
  document.getElementById('weatherIcon').textContent = condition.icon;
}

function setSaveButtonFeedback(btn, { state, text, durationMs = 1200 } = {}) {
  if (!btn) return;

  const originalText = btn.dataset.originalText || btn.textContent;
  btn.dataset.originalText = originalText;

  const clearTimerId = btn.dataset.feedbackTimer ? Number(btn.dataset.feedbackTimer) : null;
  if (Number.isFinite(clearTimerId)) {
    try { clearTimeout(clearTimerId); } catch { /* ignore */ }
  }

  btn.classList.remove('is-working', 'is-saved', 'is-error');
  if (state) btn.classList.add(state);
  if (typeof text === 'string') btn.textContent = text;

  if (state === 'is-working') {
    btn.disabled = true;
    return;
  }

  btn.disabled = false;
  const tid = setTimeout(() => {
    btn.classList.remove('is-working', 'is-saved', 'is-error');
    btn.textContent = btn.dataset.originalText || originalText;
    btn.disabled = false;
    btn.dataset.feedbackTimer = '';
  }, durationMs);
  btn.dataset.feedbackTimer = String(tid);
}

async function validateWeatherApiKeyForCurrentContext() {
  const key = (settings.weatherApiKey || '').trim();
  if (!key) return { ok: false, reason: 'empty' };

  // Validate with an inexpensive call; prefer IP auto-detect (doesn't require GPS).
  const url = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent('auto:ip')}&aqi=no`;
  let res;
  try {
    res = await fetchWithTimeout(url, {}, 10000);
  } catch {
    return { ok: false, reason: 'network' };
  }
  if (res && res.ok) return { ok: true };
  if (res && (res.status === 401 || res.status === 403)) return { ok: false, reason: 'invalid' };
  return { ok: false, reason: 'unknown' };
}

// ============================================
// Dock & Apps
// ============================================

function initDock() {
  renderDock();
  scheduleDockMount();
}

function scheduleDockMount() {
  const dockContainer = document.querySelector('.dock-container');
  if (!dockContainer) return;
  if (dockContainer.dataset.mountInitialized === '1') return;

  dockContainer.dataset.mountInitialized = '1';

  if (settings.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dockContainer.classList.remove('dock-preload');
    dockContainer.classList.add('dock-mounted');
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dockContainer.classList.add('dock-mounted');
      dockContainer.classList.remove('dock-preload');
    });
  });
}

function renderDock() {
  const dock = document.getElementById('appDock');
  if (!dock) return;
  
  // Clear existing apps (keep the button and divider)
  const existingApps = dock.querySelectorAll('.dock-app');
  existingApps.forEach(app => app.remove());
  
  // Only render custom dock apps (user controlled)
  customDockApps.forEach(app => {
    const link = document.createElement('a');
    const safeHref = normalizeUrlForFavicon(app.url);
    link.href = safeHref || '#';
    if (!safeHref) {
      link.addEventListener('click', (e) => e.preventDefault());
    }
    link.className = 'dock-app';
    link.title = app.name;
    const safeIcon = sanitizeIconValue(app.icon || '');
    const isUrlIcon = /^https?:\/\//i.test(safeIcon) || /^data:image\//i.test(safeIcon);

    if (safeIcon && !isUrlIcon) {
      const span = document.createElement('span');
      span.className = 'dock-app-emoji';
      span.textContent = safeIcon;
      span.setAttribute('aria-hidden', 'true');
      link.appendChild(span);
    } else {
      const img = document.createElement('img');
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.referrerPolicy = 'no-referrer';
      attachIconFallback(img, isUrlIcon ? [safeIcon] : getFaviconCandidates(app.url), {
        cacheHost: getHostnameFromAnyUrl(app.url) || '',
        name: app.name || '',
      });
      link.appendChild(img);
    }
    const label = document.createElement('span');
    label.className = 'dock-app-label';
    label.textContent = app.name || '';
    link.appendChild(label);
    dock.appendChild(link);
  });
}

function initAppsGrid() {
  const grid = document.getElementById('appsGrid');
  if (!grid) return;
  _appsGridInitialized = true;
  clearElement(grid);
  _appsGridItems = [];

  const fragment = document.createDocumentFragment();
  
  allApps.forEach(app => {
    const item = document.createElement('a');
    item.href = app.url;
    item.className = 'app-item';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'app-icon';

    const gridIcon = sanitizeIconValue(typeof app.icon === 'string' ? app.icon : '');
    const gridUseEmoji = gridIcon && !/^https?:\/\//i.test(gridIcon) && !/^data:image\//i.test(gridIcon);

    if (gridUseEmoji) {
      const span = document.createElement('span');
      span.className = 'app-icon-emoji';
      span.textContent = gridIcon;
      span.setAttribute('role', 'img');
      span.setAttribute('aria-label', app.name || '');
      iconWrap.appendChild(span);
    } else {
      const img = document.createElement('img');
      img.alt = app.name;
      img.referrerPolicy = 'no-referrer';
      attachIconFallback(img, getFaviconCandidates(app.url), {
        cacheHost: getHostnameFromAnyUrl(app.url) || '',
        name: app.name || '',
      });
      iconWrap.appendChild(img);
    }

    const label = document.createElement('span');
    label.textContent = app.name;

    item.appendChild(iconWrap);
    item.appendChild(label);
    fragment.appendChild(item);
    _appsGridItems.push(item);
  });

  grid.appendChild(fragment);
}

// ============================================
// Global Escape Key Handler
// ============================================

function initEscapeKeyHandler() {
  if (document._escBound) return;
  document._escBound = true;
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // Close modals/panels in priority order (topmost first)
    const settingsPanel = document.getElementById('settingsPanel');
    const appsModal = document.getElementById('appsModal');
    const todoModal = document.getElementById('todoModal');
    const nameModal = document.getElementById('nameModal');
    const stickyNotes = document.getElementById('stickyNotes');

    if (nameModal && nameModal.classList.contains('active')) {
      closeNameModal();
    } else if (todoModal && todoModal.classList.contains('active')) {
      todoModal.classList.remove('active');
      const todoOverlay = document.getElementById('todoOverlay');
      if (todoOverlay) todoOverlay.classList.remove('active');
    } else if (appsModal && appsModal.classList.contains('active')) {
      appsModal.classList.remove('active');
      const appsOverlay = document.getElementById('appsOverlay');
      if (appsOverlay) appsOverlay.classList.remove('active');
      const appsSearchInput = document.getElementById('appsSearchInput');
      if (appsSearchInput) { appsSearchInput.value = ''; filterApps(''); }
    } else if (stickyNotes && stickyNotes.classList.contains('open')) {
      stickyNotesOpen = false;
      applyStickyNotesUiState();
    } else if (settingsPanel && settingsPanel.classList.contains('active')) {
      closeSettings();
    }
  });
}

// ============================================
// Modals
// ============================================

function initModals() {
  // Apps modal
  const showAllBtn = document.getElementById('showAllApps');
  const appsModal = document.getElementById('appsModal');
  const appsOverlay = document.getElementById('appsOverlay');
  const closeApps = document.getElementById('closeAppsModal');
  const appsSearchInput = document.getElementById('appsSearchInput');
  const appsClearSearch = document.getElementById('appsClearSearch');

  bindScrollPerformance(document.getElementById('appsGrid'));

  // Prevent double-binding
  if (appsModal.dataset.initBound) return;
  appsModal.dataset.initBound = '1';
  
  showAllBtn.addEventListener('click', () => {
    if (!_appsGridInitialized) initAppsGrid();
    appsModal.classList.add('active');
    appsOverlay.classList.add('active');
    // Focus search input after modal opens
    setTimeout(() => appsSearchInput.focus(), 300);
  });
  
  const closeAppsModal = () => {
    appsModal.classList.remove('active');
    appsOverlay.classList.remove('active');
    // Clear search when closing
    appsSearchInput.value = '';
    appsClearSearch.style.display = 'none';
    filterApps('');
  };
  
  closeApps.addEventListener('click', closeAppsModal);
  appsOverlay.addEventListener('click', closeAppsModal);
  
  // Apps search functionality with debounce for smooth performance
  let searchTimeout = null;
  appsSearchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    appsClearSearch.style.display = query ? 'flex' : 'none';
    
    // Debounce search for smoother typing
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => filterApps(query), 50);
  });
  
  appsClearSearch.addEventListener('click', () => {
    appsSearchInput.value = '';
    appsClearSearch.style.display = 'none';
    if (searchTimeout) clearTimeout(searchTimeout);
    filterApps('');
    appsSearchInput.focus();
  });
  
  // Name modal
  const nameOverlay = document.getElementById('nameOverlay');
  const nameClose = document.getElementById('closeNameModal');
  const saveBtn = document.getElementById('saveNameBtn');
  
  nameClose.addEventListener('click', closeNameModal);
  nameOverlay.addEventListener('click', closeNameModal);
  saveBtn.addEventListener('click', saveName);
  
  // Real-time character count feedback
  const nameInputEl = document.getElementById('nameInput');
  nameInputEl.addEventListener('input', (e) => {
    const len = e.target.value.trim().length;
    const maxLen = INPUT_LIMITS.userName;
    const remaining = maxLen - len;
    
    // Update visual feedback
    if (len > maxLen) {
      nameInputEl.style.borderColor = '#ff4444';
      nameInputEl.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
    } else if (remaining <= 3) {
      nameInputEl.style.borderColor = '#ffaa00';
      nameInputEl.style.backgroundColor = 'rgba(255, 170, 0, 0.1)';
    } else {
      nameInputEl.style.borderColor = '';
      nameInputEl.style.backgroundColor = '';
    }
    
    // Show character count
    const countEl = document.getElementById('nameCharCount') || createCharCountDisplay();
    countEl.textContent = `${len}/${maxLen}`;
    countEl.style.color = len > maxLen ? '#ff4444' : (remaining <= 3 ? '#ffaa00' : 'rgba(255,255,255,0.6)');
  });
  
  nameInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveName();
  });
}

// Filter apps in the grid
function filterApps(query) {
  const grid = document.getElementById('appsGrid');
  if (!grid) return;

  const appItems = _appsGridItems.length ? _appsGridItems : Array.from(grid.querySelectorAll('.app-item'));
  if (!appItems.length) return;

  const lowerQuery = query.toLowerCase().trim();

  if (_appsFilterRafId !== null) {
    try { cancelAnimationFrame(_appsFilterRafId); } catch (e) { /* ignore */ }
    _appsFilterRafId = null;
  }
  
  // Use requestAnimationFrame for smooth rendering
  _appsFilterRafId = requestAnimationFrame(() => {
    _appsFilterRafId = null;
    appItems.forEach(item => {
      const appName = item.querySelector('span').textContent.toLowerCase();
      const isVisible = lowerQuery === '' || appName.includes(lowerQuery);
      item.classList.toggle('filtered-out', !isVisible);
    });
  });
}

// ============================================
// ToDo Widget
// ============================================

let todos = [];

function initTodo() {
  // Load todos from localStorage
  try {
    const saved = localStorage.getItem('ios-newtab-todos');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        todos = parsed.slice(0, INPUT_LIMITS.maxTodos).filter(t => {
          if (!t || typeof t !== 'object') return false;
          if (typeof t.id !== 'number' || !Number.isFinite(t.id)) return false;
          if (typeof t.text !== 'string' || !t.text.trim()) return false;
          return true;
        }).map(t => ({
          id: t.id,
          text: sanitizeText(t.text, INPUT_LIMITS.todoText),
          completed: !!t.completed
        }));
      }
    }
  } catch (e) {
    console.error('Error loading todos:', e);
  }
  
  renderTodos();
  updateStats();
  
  // Elements
  const input = document.getElementById('todoInput');
  const addBtn = document.getElementById('todoAddBtn');
  const clearBtn = document.getElementById('clearCompletedBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Current filter
  let currentFilter = 'all';
  
  // Add todo function
  const addTodo = () => {
    const raw = input.value.trim();
    if (!raw) return;
    
    if (raw.length > INPUT_LIMITS.todoText) {
      showInputError(input, `Task too long (max ${INPUT_LIMITS.todoText} chars).`);
      return;
    }
    
    if (todos.length >= INPUT_LIMITS.maxTodos) {
      showInputError(input, `Maximum ${INPUT_LIMITS.maxTodos} tasks. Delete some first.`);
      return;
    }
    
    const text = sanitizeText(raw, INPUT_LIMITS.todoText);
    if (text) {
      todos.unshift({
        id: Date.now(),
        text,
        completed: false
      });
      saveTodos();
      renderTodos();
      updateStats();
      input.value = '';
    }
  };
  
  // Event listeners
  if (addBtn) addBtn.addEventListener('click', addTodo);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  }
  
  // Clear completed
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const completedCount = todos.filter(t => t.completed).length;
      if (completedCount === 0) return;
      
      if (confirm(`Clear ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
        updateStats();
      }
    });
  }
  
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTodos();
    });
  });
  
  // Update filter state
  window.todoFilter = currentFilter;
}

function saveTodos() {
  try {
    localStorage.setItem('ios-newtab-todos', JSON.stringify(todos));
  } catch (e) {
    console.error('Error saving todos:', e);
  }
}

function renderTodos() {
  const list = document.getElementById('todoList');
  const emptyState = document.getElementById('todoEmptyState');
  if (!list) return;
  
  clearElement(list);
  
  // Get current filter
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
  
  // Filter todos
  let filteredTodos = todos;
  if (filter === 'active') {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  }
  
  // Show/hide empty state
  if (emptyState) {
    emptyState.style.display = filteredTodos.length === 0 ? 'block' : 'none';
  }
  
  if (filteredTodos.length === 0) return;
  
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = String(todo.id);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = `todo-checkbox${todo.completed ? ' checked' : ''}`;
    toggleBtn.dataset.action = 'toggle';
    toggleBtn.dataset.id = String(todo.id);
    toggleBtn.type = 'button';

    const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkSvg.setAttribute('viewBox', '0 0 24 24');
    checkSvg.setAttribute('fill', 'none');
    checkSvg.setAttribute('stroke', 'currentColor');
    checkSvg.setAttribute('stroke-width', '3');
    const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    checkPath.setAttribute('d', 'M5 13l4 4L19 7');
    checkSvg.appendChild(checkPath);
    toggleBtn.appendChild(checkSvg);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'todo-delete';
    delBtn.dataset.action = 'delete';
    delBtn.dataset.id = String(todo.id);
    delBtn.type = 'button';
    const xSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    xSvg.setAttribute('viewBox', '0 0 24 24');
    xSvg.setAttribute('fill', 'none');
    xSvg.setAttribute('stroke', 'currentColor');
    xSvg.setAttribute('stroke-width', '2');
    const xPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    xPath.setAttribute('d', 'M18 6L6 18M6 6l12 12');
    xSvg.appendChild(xPath);
    delBtn.appendChild(xSvg);

    li.appendChild(toggleBtn);
    li.appendChild(text);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  if (!list.dataset.bound) {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn || !list.contains(btn)) return;
      e.preventDefault();
      const id = Number(btn.dataset.id);
      if (!Number.isFinite(id)) return;
      if (btn.dataset.action === 'toggle') toggleTodo(id);
      if (btn.dataset.action === 'delete') deleteTodo(id);
    });
    list.dataset.bound = '1';
  }
}

function updateStats() {
  const statsEl = document.getElementById('todoStats');
  const clearBtn = document.getElementById('clearCompletedBtn');
  
  if (statsEl) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    let text = '';
    if (total === 0) {
      text = '0 tasks';
    } else if (completed === 0) {
      text = `${active} active`;
    } else if (active === 0) {
      text = `${completed} completed`;
    } else {
      text = `${active} active, ${completed} completed`;
    }
    
    statsEl.querySelector('.todo-count').textContent = text;
  }
  
  if (clearBtn) {
    const completedCount = todos.filter(t => t.completed).length;
    clearBtn.disabled = completedCount === 0;
  }
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
    updateStats();
  }
}

function deleteTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  
  // Show confirmation for non-empty tasks
  if (todo.text.trim().length > 0) {
    const confirmed = confirm(`Delete task: "${todo.text}"?`);
    if (!confirmed) return;
  }
  
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
  updateStats();
}

// ============================================
// Settings Panel
// ============================================

function initSettingsPanel() {
  const settingsBtn = document.getElementById('settingsBtn');
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const closeBtn = document.getElementById('closeSettings');

  // Prevent double-binding
  if (panel.dataset.initBound) return;
  panel.dataset.initBound = '1';
  
  settingsBtn.addEventListener('click', () => {
    // Use RAF for smooth animation start
    requestAnimationFrame(() => {
      panel.classList.add('active');
      overlay.classList.add('active');
    });
  });
  
  closeBtn.addEventListener('click', closeSettings);
  overlay.addEventListener('click', closeSettings);

  bindScrollPerformance(panel.querySelector('.settings-content'));
  
  // Initialize all settings controls
  initSettingsControls();
}

function closeSettings() {
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  requestAnimationFrame(() => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
  });
}

function initSettingsControls() {
  // ===== CLOCK SETTINGS =====
  initToggle('toggleHideClock', 'hideClock', () => {
    const clockContainer = document.querySelector('.clock-container');
    if (clockContainer) clockContainer.style.display = settings.hideClock ? 'none' : 'block';
    restartClockTimer();
  });
  
  initToggle('toggleDigitalClock', 'digitalClock', () => {
    updateClockDisplay();
    updateDigitalClockSubOptions();
    restartClockTimer();
  });
  initToggle('toggle12Hour', 'use12Hour', updateClockDisplay);
  initToggle('toggleSeconds', 'showSeconds', () => {
    const secondHand = document.getElementById('secondHand');
    if (secondHand) secondHand.style.display = settings.showSeconds ? 'block' : 'none';
    updateClockDisplay();
    restartClockTimer();
  });
  
  // Show/hide digital-only sub-options on init
  updateDigitalClockSubOptions();
  
  // ===== GREETING SETTINGS =====
  initToggle('toggleGreeting', 'showGreeting', () => {
    const greetingContainer = document.querySelector('.greeting-container');
    const greetingText = document.getElementById('greetingText');
    if (greetingContainer) greetingContainer.style.display = settings.showGreeting ? 'block' : 'none';
    if (greetingText) greetingText.style.display = settings.showGreeting ? 'block' : 'none';
  });
  
  initToggle('toggleCustomText', 'showCustomText', () => {
    const userName = document.getElementById('userName');
    if (userName) userName.style.display = settings.showCustomText ? 'block' : 'none';
  });

  // ===== SEARCH SETTINGS =====
  initToggle('toggleHideMic', 'hideMic', () => {
    const micBtn = document.getElementById('micBtn');
    const input = document.getElementById('searchInput');
    applyMicVisibility();

    // If the user re-enables the microphone after startup, ensure voice search is initialized.
    if (micBtn && input && !settings.hideMic) {
      initVoiceSearch(micBtn, input);
    }
  });

  initToggle('toggleQuotes', 'showQuotes', () => {
    const quoteContainer = document.getElementById('quoteContainer');
    if (!quoteContainer) return;

    quoteContainer.style.display = settings.showQuotes ? 'block' : 'none';
    if (settings.showQuotes && !quoteContainer.querySelector('.quote-text')?.textContent) {
      displayRandomQuote();
    }
  });

  const voiceLanguageSelect = document.getElementById('voiceLanguageSelect');
  if (voiceLanguageSelect) {
    const currentVoiceLang = sanitizeEnglishVoiceLanguage(settings.voiceLanguage, DEFAULT_SETTINGS.voiceLanguage);
    voiceLanguageSelect.value = currentVoiceLang;

    if (!voiceLanguageSelect.dataset.bound) {
      voiceLanguageSelect.addEventListener('change', () => {
        const nextVoiceLang = sanitizeEnglishVoiceLanguage(voiceLanguageSelect.value, DEFAULT_SETTINGS.voiceLanguage);
        settings.voiceLanguage = nextVoiceLang;
        voiceLanguageSelect.value = nextVoiceLang;
        saveSettings();
      });
      voiceLanguageSelect.dataset.bound = '1';
    }
  }
  
  // Name input
  const nameInput = document.getElementById('settingsName');
  if (nameInput) {
    nameInput.value = settings.userName;
    nameInput.setAttribute('maxlength', String(INPUT_LIMITS.userName));
    
    // Real-time character count feedback for settings name input
    nameInput.addEventListener('input', (e) => {
      const len = e.target.value.trim().length;
      const maxLen = INPUT_LIMITS.userName;
      const remaining = maxLen - len;
      
      // Create or update helper text
      let helperText = nameInput.parentElement.querySelector('.input-helper');
      if (!helperText) {
        helperText = document.createElement('div');
        helperText.className = 'input-helper';
        helperText.style.cssText = `
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
          font-weight: 500;
        `;
        nameInput.parentElement.appendChild(helperText);
      }
      
      helperText.textContent = `${len}/${maxLen} characters`;
      if (len > maxLen) {
        helperText.style.color = '#ff4444';
      } else if (remaining <= 3) {
        helperText.style.color = '#ffaa00';
      } else {
        helperText.style.color = 'rgba(255,255,255,0.6)';
      }
    });
    
    nameInput.addEventListener('change', () => {
      const sanitized = sanitizeText(nameInput.value, INPUT_LIMITS.userName);
      settings.userName = sanitized;
      nameInput.value = sanitized;

      saveSettings();
      const userNameEl = document.getElementById('userName');
      if (userNameEl) userNameEl.textContent = sanitized || 'Name';
    });
  }

  initToggle('toggleUseGPS', 'useGPS', async () => {
    if (settings.useGPS) {
      // ============ STEP 1: RESET STATE ON TOGGLE ON ============
      // Clear any in-flight request from previous toggle
      geoRequestInFlight = false;
      
      // Kill any existing watchers
      if (geoWatchId !== null) {
        try { navigator.geolocation.clearWatch(geoWatchId); } catch {}
      }
      geoWatchId = null;
      
      // Reset location coordinates
      lastGeoCoords = null;
      
      // Clear cached geocode data
      geocodeCache = null;
      geocodeCacheKey = '';
      try { localStorage.removeItem('ios-newtab-geocode-cache'); } catch (e) {}

      // Persist explicit geolocation toggle key for reliability.
      storageLocalSet({ [GEOLOCATION_TOGGLE_KEY]: true }).catch(() => {});
      
      // Show detecting message
      setWeatherLocationInputValue('Detecting current location...');
      
      // Start fresh geolocation watch
      startGeolocationWatch();
      await requestGeolocationOnce();
      safeWeatherFetch(0);
      return;
    }

    // ============ STEP 1: RESET STATE ON TOGGLE OFF ============
    // Clear any in-flight request
    geoRequestInFlight = false;
    
    // Kill any active watchers
    if (geoWatchId !== null) {
      try { navigator.geolocation.clearWatch(geoWatchId); } catch {}
    }
    geoWatchId = null;
    lastGeoCoords = null;
    
    // Clear loading state from UI
    const input = document.getElementById('weatherLocation');
    if (input && input.value === 'Detecting current location...') {
      input.value = '';
    }
    
    // Reset toggle state in storage
    storageLocalSet({ [GEOLOCATION_TOGGLE_KEY]: false }).catch(() => {});
    
    // Fetch weather using user-provided location instead
    safeWeatherFetch(0);
  });
  
  // Location save button
  const saveLocationBtn = document.getElementById('saveLocation');
  const locationInput = document.getElementById('weatherLocation');
  if (saveLocationBtn && locationInput) {
    locationInput.value = settings.weatherLocation;
    locationInput.setAttribute('maxlength', String(INPUT_LIMITS.weatherLocation));
    saveLocationBtn.addEventListener('click', () => {
      const raw = String(locationInput.value || '').trim();
      if (raw.length > INPUT_LIMITS.weatherLocation) {
        showInputError(locationInput, `Location too long (max ${INPUT_LIMITS.weatherLocation} chars).`);
        return;
      }
      // Basic content check — reject suspicious patterns
      if (/<script|javascript:/i.test(raw)) {
        showInputError(locationInput, 'Invalid location input.');
        return;
      }
      setSaveButtonFeedback(saveLocationBtn, { state: 'is-working', text: 'Saving…' });
      settings.weatherLocation = sanitizeText(raw, INPUT_LIMITS.weatherLocation);
      saveSettings();
      safeWeatherFetch(0);
      setSaveButtonFeedback(saveLocationBtn, { state: 'is-saved', text: 'Saved' });
    });
  }
  
  // API key save button
  const saveApiKeyBtn = document.getElementById('saveApiKey');
  const apiKeyInput = document.getElementById('weatherApiKey');
  if (saveApiKeyBtn && apiKeyInput) {
    apiKeyInput.value = settings.weatherApiKey || '';
    apiKeyInput.setAttribute('maxlength', String(INPUT_LIMITS.weatherApiKey));
    saveApiKeyBtn.addEventListener('click', async () => {
      if (weatherApiKeyValidationInFlight) return;
      weatherApiKeyValidationInFlight = true;
      saveApiKeyBtn.disabled = true;

      const prev = settings.weatherApiKey || '';
      const rawKey = String(apiKeyInput.value || '').trim();
      
      // Validate API key format (alphanumeric only, reasonable length)
      if (rawKey && !/^[a-zA-Z0-9_\-]{8,80}$/.test(rawKey)) {
        setSaveButtonFeedback(saveApiKeyBtn, { state: 'is-error', text: 'Invalid format', durationMs: 1800 });
        weatherApiKeyValidationInFlight = false;
        saveApiKeyBtn.disabled = false;
        return;
      }
      settings.weatherApiKey = rawKey;
      saveSettings();

      setSaveButtonFeedback(saveApiKeyBtn, { state: 'is-working', text: 'Checking…' });
      const result = await validateWeatherApiKeyForCurrentContext();
      if (!result.ok) {
        // Revert on invalid key to avoid silently breaking weather.
        if (result.reason === 'invalid') {
          settings.weatherApiKey = prev;
          saveSettings();
          apiKeyInput.value = prev;
          setSaveButtonFeedback(saveApiKeyBtn, { state: 'is-error', text: 'Invalid key', durationMs: 1800 });
          weatherApiKeyValidationInFlight = false;
          saveApiKeyBtn.disabled = false;
          return;
        }

        // Network/unknown: keep saved but inform user.
        setSaveButtonFeedback(saveApiKeyBtn, { state: 'is-error', text: 'Saved (offline)', durationMs: 1600 });
        safeWeatherFetch(0);
        weatherApiKeyValidationInFlight = false;
        saveApiKeyBtn.disabled = false;
        return;
      }

      setSaveButtonFeedback(saveApiKeyBtn, { state: 'is-saved', text: 'Saved', durationMs: 1200 });
      safeWeatherFetch(0);
      weatherApiKeyValidationInFlight = false;
      saveApiKeyBtn.disabled = false;
    });
  }
  
  // ===== APPS SETTINGS =====
  initToggle('toggleTodoWidget', 'showTodoWidget', () => {
    const todoWidget = document.getElementById('todoWidget');
    if (todoWidget) todoWidget.style.display = settings.showTodoWidget ? 'flex' : 'none';
  });
  
  initToggle('toggleStickyNotes', 'showStickyNotes', () => {
    stickyNotesOpen = false;
    applyStickyNotesUiState();
  });
  
  initToggle('toggleGoogleApps', 'showGoogleApps', () => {
    const dockContainer = document.querySelector('.dock-container');
    if (dockContainer) dockContainer.style.display = settings.showGoogleApps ? 'flex' : 'none';
  });
  
  initToggle('toggleAdaptiveIcons', 'adaptiveIcons', applyAdaptiveIcons);
  
  // Dock position (value sync only — listener is in initDockAppsSettings)
  const dockPositionSelect = document.getElementById('dockPosition');
  if (dockPositionSelect) {
    dockPositionSelect.value = settings.dockPosition || 'right';
  }
  
  // Initialize custom dock apps UI
  initDockAppsSettings();
  
  // ===== THEME =====
  const themeOptions = document.querySelectorAll('#themeSelector .theme-option');
  themeOptions.forEach(btn => {
    if (btn.dataset.theme === settings.theme) btn.classList.add('active');
    btn.addEventListener('click', () => {
      themeOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.theme = btn.dataset.theme;
      saveSettings();
      applyTheme();
    });
  });
  
  // ===== ACCENT COLOR =====
  const colorDots = document.querySelectorAll('#colorGrid .color-dot');
  colorDots.forEach(btn => {
    if (btn.dataset.color === settings.accentColor) btn.classList.add('active');
    btn.addEventListener('click', () => {
      colorDots.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.accentColor = btn.dataset.color;
      saveSettings();
      applyAccentColor();
    });
  });
  
  // ===== WALLPAPER =====
  document.getElementById('uploadWallpaper').addEventListener('click', () => {
    document.getElementById('wallpaperInput').click();
  });
  document.getElementById('wallpaperInput').addEventListener('change', handleWallpaperUpload);
  document.getElementById('randomWallpaper').addEventListener('click', setRandomWallpaper);
  document.getElementById('clearWallpaper').addEventListener('click', clearWallpaper);
  
  // ===== DATA =====
  document.getElementById('backupSettings').addEventListener('click', backupSettings);
  document.getElementById('restoreSettings').addEventListener('click', () => {
    document.getElementById('restoreInput').click();
  });
  document.getElementById('restoreInput').addEventListener('change', restoreSettingsFromFile);
  document.getElementById('resetSettings').addEventListener('click', resetAllSettings);
}

// Helper function for toggle initialization
function initToggle(elementId, settingKey, callback) {
  const toggle = document.getElementById(elementId);
  if (!toggle) return;

  if (toggle.dataset.bound === '1') {
    toggle.checked = settings[settingKey];
    return;
  }
  
  toggle.checked = settings[settingKey];
  toggle.addEventListener('change', () => {
    settings[settingKey] = toggle.checked;
    saveSettings();
    if (callback) callback();
  });
  toggle.dataset.bound = '1';
}

// ============================================
// Theme & Appearance
// ============================================

function applyTheme() {
  const theme = settings.theme;
  
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Keep the default engine icon color synced with active theme.
  updateSearchEngineUI();
}

function applyAccentColor() {
  const color = settings.accentColor;
  const rgb = hexToRgb(color);
  
  document.documentElement.style.setProperty('--accent', color);
  if (rgb) {
    document.documentElement.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  
  // Re-apply adaptive icons when accent color changes
  applyAdaptiveIcons();
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// ============================================
// Custom Dock Apps Settings
// ============================================

let currentEditingDockAppId = null;

function initDockAppsSettings() {
  const addBtn = document.getElementById('addDockApp');
  const iconInput = document.getElementById('dockIconInput');
  const positionSelect = document.getElementById('dockPosition');
  
  // Initialize position select (guard against duplicate listeners)
  if (positionSelect) {
    positionSelect.value = settings.dockPosition || 'right';
    if (!positionSelect.dataset.bound) {
      positionSelect.addEventListener('change', (e) => {
        settings.dockPosition = e.target.value;
        saveSettings();
        applyDockPosition();
      });
      positionSelect.dataset.bound = '1';
    }
  }
  
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener('click', () => {
      // Enforce max dock apps limit
      if (customDockApps.length >= INPUT_LIMITS.maxDockApps) {
        alert(`Maximum ${INPUT_LIMITS.maxDockApps} dock apps allowed. Remove one first.`);
        return;
      }
      const newApp = {
        id: Date.now(),
        name: 'New App',
        url: '',
        icon: ''
      };
      customDockApps.push(newApp);
      saveDockApps();
      renderDockAppsSettings();
      renderDock(); // Update actual dock
    });
    addBtn.dataset.bound = '1';
  }
  
  if (iconInput && !iconInput.dataset.bound) {
    iconInput.addEventListener('change', handleDockIconUpload);
    iconInput.dataset.bound = '1';
  }
  
  renderDockAppsSettings();
}

function renderDockAppsSettings() {
  const list = document.getElementById('dockAppsList');
  if (!list) return;

  clearElement(list);
  
  if (customDockApps.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'dock-empty';
    empty.textContent = 'No custom apps. Click Add to create one.';
    list.appendChild(empty);
    return;
  }

  customDockApps.forEach(app => {
    const item = document.createElement('div');
    item.className = 'dock-app-item';
    item.dataset.id = String(app.id);

    const iconWrap = document.createElement('div');
    iconWrap.className = 'dock-app-icon';
    const settingsSafeIcon = sanitizeIconValue(app.icon);
    const settingsIsUrlIcon = /^https?:\/\//i.test(settingsSafeIcon) || /^data:image\//i.test(settingsSafeIcon);

    const inputs = document.createElement('div');
    inputs.className = 'dock-app-inputs';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'dock-app-name';
    nameInput.value = app.name || '';
    nameInput.dataset.id = String(app.id);
    nameInput.dataset.field = 'name';
    nameInput.placeholder = 'App name';
    nameInput.name = `dock-app-name-${app.id}`;
    nameInput.maxLength = INPUT_LIMITS.dockAppName;

    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'dock-app-url';
    urlInput.value = app.url || '';
    urlInput.dataset.id = String(app.id);
    urlInput.dataset.field = 'url';
    urlInput.placeholder = 'https://example.com';
    urlInput.name = `dock-app-url-${app.id}`;
    urlInput.maxLength = INPUT_LIMITS.dockAppUrl;

    inputs.appendChild(nameInput);
    inputs.appendChild(urlInput);

    const actions = document.createElement('div');
    actions.className = 'dock-app-actions';

    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'dock-upload-btn';
    uploadBtn.dataset.id = String(app.id);
    uploadBtn.title = 'Upload custom icon';
    uploadBtn.type = 'button';
    uploadBtn.textContent = 'Icon';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'dock-delete-btn';
    deleteBtn.dataset.id = String(app.id);
    deleteBtn.title = 'Delete app';
    deleteBtn.type = 'button';
    const trashSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    trashSvg.setAttribute('viewBox', '0 0 24 24');
    trashSvg.setAttribute('fill', 'none');
    trashSvg.setAttribute('stroke', 'currentColor');
    trashSvg.setAttribute('stroke-width', '2');
    const trashPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    trashPoly.setAttribute('points', '3 6 5 6 21 6');
    const trashPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    trashPath.setAttribute('d', 'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2');
    trashSvg.appendChild(trashPoly);
    trashSvg.appendChild(trashPath);
    deleteBtn.appendChild(trashSvg);

    actions.appendChild(uploadBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(iconWrap);
    item.appendChild(inputs);
    item.appendChild(actions);
    list.appendChild(item);

    if (settingsSafeIcon && !settingsIsUrlIcon) {
      const span = document.createElement('span');
      span.className = 'dock-app-icon-emoji';
      span.textContent = settingsSafeIcon;
      span.setAttribute('role', 'img');
      span.setAttribute('aria-label', app.name || '');
      iconWrap.appendChild(span);
    } else {
      const img = document.createElement('img');
      img.alt = app.name || '';
      iconWrap.appendChild(img);
      attachIconFallback(img, settingsIsUrlIcon ? [settingsSafeIcon] : getFaviconCandidates(app.url), {
        cacheHost: getHostnameFromAnyUrl(app.url) || '',
        name: app.name || '',
      });
    }
  });

  if (!list.dataset.bound) {
    list.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const id = Number(target.dataset.id);
      const field = target.dataset.field;
      if (!Number.isFinite(id) || !field) return;
      const app = customDockApps.find(a => a.id === id);
      if (!app) return;

      if (field === 'name') {
        const sanitized = sanitizeText(target.value, INPUT_LIMITS.dockAppName);
        if (target.value.trim().length > INPUT_LIMITS.dockAppName) {
          showInputError(target, `Name too long (max ${INPUT_LIMITS.dockAppName} chars).`);
        }
        app.name = sanitized;
        target.value = sanitized; // reflect trimmed value
      }
      if (field === 'url') {
        const rawValue = target.value.trim().slice(0, INPUT_LIMITS.dockAppUrl);
        const urlResult = validateUrl(rawValue);
        if (!urlResult.valid && rawValue) {
          showInputError(target, urlResult.message);
          app.url = collapseRepeatedProtocolPrefix(rawValue);
          target.value = app.url;
        } else if (urlResult.valid) {
          app.url = urlResult.url;
          target.value = urlResult.url;
        } else {
          app.url = '';
          target.value = '';
        }
        delete app.domain;
      }
      saveDockApps();
      renderDock();
      renderDockAppsSettings();
    });

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || !list.contains(btn)) return;
      const id = Number(btn.dataset.id);
      if (!Number.isFinite(id)) return;

      if (btn.classList.contains('dock-upload-btn')) {
        currentEditingDockAppId = id;
        document.getElementById('dockIconInput').click();
      }
      if (btn.classList.contains('dock-delete-btn')) {
        customDockApps = customDockApps.filter(a => a.id !== id);
        saveDockApps();
        renderDockAppsSettings();
        renderDock();
      }
    });

    list.dataset.bound = '1';
  }
}

function handleDockIconUpload(e) {
  const file = e.target.files[0];
  if (!file || !currentEditingDockAppId) return;
  
  // Validate file type and size
  const validation = validateFileUpload(file, {
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/x-icon'],
    maxBytes: INPUT_LIMITS.maxIconBytes,
    label: 'Icon'
  });
  if (!validation.valid) {
    alert(validation.message);
    e.target.value = '';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const app = customDockApps.find(a => a.id === currentEditingDockAppId);
    if (app) {
      // Sanitize the data URL before saving
      const sanitized = sanitizeIconValue(event.target.result);
      if (!sanitized) {
        alert('Invalid icon format. Please use PNG, JPG, WebP, or GIF.');
        currentEditingDockAppId = null;
        return;
      }
      app.icon = sanitized;
      saveDockApps();
      renderDockAppsSettings();
      renderDock();
    }
    currentEditingDockAppId = null;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function getDomainFromUrl(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    // Explicit overrides for service subdomains where base-domain collapsing is undesirable.
    const domainMap = {
      'mail.google.com': 'gmail.com',
      'drive.google.com': 'drive.google.com',
      'docs.google.com': 'docs.google.com',
      'sheets.google.com': 'sheets.google.com',
      'slides.google.com': 'slides.google.com',
      'calendar.google.com': 'calendar.google.com',
      'photos.google.com': 'photos.google.com',
      'maps.google.com': 'maps.google.com',
      'meet.google.com': 'meet.google.com',
      'chat.google.com': 'chat.google.com',
      'music.youtube.com': 'music.youtube.com',
      'keep.google.com': 'keep.google.com'
    };
    return domainMap[hostname] || getBaseDomainFromHostname(hostname) || hostname;
  } catch {
    return 'google.com';
  }
}

// ============================================
// Motivational Quotes
// ============================================

function shuffleIndices(size) {
  const arr = Array.from({ length: size }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function isValidQuoteOrder(order) {
  if (!Array.isArray(order) || order.length !== quotes.length) return false;
  const seen = new Set();
  for (const idx of order) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= quotes.length) return false;
    if (seen.has(idx)) return false;
    seen.add(idx);
  }
  return seen.size === quotes.length;
}

function loadQuoteState() {
  try {
    const raw = localStorage.getItem(QUOTE_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    const order = Array.isArray(parsed.order) ? parsed.order : null;
    const cursor = Number(parsed.cursor);
    const lastIndex = Number(parsed.lastIndex);

    if (!isValidQuoteOrder(order)) return null;
    if (!Number.isInteger(cursor) || cursor < 0 || cursor > order.length) return null;
    if (!Number.isInteger(lastIndex) || lastIndex < -1 || lastIndex >= quotes.length) return null;

    return { order, cursor, lastIndex };
  } catch {
    return null;
  }
}

function saveQuoteState() {
  if (!_quoteState) return;
  try {
    localStorage.setItem(QUOTE_STATE_KEY, JSON.stringify(_quoteState));
  } catch {
    // ignore localStorage failures
  }
}

function rebuildQuoteCycle(previousLastIndex = -1) {
  const order = shuffleIndices(quotes.length);

  // Avoid immediate repeat when rolling into a new cycle.
  if (order.length > 1 && order[0] === previousLastIndex) {
    const first = order.shift();
    order.push(first);
  }

  return {
    order,
    cursor: 0,
    lastIndex: previousLastIndex,
  };
}

function ensureQuoteState() {
  if (_quoteState) return;
  _quoteState = loadQuoteState() || rebuildQuoteCycle(-1);
}

function getNextQuote() {
  ensureQuoteState();

  if (!_quoteState || _quoteState.cursor >= _quoteState.order.length) {
    const previousLast = _quoteState && Number.isInteger(_quoteState.lastIndex) ? _quoteState.lastIndex : -1;
    _quoteState = rebuildQuoteCycle(previousLast);
  }

  const index = _quoteState.order[_quoteState.cursor];
  _quoteState.cursor += 1;
  _quoteState.lastIndex = index;
  saveQuoteState();

  return quotes[index] || '';
}

function displayRandomQuote() {
  const quoteText = document.getElementById('quoteText');
  if (!quoteText) return;

  quoteText.textContent = getNextQuote();
}

function displayNextQuoteAnimated() {
  const quoteText = document.getElementById('quoteText');
  if (!quoteText || _quoteAnimating) return;

  _quoteAnimating = true;
  quoteText.classList.add('is-transitioning');

  if (_quoteTransitionTimer) {
    try { clearTimeout(_quoteTransitionTimer); } catch (e) { /* ignore */ }
    _quoteTransitionTimer = null;
  }

  _quoteTransitionTimer = setTimeout(() => {
    quoteText.textContent = getNextQuote();
    quoteText.classList.remove('is-transitioning');
    _quoteAnimating = false;
    _quoteTransitionTimer = null;
  }, QUOTE_TRANSITION_MS);
}

function initQuoteInteractions() {
  const quoteContainer = document.getElementById('quoteContainer');
  if (!quoteContainer || quoteContainer.dataset.interactiveBound === '1') return;

  quoteContainer.dataset.interactiveBound = '1';
  quoteContainer.setAttribute('role', 'button');
  quoteContainer.setAttribute('tabindex', '0');
  quoteContainer.setAttribute('aria-label', 'Show next quote');

  quoteContainer.addEventListener('click', () => {
    if (!settings.showQuotes) return;
    displayNextQuoteAnimated();
  });

  quoteContainer.addEventListener('keydown', (e) => {
    if (!settings.showQuotes) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    displayNextQuoteAnimated();
  });
}

// Start quote interval - called during init
function startQuoteInterval() {
  if (_intervals.quote !== null) return; // Already running
  _intervals.quote = setInterval(() => {
    if (settings.showQuotes) {
      displayNextQuoteAnimated();
    }
  }, 30000);
}

// ============================================
// Adaptive Icons
// ============================================

function applyAdaptiveIcons() {
  const dock = document.querySelector('.dock');
  const appsModal = document.querySelector('.apps-modal');
  
  if (settings.adaptiveIcons) {
    if (dock) dock.classList.add('adaptive-icons');
    if (appsModal) appsModal.classList.add('adaptive-icons');
  } else {
    if (dock) dock.classList.remove('adaptive-icons');
    if (appsModal) appsModal.classList.remove('adaptive-icons');
  }
}

// ============================================
// Dock Position
// ============================================

function applyDockPosition() {
  const dockContainer = document.querySelector('.dock-container');
  if (!dockContainer) return;
  
  // Remove all position classes
  dockContainer.classList.remove('position-top', 'position-left', 'position-right', 'position-bottom');
  
  // Add the appropriate position class
  dockContainer.classList.add(`position-${settings.dockPosition || 'right'}`);

  // Keep mount animation frame-synced after initial layout settles.
  scheduleDockMount();
}

// ============================================
// Wallpaper
// ============================================

function preloadWallpaperImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';

    const cleanup = () => {
      img.onload = null;
      img.onerror = null;
      img.src = '';
    };

    img.onload = async () => {
      try {
        if (typeof img.decode === 'function') {
          await img.decode();
        }
      } catch {
        // decode can fail on some browsers even when image is usable.
      }
      cleanup();
      resolve();
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('Failed to preload wallpaper image'));
    };

    img.src = url;
  });
}

async function applyWallpaper(options = {}) {
  const { animateSwap = true } = options;
  const el = document.getElementById('wallpaper');
  if (DEBUG) console.log('Applying wallpaper:', settings.wallpaper ? 'Has wallpaper' : 'No wallpaper');
  
  if (!el) {
    console.error('Wallpaper element not found!');
    return;
  }

  // If the page is unloading, don't touch wallpaper state — a race condition
  // could erase the ios-newtab-has-wallpaper flag used by early-theme.js.
  if (_unloading) return;
  
  const safe = sanitizeWallpaperValue(settings.wallpaper);
  if (safe) {
    // Quote the URL to reduce any chance of CSS parsing weirdness.
    const quoted = safe.replace(/"/g, '%22').replace(/\n/g, '');
    const cssUrl = `url("${quoted}")`;
    const reduceMotion = !!settings.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canCrossfade = animateSwap && !reduceMotion && el.classList.contains('active') && _wallpaperCurrentCssUrl && _wallpaperCurrentCssUrl !== cssUrl;

    if (canCrossfade) {
      const token = ++_wallpaperSwapToken;

      try {
        await preloadWallpaperImage(safe);
      } catch {
        // If preload fails, fall back to direct apply.
      }

      if (_unloading || token !== _wallpaperSwapToken) return;

      el.style.setProperty('--wallpaper-next-image', cssUrl);
      el.classList.add('is-swapping');

      // Let the overlay layer fade in before committing the real background.
      await new Promise((resolve) => setTimeout(resolve, 360));
      if (_unloading || token !== _wallpaperSwapToken) return;
    }

    el.style.backgroundImage = cssUrl;
    _wallpaperCurrentCssUrl = cssUrl;

    if (canCrossfade) {
      el.classList.remove('is-swapping');
      el.style.removeProperty('--wallpaper-next-image');
    }

    el.classList.add('active');
    try { localStorage.setItem('ios-newtab-has-wallpaper', '1'); } catch (e) {}
    if (DEBUG) console.log('Wallpaper applied successfully');
  } else {
    _wallpaperSwapToken += 1;
    _wallpaperCurrentCssUrl = '';
    el.classList.remove('is-swapping');
    el.style.removeProperty('--wallpaper-next-image');
    el.style.backgroundImage = '';
    el.classList.remove('active');
    try { localStorage.removeItem('ios-newtab-has-wallpaper'); } catch (e) {}
  }
  // Remove the pending class so background gradient fades in if no wallpaper
  document.documentElement.classList.remove('wallpaper-pending');
  updateWallpaperPreview();
  // Also update the auto wallpaper widget preview
  updateAwPreviewWidget(safe || '');
}

function updateWallpaperPreview() {
  const preview = document.getElementById('wallpaperPreview');
  if (!preview) return;
  
  const safe = sanitizeWallpaperValue(settings.wallpaper);
  if (safe) {
    const quoted = safe.replace(/"/g, '%22').replace(/\n/g, '');
    const urlVal = `url("${quoted}")`;
    preview.style.backgroundImage = urlVal;
    preview.style.setProperty('--wp-url', urlVal);
    preview.classList.add('has-wallpaper');
    clearElement(preview);
  } else {
    preview.style.backgroundImage = '';
    preview.style.removeProperty('--wp-url');
    preview.classList.remove('has-wallpaper');
    clearElement(preview);
    const span = document.createElement('span');
    span.textContent = 'No wallpaper set';
    preview.appendChild(span);
  }
}

function handleWallpaperUpload(e) {
  const file = e.target.files[0];
  if (!file) {
    if (DEBUG) console.log('No file selected');
    return;
  }
  
  // Reset file input so re-selecting the same file triggers change event
  e.target.value = '';
  
  // Validate file type and size
  const validation = validateFileUpload(file, {
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
    maxBytes: INPUT_LIMITS.maxWallpaperBytes,
    label: 'Wallpaper'
  });
  if (!validation.valid) {
    alert(validation.message);
    return;
  }
  
  if (DEBUG) console.log('Uploading wallpaper:', file.name, file.size, 'bytes');
  
  // Compress image before saving
  const img = new Image();
  
  const cleanupImg = () => {
    img.onload = null;
    img.onerror = null;
    img.src = ''; // Release memory
  };
  
  img.onload = () => {
    if (DEBUG) console.log('Image loaded:', img.width, 'x', img.height);
    const canvas = document.createElement('canvas');
    const maxSize = 1920;
    let width = img.width;
    let height = img.height;
    
    // Resize if too large
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else {
        width = (width / height) * maxSize;
        height = maxSize;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    
    // Convert to JPEG for smaller size
    const compressedData = canvas.toDataURL('image/jpeg', 0.8);
    if (DEBUG) console.log('Compressed size:', compressedData.length, 'chars');
    settings.wallpaper = compressedData;
    saveWallpaper(compressedData);
    applyWallpaper();
    
    cleanupImg();
  };
  
  img.onerror = () => {
    console.error('Failed to load image');
    cleanupImg();
  };
  
  const reader = new FileReader();
  reader.onload = (ev) => {
    if (DEBUG) console.log('File read complete');
    img.src = ev.target.result;
    // Clean up reader
    reader.onload = null;
    reader.onerror = null;
  };
  reader.onerror = () => {
    console.error('Failed to read file');
    reader.onload = null;
    reader.onerror = null;
  };
  reader.readAsDataURL(file);
}

async function setRandomWallpaper() {
  if (_randomWallpaperInFlight) return;

  const randomBtn = document.getElementById('randomWallpaper');
  _randomWallpaperInFlight = true;
  if (randomBtn) randomBtn.disabled = true;

  const seed = Math.random().toString(36).substring(7);
  const wallpaperUrl = `https://picsum.photos/seed/${seed}/1920/1080`;

  try {
    settings.wallpaper = wallpaperUrl;
    saveWallpaper(wallpaperUrl);
    await applyWallpaper({ animateSwap: true });
  } finally {
    _randomWallpaperInFlight = false;
    if (randomBtn) randomBtn.disabled = false;
  }
}

function clearWallpaper() {
  settings.wallpaper = '';
  saveWallpaper('');
  applyWallpaper();
}

// ============================================
// Prayer Times + Tab Assistant
// ============================================

const CUSTOM_WALLPAPERS_KEY = 'ios-newtab-custom-wallpapers';
const SLIDESHOW_SETTINGS_KEY = 'ios-newtab-slideshow-settings';
const AUTO_WALLPAPER_DAY_KEY = 'ios-newtab-auto-wallpaper-day';

// Slideshow state
let customWallpapers = [];
let currentWallpaperIndex = 0;
let slideshowInterval = null;
let slideshowSettings = {
  enabled: true,
  interval: 60000, // 1 minute in milliseconds
  currentIndex: 0
};

function getAutoWallpaperQuery(theme) {
  if (theme === 'nature') return 'nature,landscape,mountains,lake,minimal';
  if (theme === 'city') return 'city,architecture,night,minimal,street';
  return 'minimal,clean,abstract,wallpaper,aesthetic';
}

function setAutoWallpaperMeta(text) {
  const meta = document.getElementById('autoWallpaperMeta');
  if (meta) meta.textContent = text;
}

function updateAwPreviewWidget(wallpaperUrl) {
  const previewImg = document.getElementById('awPreviewImg');
  const placeholder = document.getElementById('awPreviewPlaceholder');
  const statusEl = document.getElementById('awPreviewStatus');
  const statusText = document.getElementById('awStatusText');

  if (!previewImg) return;

  if (wallpaperUrl && wallpaperUrl.startsWith('http')) {
    // Show loading state
    if (statusEl) { statusEl.textContent = 'Loading…'; statusEl.className = 'aw-preview-status loading'; }
    previewImg.onload = () => {
      previewImg.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
      if (statusEl) { statusEl.textContent = 'Live'; statusEl.className = 'aw-preview-status loaded'; }
    };
    previewImg.onerror = () => {
      previewImg.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
      if (statusEl) { statusEl.textContent = 'Error'; statusEl.className = 'aw-preview-status'; }
    };
    previewImg.src = wallpaperUrl;
  } else if (wallpaperUrl) {
    // data: URL or base64
    previewImg.src = wallpaperUrl;
    previewImg.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    if (statusEl) { statusEl.textContent = 'Custom'; statusEl.className = 'aw-preview-status loaded'; }
  } else {
    previewImg.style.display = 'none';
    previewImg.src = '';
    if (placeholder) placeholder.style.display = 'flex';
    if (statusEl) { statusEl.textContent = 'Auto'; statusEl.className = 'aw-preview-status'; }
  }
  if (statusText) statusText.textContent = settings.autoWallpaperEnabled ? 'Auto-cycling on' : 'Manual mode';
}

async function refreshAutoWallpaper(force = false) {
  if (!settings.autoWallpaperEnabled) return;

  const dayToken = new Date().toISOString().slice(0, 10);
  const key = `${dayToken}:${settings.autoWallpaperTheme || 'minimal'}`;
  const last = localStorage.getItem(AUTO_WALLPAPER_DAY_KEY);
  if (!force && last === key) {
    setAutoWallpaperMeta(`Already updated for ${dayToken}`);
    // Still update preview with current wallpaper
    updateAwPreviewWidget(settings.wallpaper);
    return;
  }

  const query = getAutoWallpaperQuery(settings.autoWallpaperTheme || 'minimal');
  const dailySeed = Number(dayToken.replace(/-/g, '')) % 100000;
  const wallpaperUrl = `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}&sig=${dailySeed}`;

  settings.wallpaper = wallpaperUrl;
  saveWallpaper(wallpaperUrl);
  updateAwPreviewWidget(wallpaperUrl);
  await applyWallpaper({ animateSwap: true });
  localStorage.setItem(AUTO_WALLPAPER_DAY_KEY, key);
  setAutoWallpaperMeta(`Theme: ${settings.autoWallpaperTheme} • Updated ${dayToken}`);
}

// ============================================
// Slideshow Functions
// ============================================

function loadCustomWallpapers() {
  try {
    const saved = localStorage.getItem(CUSTOM_WALLPAPERS_KEY);
    if (saved) {
      customWallpapers = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading custom wallpapers:', e);
    customWallpapers = [];
  }
}

function saveCustomWallpapers() {
  try {
    localStorage.setItem(CUSTOM_WALLPAPERS_KEY, JSON.stringify(customWallpapers));
  } catch (e) {
    console.error('Error saving custom wallpapers:', e);
  }
}

function loadSlideshowSettings() {
  try {
    const saved = localStorage.getItem(SLIDESHOW_SETTINGS_KEY);
    if (saved) {
      slideshowSettings = { ...slideshowSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading slideshow settings:', e);
  }
}

function saveSlideshowSettings() {
  try {
    localStorage.setItem(SLIDESHOW_SETTINGS_KEY, JSON.stringify(slideshowSettings));
  } catch (e) {
    console.error('Error saving slideshow settings:', e);
  }
}

function addCustomWallpapers(files) {
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wallpaper = {
          id: Date.now() + Math.random(),
          name: file.name,
          url: e.target.result,
          addedAt: new Date().toISOString()
        };
        customWallpapers.push(wallpaper);
        saveCustomWallpapers();
        renderGallery();
        updateWallpaperCounter();
      };
      reader.readAsDataURL(file);
    }
  });
}

function deleteCustomWallpaper(id) {
  if (confirm('Delete this wallpaper?')) {
    customWallpapers = customWallpapers.filter(w => w.id !== id);
    saveCustomWallpapers();
    renderGallery();
    updateWallpaperCounter();
    
    // Adjust current index if needed
    if (currentWallpaperIndex >= customWallpapers.length && customWallpapers.length > 0) {
      currentWallpaperIndex = customWallpapers.length - 1;
    }
  }
}

function renderGallery() {
  const grid = document.getElementById('awGalleryGrid');
  const empty = document.getElementById('awGalleryEmpty');
  
  if (!grid) return;
  
  grid.innerHTML = '';
  
  if (customWallpapers.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  
  if (empty) empty.style.display = 'none';
  
  customWallpapers.forEach((wallpaper, index) => {
    const item = document.createElement('div');
    item.className = `aw-gallery-item${index === currentWallpaperIndex ? ' active' : ''}`;
    item.dataset.id = wallpaper.id;
    item.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = wallpaper.url;
    img.alt = wallpaper.name;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'aw-gallery-item-delete';
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteCustomWallpaper(wallpaper.id);
    };
    
    item.appendChild(img);
    item.appendChild(deleteBtn);
    
    item.onclick = () => {
      selectWallpaper(index);
    };
    
    grid.appendChild(item);
  });
}

function selectWallpaper(index) {
  if (index < 0 || index >= customWallpapers.length) return;
  
  currentWallpaperIndex = index;
  slideshowSettings.currentIndex = index;
  saveSlideshowSettings();
  
  const wallpaper = customWallpapers[index];
  settings.wallpaperUrl = wallpaper.url;
  settings.wallpaperEnabled = true;
  saveSettings();
  
  applyWallpaper({ animateSwap: true });
  updateAwPreviewWidget(wallpaper.url);
  renderGallery();
  updateWallpaperCounter();
}

function nextWallpaper() {
  if (customWallpapers.length === 0) return;
  const nextIndex = (currentWallpaperIndex + 1) % customWallpapers.length;
  selectWallpaper(nextIndex);
}

function previousWallpaper() {
  if (customWallpapers.length === 0) return;
  const prevIndex = (currentWallpaperIndex - 1 + customWallpapers.length) % customWallpapers.length;
  selectWallpaper(prevIndex);
}

function updateWallpaperCounter() {
  const counter = document.getElementById('awCounter');
  if (counter && customWallpapers.length > 0) {
    counter.textContent = `${currentWallpaperIndex + 1} / ${customWallpapers.length}`;
    counter.style.display = 'block';
  } else if (counter) {
    counter.style.display = 'none';
  }
}

function startSlideshow() {
  if (slideshowInterval) clearInterval(slideshowInterval);
  
  slideshowSettings.enabled = true;
  saveSlideshowSettings();
  
  slideshowInterval = setInterval(() => {
    nextWallpaper();
  }, slideshowSettings.interval);
  
  updateSlideshowUI();
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
  
  slideshowSettings.enabled = false;
  saveSlideshowSettings();
  
  updateSlideshowUI();
}

function toggleSlideshow() {
  if (slideshowSettings.enabled) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
}

function updateSlideshowUI() {
  const toggleBtn = document.getElementById('slideshowToggleBtn');
  const statusText = document.getElementById('awStatusText');
  const dot = document.getElementById('awDot');
  const intervalSelect = document.getElementById('slideshowInterval');
  
  if (toggleBtn) {
    toggleBtn.className = slideshowSettings.enabled ? 'aw-slideshow-btn active' : 'aw-slideshow-btn';
    toggleBtn.textContent = slideshowSettings.enabled ? '⏸️' : '▶️';
    toggleBtn.title = slideshowSettings.enabled ? 'Pause slideshow' : 'Start slideshow';
  }
  
  if (statusText) {
    statusText.textContent = slideshowSettings.enabled ? 'Slideshow: ON' : 'Slideshow: OFF';
  }
  
  if (dot) {
    dot.style.background = slideshowSettings.enabled ? 'rgba(52, 199, 89, 0.8)' : 'rgba(255, 59, 48, 0.8)';
  }
  
  if (intervalSelect) {
    intervalSelect.value = slideshowSettings.interval / 1000;
  }
}

function initAutoWallpaper() {
  // Load slideshow data
  loadCustomWallpapers();
  loadSlideshowSettings();
  
  const select = document.getElementById('autoWallpaperTheme');
  const refreshBtn = document.getElementById('autoWallpaperRefreshBtn');
  const themesContainer = document.getElementById('autoWallpaperThemes');
  
  // New slideshow controls
  const slideshowToggleBtn = document.getElementById('slideshowToggleBtn');
  const prevBtn = document.getElementById('prevWallpaperBtn');
  const nextBtn = document.getElementById('nextWallpaperBtn');
  const addBtn = document.getElementById('addWallpaperBtn');
  const fileInput = document.getElementById('wallpaperFileInput');
  const intervalSelect = document.getElementById('slideshowInterval');

  // Initialize gallery and UI
  renderGallery();
  updateWallpaperCounter();
  updateSlideshowUI();
  
  // Start slideshow if enabled and has wallpapers
  if (slideshowSettings.enabled && customWallpapers.length > 1) {
    startSlideshow();
  }

  // Event listeners for slideshow controls
  if (slideshowToggleBtn && !slideshowToggleBtn.dataset.bound) {
    slideshowToggleBtn.addEventListener('click', toggleSlideshow);
    slideshowToggleBtn.dataset.bound = '1';
  }
  
  if (prevBtn && !prevBtn.dataset.bound) {
    prevBtn.addEventListener('click', previousWallpaper);
    prevBtn.dataset.bound = '1';
  }
  
  if (nextBtn && !nextBtn.dataset.bound) {
    nextBtn.addEventListener('click', nextWallpaper);
    nextBtn.dataset.bound = '1';
  }
  
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener('click', () => fileInput.click());
    addBtn.dataset.bound = '1';
  }
  
  if (fileInput && !fileInput.dataset.bound) {
    fileInput.addEventListener('change', (e) => {
      addCustomWallpapers(e.target.files);
      e.target.value = ''; // Clear input
    });
    fileInput.dataset.bound = '1';
  }
  
  if (intervalSelect && !intervalSelect.dataset.bound) {
    intervalSelect.addEventListener('change', (e) => {
      slideshowSettings.interval = parseInt(e.target.value) * 1000;
      saveSlideshowSettings();
      
      // Restart slideshow if it was running
      if (slideshowSettings.enabled) {
        stopSlideshow();
        startSlideshow();
      }
    });
    intervalSelect.dataset.bound = '1';
  }

  // Original theme controls
  if (select) {
    select.value = settings.autoWallpaperTheme || 'minimal';
    if (!select.dataset.bound) {
      select.addEventListener('change', async (e) => {
        settings.autoWallpaperTheme = e.target.value;
        saveSettings();
        syncChipActiveState(e.target.value);
        await refreshAutoWallpaper(true);
      });
      select.dataset.bound = '1';
    }
  }

  // Theme chip buttons — supports both .wallpaper-theme-chip and .aw-chip
  function syncChipActiveState(activeVal) {
    if (!themesContainer) return;
    themesContainer.querySelectorAll('.wallpaper-theme-chip, .aw-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.themeValue === activeVal);
    });
  }

  if (themesContainer && !themesContainer.dataset.bound) {
    themesContainer.dataset.bound = '1';
    syncChipActiveState(settings.autoWallpaperTheme || 'minimal');

    themesContainer.addEventListener('click', async (e) => {
      const chip = e.target.closest('.wallpaper-theme-chip, .aw-chip');
      if (!chip) return;
      const themeValue = chip.dataset.themeValue;
      if (!themeValue || themeValue === settings.autoWallpaperTheme) return;
      settings.autoWallpaperTheme = themeValue;
      saveSettings();
      if (select) select.value = themeValue;
      syncChipActiveState(themeValue);
      // Show loading state in preview
      const statusEl = document.getElementById('awPreviewStatus');
      if (statusEl) { statusEl.textContent = 'Loading…'; statusEl.className = 'aw-preview-status loading'; }
      await refreshAutoWallpaper(true);
    });
  }

  if (refreshBtn && !refreshBtn.dataset.bound) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      const statusEl = document.getElementById('awPreviewStatus');
      if (statusEl) { statusEl.textContent = 'Refreshing…'; statusEl.className = 'aw-preview-status loading'; }
      try {
        await refreshAutoWallpaper(true);
      } finally {
        refreshBtn.disabled = false;
      }
    });
    refreshBtn.dataset.bound = '1';
  }

  void refreshAutoWallpaper(false);
}

async function resolveDashboardCoordinates() {
  if (settings.useGPS && lastGeoCoords) return { ...lastGeoCoords };
  const textCoords = parseCoordinatesFromString(settings.weatherLocation || '');
  if (textCoords) return textCoords;
  try {
    const data = await storageLocalGet([WEATHER_LOCATION_CACHE_KEYS.coords]);
    const cached = normalizeStoredCoords(data[WEATHER_LOCATION_CACHE_KEYS.coords]);
    if (cached) return cached;
  } catch {
    // ignore
  }
  return null;
}

function formatPrayerTime(rawTime) {
  if (typeof rawTime !== 'string') return '--:--';
  const main = rawTime.split(' ')[0] || rawTime;
  const [h, m] = main.split(':').map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return '--:--';
  const period = h >= 12 ? 'pm' : 'am';
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

let _activeNextPrayer = null;

function updatePrayerCountdown() {
  const el = document.getElementById('prayerNextCountdown');
  if (!el || !_activeNextPrayer || !_activeNextPrayer.dt) {
    if (el) el.textContent = '--';
    return;
  }
  const now = new Date();
  const diffMs = _activeNextPrayer.dt - now;
  if (diffMs <= 0) {
    el.textContent = 'Now';
    void refreshPrayerTimes();
    return;
  }
  const diffMin = Math.ceil(diffMs / 60000);
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  if (h > 0) {
    el.textContent = `in ${h}h ${m}m`;
  } else {
    el.textContent = `in ${m}m`;
  }
}

function getNextPrayer(prayers) {
  const now = new Date();
  let next = null;
  prayers.forEach((p) => {
    const main = (p.raw || '').split(' ')[0];
    const [h, m] = main.split(':').map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return;
    const dt = new Date(now);
    dt.setHours(h, m, 0, 0);
    if (dt >= now && (!next || dt < next.dt)) {
      next = { ...p, dt };
    }
  });
  if (next) return next;
  if (prayers[0]) {
    const p = prayers[0];
    const main = (p.raw || '').split(' ')[0];
    const [h, m] = main.split(':').map(Number);
    const dt = new Date(now);
    dt.setDate(dt.getDate() + 1);
    dt.setHours(h, m, 0, 0);
    return { ...p, dt };
  }
  return null;
}

const PRAYER_ICONS = {
  Fajr: '🌅',
  Dhuhr: '☀️',
  Asr: '⛅',
  Maghrib: '🌇',
  Isha: '🌙'
};

function renderPrayerTimes(prayers, nextPrayer, note = '') {
  const grid = document.getElementById('prayerTimesGrid');
  const nextName = document.getElementById('prayerNextName');
  const nextTime = document.getElementById('prayerNextTime');
  if (!grid || !nextName || !nextTime) return;

  _activeNextPrayer = nextPrayer;

  clearElement(grid);
  prayers.forEach((p) => {
    const item = document.createElement('div');
    item.className = `prayer-row${nextPrayer && nextPrayer.name === p.name ? ' next' : ''}`;
    const icon = PRAYER_ICONS[p.name] || '🕌';
    item.innerHTML = `
      <span class="prayer-icon">${icon}</span>
      <span class="prayer-name">${p.name}</span>
      <span class="prayer-time">${formatPrayerTime(p.raw)}</span>
    `;
    grid.appendChild(item);
  });

  if (nextPrayer) {
    nextName.textContent = nextPrayer.name;
    nextTime.textContent = formatPrayerTime(nextPrayer.raw);
    updatePrayerCountdown();
  } else {
    nextName.textContent = 'Unavailable';
    nextTime.textContent = '--:--';
    const countdownEl = document.getElementById('prayerNextCountdown');
    if (countdownEl) countdownEl.textContent = '--';
  }

  if (note) {
    const meta = document.getElementById('autoWallpaperMeta');
    if (meta) meta.textContent = note;
  }
}

async function refreshPrayerTimes() {
  const coords = await resolveDashboardCoordinates();
  if (!coords) {
    renderPrayerTimes([], null);
    const nextName = document.getElementById('prayerNextName');
    if (nextName) nextName.textContent = 'Set weather location first';
    return;
  }

  const madhab = settings.prayerMadhab === 'hanafi' ? 'hanafi' : 'jafari';
  const method = madhab === 'jafari' ? 0 : 2;
  const school = madhab === 'hanafi' ? 1 : 0;
  const url = `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}&school=${school}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data?.data?.timings) throw new Error('Prayer API failed');

  const t = data.data.timings;
  const prayers = [
    { name: 'Fajr', raw: t.Fajr || '' },
    { name: 'Dhuhr', raw: t.Dhuhr || '' },
    { name: 'Asr', raw: t.Asr || '' },
    { name: 'Maghrib', raw: t.Maghrib || '' },
    { name: 'Isha', raw: t.Isha || '' },
  ];
  const nextPrayer = getNextPrayer(prayers);
  renderPrayerTimes(prayers, nextPrayer);
}

function initPrayerTimesWidget() {
  const select = document.getElementById('prayerMethodSelect');
  if (select) {
    select.value = settings.prayerMadhab || 'jafari';
    if (!select.dataset.bound) {
      select.addEventListener('change', () => {
        settings.prayerMadhab = select.value === 'hanafi' ? 'hanafi' : 'jafari';
        saveSettings();
        void refreshPrayerTimes();
      });
      select.dataset.bound = '1';
    }
  }

  void refreshPrayerTimes();
  if (_intervals.prayers === null) {
    _intervals.prayers = setInterval(() => { void refreshPrayerTimes(); }, 30 * 60 * 1000);
  }
  if (_intervals.prayersCountdown === null) {
    _intervals.prayersCountdown = setInterval(updatePrayerCountdown, 30000);
  }
}

function classifyTab(tab) {
  const title = String(tab.title || '').toLowerCase();
  const url = String(tab.url || '').toLowerCase();
  if (/github|gitlab|jira|notion|slack|figma|docs|drive|mail|outlook|teams|localhost|vercel|netlify/.test(title + ' ' + url)) return 'Work';
  if (/arxiv|wikipedia|medium|substack|stackoverflow|research|paper|tutorial|course|kaggle|huggingface/.test(title + ' ' + url)) return 'Research';
  if (/amazon|daraz|ebay|shop|store|checkout|cart/.test(title + ' ' + url)) return 'Shopping';
  if (/youtube|netflix|spotify|reddit|x.com|twitter|instagram/.test(title + ' ' + url)) return 'Entertainment';
  return 'Other';
}

function computeFocusScore(groups, totalTabs) {
  if (!totalTabs) return 0;
  const work = (groups.Work || []).length;
  const research = (groups.Research || []).length;
  const entertainment = (groups.Entertainment || []).length;
  const shopping = (groups.Shopping || []).length;

  // Score: more work/research = higher; entertainment/shopping penalise
  const productive = work + research;
  const noise = entertainment + shopping;
  let score = Math.round(((productive / totalTabs) * 100) - ((noise / totalTabs) * 30));
  score = Math.min(100, Math.max(0, score));
  return score;
}

function getFocusVerdict(score, groups, totalTabs) {
  if (!totalTabs) return 'No tabs open';
  const topCategory = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)[0];
  const topName = topCategory ? topCategory[0] : 'Other';
  if (score >= 75) return `Deep focus — ${topName} mode`;
  if (score >= 50) return `Moderate focus — ${topName} heavy`;
  if (score >= 25) return `Distracted — ${totalTabs} tabs open`;
  return `High noise — ${totalTabs} tabs, consider cleanup`;
}

function buildTabInsights(groups, tabs) {
  const ordered = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  if (!ordered.length) return 'No tabs open.';
  const [topName, topTabs] = ordered[0];
  const duplicateHosts = {};
  tabs.forEach((tab) => {
    try {
      const host = new URL(tab.url || '').hostname.replace(/^www\./, '');
      if (!host) return;
      duplicateHosts[host] = (duplicateHosts[host] || 0) + 1;
    } catch {
      // ignore invalid URLs
    }
  });
  const noisy = Object.entries(duplicateHosts).filter(([, count]) => count >= 3).sort((a, b) => b[1] - a[1])[0];
  if (noisy) return `Mostly ${topName}. You have ${noisy[1]} ${noisy[0]} tabs open — consider consolidating.`;
  return `Main focus: ${topName} (${topTabs.length} tabs). Other groups may be fragmenting attention.`;
}

const CAT_COLORS = {
  Work: 'cat-work',
  Research: 'cat-research',
  Entertainment: 'cat-entertainment',
  Shopping: 'cat-shopping',
  Other: 'cat-other',
};

function renderCategoryBars(groups, totalTabs) {
  const container = document.getElementById('tabCategoryBars');
  if (!container) return;
  clearElement(container);
  if (!totalTabs) return;

  const sorted = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  sorted.forEach(([name, items]) => {
    const pct = Math.round((items.length / totalTabs) * 100);
    const row = document.createElement('div');
    row.className = 'tab-cat-row';
    row.innerHTML = `
      <span class="tab-cat-label">${name}</span>
      <div class="tab-cat-bar-track">
        <div class="tab-cat-bar-fill ${CAT_COLORS[name] || 'cat-other'}" style="width:0%"></div>
      </div>
      <span class="tab-cat-count">${items.length}</span>
    `;
    container.appendChild(row);
    // Animate bar after paint
    requestAnimationFrame(() => {
      const fill = row.querySelector('.tab-cat-bar-fill');
      if (fill) fill.style.width = `${pct}%`;
    });
  });
}

function buildActionPlan(groups, tabs) {
  const actions = [];
  const total = tabs.length;
  const work = (groups.Work || []).length;
  const shopping = (groups.Shopping || []).length;
  const research = (groups.Research || []).length;
  const entertainment = (groups.Entertainment || []).length;

  if (total >= 18) actions.push({ label: `Close ~${Math.ceil(total * 0.25)} low-priority tabs`, type: 'priority' });
  if (shopping >= 3) actions.push({ label: 'Move shopping to separate window', type: 'suggest' });
  if (research >= 4 && work >= 4) actions.push({ label: 'Split research & work into groups', type: 'suggest' });
  if (entertainment >= 3) actions.push({ label: `${entertainment} entertainment tabs open`, type: 'info' });

  const duplicateTitleMap = {};
  tabs.forEach((t) => {
    const key = String(t.title || '').trim().toLowerCase();
    if (!key) return;
    duplicateTitleMap[key] = (duplicateTitleMap[key] || 0) + 1;
  });
  const duplicateTitles = Object.values(duplicateTitleMap).filter((n) => n >= 2).length;
  if (duplicateTitles) actions.push({ label: `${duplicateTitles} duplicate tab titles`, type: 'priority' });
  if (!actions.length) actions.push({ label: 'Tab load looks healthy ✓', type: 'suggest' });
  return actions.slice(0, 4);
}

function buildClaudePrompt(groups, tabs, insight) {
  const groupLines = Object.entries(groups)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, items]) => `- ${name}: ${items.length} tabs`)
    .join('\n');
  const sample = tabs.slice(0, 15).map((t) => `- ${t.title || '(untitled)'} | ${t.url || ''}`).join('\n');
  return `Act as my proactive tab-analysis colleague.\n\nGroups:\n${groupLines}\n\nInsight:\n${insight}\n\nTop tabs:\n${sample}\n\nDeliver:\n1) Priority-ranked close/keep decisions,\n2) Suggested tab groups by objective,\n3) Immediate next 30-minute execution plan,\n4) Risks if I keep current tab load unchanged.`;
}

function updateFocusRing(score) {
  const fill = document.getElementById('tabScoreFill');
  const number = document.getElementById('tabScoreNumber');
  if (!fill || !number) return;

  const circumference = 2 * Math.PI * 20; // r=20
  const offset = circumference * (1 - score / 100);
  fill.style.strokeDasharray = `${circumference}`;
  fill.style.strokeDashoffset = `${offset}`;

  fill.classList.remove('score-high', 'score-mid', 'score-low');
  if (score >= 65) fill.classList.add('score-high');
  else if (score >= 35) fill.classList.add('score-mid');
  else fill.classList.add('score-low');

  number.textContent = score;
}

async function refreshTabAssistant() {
  const insightEl = document.getElementById('tabAssistantInsight');
  const actionsEl = document.getElementById('tabAssistantActions');
  const promptEl = document.getElementById('tabAssistantPrompt');
  const verdictEl = document.getElementById('tabFocusVerdict');
  if (!insightEl || !promptEl || !actionsEl) return;

  const tabs = await new Promise((resolve) => {
    if (!chrome?.tabs?.query) return resolve([]);
    chrome.tabs.query({ currentWindow: true }, (result) => resolve(Array.isArray(result) ? result : []));
  });

  const groups = {};
  tabs.forEach((tab) => {
    const bucket = classifyTab(tab);
    if (!groups[bucket]) groups[bucket] = [];
    groups[bucket].push(tab);
  });

  const totalTabs = tabs.length;

  // Focus score
  const score = computeFocusScore(groups, totalTabs);
  updateFocusRing(score);
  if (verdictEl) verdictEl.textContent = getFocusVerdict(score, groups, totalTabs);

  // Category bars
  renderCategoryBars(groups, totalTabs);

  // Insight
  const insight = buildTabInsights(groups, tabs);
  insightEl.textContent = insight;

  // Action chips
  const actions = buildActionPlan(groups, tabs);
  clearElement(actionsEl);
  actions.forEach((a) => {
    const chip = document.createElement('span');
    chip.className = `tab-action-chip ${a.type || 'info'}`;
    chip.textContent = a.label;
    actionsEl.appendChild(chip);
  });

  // Claude prompt
  promptEl.value = buildClaudePrompt(groups, tabs, insight);
}

function initTabAssistantWidget() {
  const refreshBtn = document.getElementById('tabAssistantRefreshBtn');
  const copyBtn = document.getElementById('tabAssistantCopyBtn');
  const promptEl = document.getElementById('tabAssistantPrompt');
  const toggleBtn = document.getElementById('tabPromptToggle');
  const promptSection = document.getElementById('tabPromptSection');

  if (refreshBtn && !refreshBtn.dataset.bound) {
    refreshBtn.addEventListener('click', () => { void refreshTabAssistant(); });
    refreshBtn.dataset.bound = '1';
  }

  // Collapsible prompt section
  if (toggleBtn && promptSection && !toggleBtn.dataset.bound) {
    toggleBtn.dataset.bound = '1';
    toggleBtn.addEventListener('click', () => {
      const isOpen = promptSection.classList.toggle('open');
      toggleBtn.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  if (copyBtn && promptEl && !copyBtn.dataset.bound) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(promptEl.value || '');
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = `<svg class="tab-copy-btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg> Copy for Claude`;
        }, 1200);
      } catch {
        copyBtn.textContent = 'Copy failed';
        setTimeout(() => { copyBtn.textContent = 'Copy for Claude'; }, 900);
      }
    });
    copyBtn.dataset.bound = '1';
  }

  void refreshTabAssistant();
  if (_intervals.tabAssistant === null) {
    _intervals.tabAssistant = setInterval(() => { void refreshTabAssistant(); }, 60 * 1000);
  }
}

// ============================================
// Backup & Restore
// ============================================

async function backupSettings() {
  console.log('=== BACKUP DEBUG ===');

  // Collect widget data before building backup object
  const widgetLayouts      = getStoredJson(WIDGET_LAYOUTS_KEY,   {});
  const widgetSizes        = getStoredJson(WIDGET_SIZES_KEY,      {});
  const widgetManagerState = getStoredJson(WIDGET_MANAGER_KEY,    {});
  const fixedWidgetSizes   = getStoredJson(FIXED_WIDGET_SIZES_KEY,{});

  console.log('Widget Layouts being backed up:',      widgetLayouts);
  console.log('Widget Sizes being backed up:',        widgetSizes);
  console.log('Widget Manager State being backed up:',widgetManagerState);
  console.log('Fixed Widget Sizes being backed up:',  fixedWidgetSizes);
  console.log('Settings being backed up:',            { ...settings });

  // Create backup object with settings
  const backupData = {
    settings: { ...settings },
    customDockApps: customDockApps || [],
    backupDate: new Date().toISOString(),
    version: '3.1',
    // Widget layout, size, and visibility state
    widgetLayouts,
    widgetSizes,
    widgetManagerState,
    fixedWidgetSizes,
  };
  
  // Include wallpaper from chrome.storage.local
  try {
    if (hasChromeStorage()) {
      const result = await storageLocalGet(['wallpaper']);
      if (result.wallpaper) {
        backupData.wallpaper = result.wallpaper;
      }
    }
  } catch (e) {
    console.error('Error getting wallpaper for backup:', e);
  }
  
  console.log('Backup object created:', { ...backupData, wallpaper: backupData.wallpaper ? '[present]' : '[none]' });
  console.log('=== BACKUP DEBUG END ===');

  const data = JSON.stringify(backupData, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ios-newtab-backup.json';
  a.click();
  
  URL.revokeObjectURL(url);
  
  alert('Backup created successfully! (Includes widget positions & sizes)');
}

function restoreSettingsFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  // Validate backup file size
  if (file.size > INPUT_LIMITS.maxBackupBytes) {
    const sizeMB = (INPUT_LIMITS.maxBackupBytes / (1024 * 1024)).toFixed(0);
    alert(`Backup file too large (max ${sizeMB}MB). This doesn't look like a valid backup.`);
    e.target.value = '';
    return;
  }
  
  // Validate file extension
  if (!file.name.toLowerCase().endsWith('.json')) {
    alert('Invalid file type. Please select a .json backup file.');
    e.target.value = '';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      let data;
      try {
        data = JSON.parse(ev.target.result);
      } catch (parseErr) {
        alert('Corrupted backup file. The JSON data is invalid.');
        return;
      }

      console.log('=== RESTORE DEBUG ===');
      console.log('Backup file parsed successfully');
      console.log('Backup version:', data.version || 'unknown (legacy)');
      console.log('Backup date:', data.backupDate || 'unknown');

      // Validate it's a plain object (not array, not primitive)
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        alert('Invalid backup format. Expected a JSON object.');
        return;
      }
      
      // Handle both old format (direct settings) and new format (wrapped)
      const settingsData = data.settings || data;
      
      // Restore settings through sanitization
      settings = { ...DEFAULT_SETTINGS, ...sanitizeLoadedSettings(settingsData) };
      saveSettings();
      console.log('Settings restored:', { ...settings });

      // Restore dock apps if present (through sanitization)
      if (data.customDockApps || data.dockApps || settingsData.customDockApps || settingsData.dockApps) {
        customDockApps = sanitizeDockApps(data.customDockApps || data.dockApps || settingsData.customDockApps || settingsData.dockApps);
        saveDockApps();
        console.log('Dock apps restored:', customDockApps.length, 'apps');
      }
      
      // Restore wallpaper if present — sanitize before saving
      if (data.wallpaper && hasChromeStorage()) {
        const safeWallpaper = sanitizeWallpaperValue(data.wallpaper);
        if (safeWallpaper) {
          try {
            await storageLocalSet({ wallpaper: safeWallpaper });
            settings.wallpaper = safeWallpaper;
            console.log('Wallpaper restored successfully');
          } catch (e) {
            console.error('Error restoring wallpaper:', e);
          }
        } else {
          console.warn('Backup wallpaper rejected by sanitizer (unsafe value).');
        }
      } else {
        console.log('No wallpaper in backup or chrome.storage unavailable');
      }

      // Restore widget layouts (positions)
      console.log('Widget Layouts from backup:', data.widgetLayouts);
      if (data.widgetLayouts && typeof data.widgetLayouts === 'object' && !Array.isArray(data.widgetLayouts)) {
        try {
          setStoredJson(WIDGET_LAYOUTS_KEY, data.widgetLayouts);
          console.log('Widget layouts saved to localStorage:', data.widgetLayouts);
        } catch (e) {
          console.error('Error restoring widget layouts:', e);
        }
      } else {
        console.warn('No valid widgetLayouts found in backup');
      }

      // Restore widget sizes
      console.log('Widget Sizes from backup:', data.widgetSizes);
      if (data.widgetSizes && typeof data.widgetSizes === 'object' && !Array.isArray(data.widgetSizes)) {
        try {
          setStoredJson(WIDGET_SIZES_KEY, data.widgetSizes);
          console.log('Widget sizes saved to localStorage');
        } catch (e) {
          console.error('Error restoring widget sizes:', e);
        }
      }

      // Restore widget manager state (visibility, size class)
      console.log('Widget Manager State from backup:', data.widgetManagerState);
      if (data.widgetManagerState && typeof data.widgetManagerState === 'object' && !Array.isArray(data.widgetManagerState)) {
        try {
          setStoredJson(WIDGET_MANAGER_KEY, data.widgetManagerState);
          console.log('Widget manager state saved to localStorage');
        } catch (e) {
          console.error('Error restoring widget manager state:', e);
        }
      }

      // Restore fixed widget sizes (sticky notes, network panel, ai tools)
      console.log('Fixed Widget Sizes from backup:', data.fixedWidgetSizes);
      if (data.fixedWidgetSizes && typeof data.fixedWidgetSizes === 'object' && !Array.isArray(data.fixedWidgetSizes)) {
        try {
          setStoredJson(FIXED_WIDGET_SIZES_KEY, data.fixedWidgetSizes);
          console.log('Fixed widget sizes saved to localStorage');
        } catch (e) {
          console.error('Error restoring fixed widget sizes:', e);
        }
      }

      console.log('=== RESTORE DEBUG END ===');

      // Set restore flag so the reloaded page knows it's coming from a restore
      // (used to log restore-reload context and prioritize restored positions)
      sessionStorage.setItem('widget-restore-reload', 'true');

      alert('Settings restored successfully! Page will reload.');
      location.reload();
    } catch (err) {
      console.error('Restore error:', err);
      alert('Invalid backup file. Please use a valid backup JSON file.');
    }
  };
  reader.readAsText(file);
  
  // Reset file input so same file can be selected again
  e.target.value = '';
}

async function resetAllSettings() {
  if (!confirm('Reset ALL settings including wallpaper? This cannot be undone.')) {
    return;
  }
  
  try {
    // Clear all extension localStorage keys
    ['ios-newtab-settings', 'ios-newtab-todos', 'ios-newtab-sticky-notes',
     'ios-newtab-dock-apps', 'ios-newtab-last-weather', 'ios-newtab-geocode-cache',
     'ios-newtab-has-wallpaper'].forEach(key => localStorage.removeItem(key));
    
    // Clear chrome.storage.local (wallpaper, dockApps, settings)
    if (hasChromeStorage()) {
      await storageLocalSet({ 
        wallpaper: '',
        dockApps: [],
        settings: {}
      });
    }
    
    alert('All settings have been reset! Page will reload.');
    location.reload();
  } catch (e) {
    console.error('Error resetting settings:', e);
    alert('Error resetting settings. Please try again.');
  }
}


async function showFooterTipIfNeeded() {
  try {
    const data = await storageLocalGet(['footerTipShown']);
    if (data.footerTipShown) return;

    const tip = document.getElementById('footerTip');
    if (!tip) return;

    const card = tip.querySelector('.footer-tip-card');

    // If the dock is at the bottom, lift the tip above it to avoid overlap.
    const dockContainer = document.querySelector('.dock-container.position-bottom');
    if (dockContainer) {
      const dockRect = dockContainer.getBoundingClientRect();
      // Distance from viewport bottom to the top of the dock.
      const spaceAboveDock = Math.max(0, window.innerHeight - dockRect.top);
      // Add a small gap so it feels intentional.
      tip.style.bottom = `${spaceAboveDock + 14}px`;
    } else {
      tip.style.bottom = '';
    }

    // Mark as shown immediately to avoid repeats on reload
    await storageLocalSet({ footerTipShown: true });

    tip.style.display = 'block';

    // Start progress animation
    const progressBar = document.getElementById('footerTipProgressBar');
    if (progressBar) {
      progressBar.style.animation = 'none';
      // Force reflow to restart animation
      void progressBar.offsetHeight;
      progressBar.style.animation = 'footerTipProgress 8s linear forwards';
    }

    const btn = document.getElementById('footerTipGotItBtn');
    let dismissed = false;
    let timerId;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      if (timerId) clearTimeout(timerId);

      if (card) {
        card.classList.add('closing');
        setTimeout(() => {
          tip.style.display = 'none';
          if (tip.parentNode) tip.remove();
        }, 300);
      } else {
        tip.style.display = 'none';
        if (tip.parentNode) tip.remove();
      }
    };

    if (btn) {
      btn.addEventListener('click', dismiss, { once: true });
    }

    // Auto-dismiss after 8 seconds
    timerId = setTimeout(dismiss, 8000);
  } catch (e) {
    if (DEBUG) console.log('Footer tip error:', e);
  }
}


// Note: Theme change listener is now tracked and registered in DOMContentLoaded

// ============================================================
// RESIZE HANDLES — FIXED WIDGETS
// ============================================================

const FIXED_WIDGET_SIZES_KEY = 'fgt-fixed-widget-sizes';

function getFixedWidgetSizes() {
  return getStoredJson(FIXED_WIDGET_SIZES_KEY, {});
}

function saveFixedWidgetSize(id, data) {
  const sizes = getFixedWidgetSizes();
  sizes[id] = data;
  setStoredJson(FIXED_WIDGET_SIZES_KEY, sizes);
}

/**
 * Inject resize handles and bind resize logic for a fixed-position element.
 * Enhanced with visual feedback and size indicators.
 *
 * @param {HTMLElement} el       — The fixed element to make resizable
 * @param {string}      id       — Storage key (e.g. 'stickyNotes')
 * @param {object}      opts
 *   @param {string[]}  opts.handles   — Which handles to show: subset of
 *                                       ['nw','n','ne','w','e','sw','s','se']
 *   @param {number}    opts.minW      — Minimum width in px
 *   @param {number}    opts.minH      — Minimum height in px
 *   @param {number}    opts.maxW      — Maximum width in px
 *   @param {number}    opts.maxH      — Maximum height in px
 *   @param {'right'|'left'}  opts.anchorX — Which horizontal edge is anchored
 *   @param {'bottom'|'top'}  opts.anchorY — Which vertical edge is anchored
 */
function bindFixedWidgetResize(el, id, opts = {}) {
  if (!el || el.dataset.fixedResizeBound === '1') return;
  el.dataset.fixedResizeBound = '1';
  el.classList.add('fixed-resizable');

  const {
    handles = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'],
    minW = 180,
    minH = 60,
    maxW = 800,
    maxH = 700,
    anchorX = 'left',   // which horizontal side stays pinned
    anchorY = 'top',    // which vertical side stays pinned
  } = opts;

  // Inject handle elements
  handles.forEach((dir) => {
    if (el.querySelector(`.fh-${dir}`)) return;
    const h = document.createElement('div');
    h.className = `fixed-resize-handle fh-${dir}`;
    h.dataset.dir = dir;
    el.appendChild(h);
  });
  
  // Add size indicator
  if (!el.querySelector('.fixed-size-indicator')) {
    const indicator = document.createElement('div');
    indicator.className = 'fixed-size-indicator';
    indicator.style.cssText = `
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 9px;
      font-weight: 600;
      color: rgba(255,255,255,0.6);
      background: rgba(0,0,0,0.4);
      padding: 2px 4px;
      border-radius: 3px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 15;
    `;
    el.appendChild(indicator);
    el.classList.add('fixed-resizable');
  }

  // Apply saved size
  const saved = getFixedWidgetSizes()[id];
  if (saved) {
    if (saved.w) el.style.width  = `${saved.w}px`;
    if (saved.h) el.style.height = `${saved.h}px`;
  }

  let resizing = false;
  let startX = 0, startY = 0;
  let startW = 0, startH = 0;
  let dir = '';

  el.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('.fixed-resize-handle');
    if (!handle) return;
    e.preventDefault();
    e.stopPropagation();

    dir = handle.dataset.dir;
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = el.offsetWidth;
    startH = el.offsetHeight;

    el.classList.add('is-resizing');
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newW = startW;
    let newH = startH;

    // Horizontal — direction depends on which X-edge is anchored
    if (dir.includes('e')) {
      newW = Math.min(maxW, Math.max(minW, startW + dx));
    } else if (dir.includes('w')) {
      // Expanding left grows width (anchored on right), shrinking left shrinks
      const multiplier = anchorX === 'right' ? 1 : -1;
      newW = Math.min(maxW, Math.max(minW, startW + multiplier * -dx));
    }

    // Vertical — direction depends on which Y-edge is anchored
    if (dir.includes('s')) {
      newH = Math.min(maxH, Math.max(minH, startH + dy));
    } else if (dir.includes('n')) {
      const multiplier = anchorY === 'bottom' ? 1 : -1;
      newH = Math.min(maxH, Math.max(minH, startH + multiplier * -dy));
    }

    el.style.width  = `${Math.round(newW)}px`;
    el.style.height = `${Math.round(newH)}px`;
    
    // Update size indicator
    const indicator = el.querySelector('.fixed-size-indicator');
    if (indicator) {
      indicator.textContent = `${Math.round(newW)}×${Math.round(newH)}`;
      indicator.style.opacity = '1';
    }
  });

  const endResize = (e) => {
    if (!resizing) return;
    resizing = false;
    try { el.releasePointerCapture(e.pointerId); } catch {}
    el.classList.remove('is-resizing');
    saveFixedWidgetSize(id, { w: el.offsetWidth, h: el.offsetHeight });
  };

  el.addEventListener('pointerup',     endResize);
  el.addEventListener('pointercancel', endResize);
  
  // Show size indicator on hover
  el.addEventListener('pointerenter', () => {
    if (!resizing) {
      const indicator = el.querySelector('.fixed-size-indicator');
      if (indicator) {
        indicator.textContent = `${el.offsetWidth}×${el.offsetHeight}`;
        indicator.style.opacity = '0.8';
      }
    }
  });
  
  el.addEventListener('pointerleave', () => {
    if (!resizing) {
      const indicator = el.querySelector('.fixed-size-indicator');
      if (indicator) {
        indicator.style.opacity = '0';
      }
    }
  });
}

// ---- Wire up each fixed widget after DOM is ready ----

function initFixedWidgetResizeHandles() {
  // 1. Sticky Notes panel (anchored bottom-right, grows up & left)
  const stickyNotes = document.querySelector('.sticky-notes');
  if (stickyNotes) {
    bindFixedWidgetResize(stickyNotes, 'stickyNotes', {
      handles: ['nw', 'n', 'ne', 'w'],
      minW: 260, minH: 180, maxW: 640, maxH: 600,
      anchorX: 'right', anchorY: 'bottom',
    });
  }

  // 2. Network Info expandable panel (anchored top-left, grows right & down)
  const networkPanel = document.getElementById('networkInfoPanel');
  if (networkPanel) {
    bindFixedWidgetResize(networkPanel, 'networkInfoPanel', {
      handles: ['se', 's', 'e'],
      minW: 220, minH: 160, maxW: 480, maxH: 400,
      anchorX: 'left', anchorY: 'top',
    });
  }

  // 3. AI Tools widget (anchored bottom-left, grows right & up)
  const aiTools = document.querySelector('.ai-tools');
  if (aiTools) {
    bindFixedWidgetResize(aiTools, 'aiTools', {
      handles: ['ne', 'n', 'e'],
      minW: 120, minH: 40, maxW: 440, maxH: 300,
      anchorX: 'left', anchorY: 'bottom',
    });
  }
}

// Call after a short delay to let the DOM settle
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initFixedWidgetResizeHandles, 600);
});
// ============================================================
// ===  ISLAMIC DASHBOARD MODULE                            ===
// ============================================================

const ISLAMIC_DEFAULTS = {
  muharramMode: false, ziyaratAutoplay: false, ziyaratUrdu: true, ziyaratEnglish: false,
  arabicFont: 'Amiri', arabicFontSize: 'medium', showIslamicDate: true, showTasbeeh: true,
  showQuranWidget: true, showHadithWidget: true, showZiyaratPlayer: true, karbalaBg: 'none',
  hijriOffset: 0,
};
const ISLAMIC_SETTINGS_KEY = 'islamicDashboardSettings';
const TASBEEH_KEY          = 'tasbeehState';
const ZIYARAT_BOOKMARK_KEY = 'ziyaratBookmark';
const ZIYARAT_COLLAPSE_KEY = 'ziyaratCollapsed';

function loadIslamicSettings() {
  try { return Object.assign({}, ISLAMIC_DEFAULTS, JSON.parse(localStorage.getItem(ISLAMIC_SETTINGS_KEY) || '{}')); }
  catch(e) { return Object.assign({}, ISLAMIC_DEFAULTS); }
}
function saveIslamicSettings(s) { try { localStorage.setItem(ISLAMIC_SETTINGS_KEY, JSON.stringify(s)); } catch(e) {} }

const HIJRI_MONTHS_AR = ['مُحَرَّم','صَفَر','رَبِيعُ الْأَوَّل','رَبِيعُ الثَّانِي','جُمَادَى الْأُولَى','جُمَادَى الثَّانِيَة','رَجَب','شَعْبَان','رَمَضَان','شَوَّال','ذُو الْقَعْدَة','ذُو الْحِجَّة'];
const HIJRI_MONTHS_EN = ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Thaniyah','Rajab',"Sha'ban",'Ramadan','Shawwal','Dhul Qadah','Dhul Hijjah'];
const ISLAMIC_OCCASIONS = {
  '1-1':'🌙 Islamic New Year','1-10':'😢 Ashura – Day of Karbala','1-25':'📖 Martyrdom of Imam Zayn al-Abidin (AS)',
  '2-20':"🚶 Arba'een of Imam Husayn (AS)",'3-17':'🌺 Birth of Holy Prophet (PBUH) & Imam Ja\'far al-Sadiq (AS)',
  '6-3':'😢 Martyrdom of Imam Ali ibn Abi Talib (AS)','7-10':'🌺 Birth of Imam Ali ibn Abi Talib (AS)',
  '8-15':'🌟 Birth of Imam Mahdi (AJ)','9-1':'🌙 Start of Ramadan','9-27':'✨ Night of Power – Laylat al-Qadr',
  '10-1':'🎉 Eid al-Fitr','12-10':'🕌 Eid al-Adha','12-18':'✨ Eid al-Ghadir',
};

function gregorianToHijri(date, offset = 0) {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + offset);
  
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat(
    'en-PK-u-ca-islamic-umalqura',
    options
  );

  const formatted = formatter.format(adjustedDate);
  // Format: "1/12/1446 AH" or similar
  const parts = formatted.split(' ')[0].split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  return { day, month, year };
}

function initIslamicDateWidget() {
  const cfg = loadIslamicSettings();
  const widget = document.getElementById('islamicDateWidget');
  if (!widget) return;
  if (!cfg.showIslamicDate) { widget.style.display = 'none'; return; }
  const today = new Date();
  const offset = cfg.hijriOffset || 0;
  const { day, month, year } = gregorianToHijri(today, offset);
  const el = (id) => document.getElementById(id);
  if (el('hijriDay'))   el('hijriDay').textContent   = day;
  if (el('hijriMonth')) el('hijriMonth').textContent = HIJRI_MONTHS_AR[month - 1] || '';
  if (el('hijriYear'))  el('hijriYear').textContent  = year + ' AH';
  if (el('hijriGregorian')) el('hijriGregorian').textContent = today.toLocaleDateString(undefined, { year:'numeric',month:'long',day:'numeric' });
  const key = month + '-' + day;
  const occ = el('hijriOccasion');
  if (occ) { const txt = ISLAMIC_OCCASIONS[key]; if (txt) { occ.textContent = txt; occ.style.display = ''; } else occ.style.display = 'none'; }
}

// ---- Tasbeeh Widget ----
const TASBEEH_PHRASES = { 34:'اَللّٰهُ أَكْبَر', '33-hamd':'اَلْحَمْدُ لِلّٰه', '33-subhan':'سُبْحَانَ اللّٰه', custom:'ذِكْرُ اللّٰه' };

function initTasbeehWidget() {
  const cfg = loadIslamicSettings();
  const widget = document.getElementById('tasbeehWidget');
  if (!widget) return;
  if (!cfg.showTasbeeh) { widget.style.display = 'none'; return; }
  const $  = (id) => document.getElementById(id);
  const countBtn = $('tasbeehCountBtn'), resetBtn = $('tasbeehResetBtn'), modeSelect = $('tasbeehMode');
  let state = { count: 0, sessions: 0, target: 33 };
  try { const s = JSON.parse(localStorage.getItem(TASBEEH_KEY)||'{}'); if(typeof s.count==='number')state.count=s.count; if(typeof s.sessions==='number')state.sessions=s.sessions; if(s.target)state.target=s.target; } catch(e){}

  function save() { try{ localStorage.setItem(TASBEEH_KEY, JSON.stringify(state)); }catch(e){} }
  function getTargetNumber(val) {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 99;
    }
    return 99;
  }

  function updateUI() {
    const t = getTargetNumber(state.target);
    const pct = Math.min(100, Math.round((state.count/t)*100));
    if($('tasbeehCount'))          $('tasbeehCount').textContent = state.count;
    if($('tasbeehProgressFill'))   $('tasbeehProgressFill').style.width = pct+'%';
    if($('tasbeehTargetLabel'))    $('tasbeehTargetLabel').textContent = '/ '+t;
    if($('tasbeehSessionsDone'))   $('tasbeehSessionsDone').textContent = state.sessions;
    const pk = Object.keys(TASBEEH_PHRASES).find(k=>String(k)===String(state.target))||'custom';
    if($('tasbeehPhrase'))         $('tasbeehPhrase').textContent = TASBEEH_PHRASES[pk]||TASBEEH_PHRASES.custom;
    if(modeSelect){ const ov=String(state.target); modeSelect.value=Array.from(modeSelect.options).some(o=>o.value===ov)?ov:'custom'; }
  }

  if(countBtn) countBtn.addEventListener('click', () => {
    const t = getTargetNumber(state.target);
    state.count++;
    if(state.count>=t){ state.sessions++; state.count=0; countBtn.classList.add('complete-flash'); setTimeout(()=>countBtn.classList.remove('complete-flash'),500); }
    else { countBtn.classList.add('bumping'); setTimeout(()=>countBtn.classList.remove('bumping'),220); }
    updateUI(); save();
  });
  if(resetBtn) resetBtn.addEventListener('click',()=>{ state.count=0; updateUI(); save(); });
  if(modeSelect) modeSelect.addEventListener('change',()=>{ 
    const val = modeSelect.value;
    state.target = val === 'custom' ? 99 : val;
    state.count = 0; 
    updateUI(); 
    save(); 
  });
  updateUI();
}

// ---- Quran Verse Widget ----
let _quranVerses=null, _quranIndex=0, _hadiths=null, _hadithIndex=0;

async function loadQuranVerses() {
  if (_quranVerses) return _quranVerses;
  try {
    const base = (typeof chrome!=='undefined'&&chrome.runtime&&chrome.runtime.getURL) ? chrome.runtime.getURL('assets/data/quran_verses.json') : 'assets/data/quran_verses.json';
    const d = await (await fetch(base)).json(); _quranVerses = d.verses||[];
  } catch(e) { _quranVerses = [{arabic:'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',english:'In the name of Allah, the Most Gracious, the Most Merciful',reference:'Al-Fatiha 1:1'}]; }
  return _quranVerses;
}

function showQuranVerse(verses, index) {
  const v = verses[index % verses.length];
  const el = (id) => document.getElementById(id);
  if(el('quranArabicVerse'))  el('quranArabicVerse').textContent  = v.arabic||'';
  if(el('quranEnglishVerse')) el('quranEnglishVerse').textContent = v.english||'';
  if(el('quranReference'))    el('quranReference').textContent    = v.reference||'';
}

async function initQuranVerseWidget() {
  const cfg = loadIslamicSettings();
  const widget = document.getElementById('quranVerseWidget');
  if (!widget) return;
  if (!cfg.showQuranWidget) { widget.style.display='none'; return; }
  const verses = await loadQuranVerses();
  const now = new Date();
  _quranIndex = Math.floor((now - new Date(now.getFullYear(),0,0))/86400000) % verses.length;
  showQuranVerse(verses, _quranIndex);
  const btn = document.getElementById('quranRefreshBtn');
  if (btn) btn.addEventListener('click', () => { _quranIndex=(_quranIndex+1)%verses.length; showQuranVerse(verses,_quranIndex); btn.style.transform='rotate(360deg)'; setTimeout(()=>{btn.style.transform='';},400); });
}

// ---- Hadith Widget ----
async function loadHadiths() {
  if (_hadiths) return _hadiths;
  try {
    const base = (typeof chrome!=='undefined'&&chrome.runtime&&chrome.runtime.getURL) ? chrome.runtime.getURL('assets/data/hadiths_ahlulbayt.json') : 'assets/data/hadiths_ahlulbayt.json';
    const d = await (await fetch(base)).json(); _hadiths = d.hadiths||[];
  } catch(e) { _hadiths = [{arabic:'اَلصَّبْرُ مِفْتَاحُ الْفَرَجِ',english:'Patience is the key to relief',source:'Imam Ali ibn Abi Talib (AS)'}]; }
  return _hadiths;
}

function showHadith(hadiths, index) {
  const h = hadiths[index % hadiths.length];
  const el = (id) => document.getElementById(id);
  if(el('hadithArabicText'))  el('hadithArabicText').textContent  = h.arabic||'';
  if(el('hadithEnglishText')) el('hadithEnglishText').textContent = h.english||'';
  if(el('hadithSource'))      el('hadithSource').textContent      = h.source||'';
}

async function initHadithWidget() {
  const cfg = loadIslamicSettings();
  const widget = document.getElementById('hadithWidget');
  if (!widget) return;
  if (!cfg.showHadithWidget) { widget.style.display='none'; return; }
  const hadiths = await loadHadiths();
  const now = new Date();
  _hadithIndex = Math.floor((now - new Date(now.getFullYear(),0,0))/86400000) % hadiths.length;
  showHadith(hadiths, _hadithIndex);
  const btn = document.getElementById('hadithRefreshBtn');
  if (btn) btn.addEventListener('click', () => { _hadithIndex=(_hadithIndex+1)%hadiths.length; showHadith(hadiths,_hadithIndex); btn.style.transform='rotate(360deg)'; setTimeout(()=>{btn.style.transform='';},400); });
}

// ---- Ziyarat Player ----
const ZiyaratPlayer = (() => {
  let _data=null, _audio=null, _rafId=null, _isDragging=false, _lastParaIdx=-1;
  let D = {};

  function cache() {
    const $ = (id) => document.getElementById(id);
    D = { widget:$('ziyaratPlayerWidget'), audio:$('ziyaratAudio'), playBtn:$('ziyaratPlayBtn'), stopBtn:$('ziyaratStopBtn'),
      prevBtn:$('ziyaratPrevBtn'), nextBtn:$('ziyaratNextBtn'), speedSelect:$('ziyaratSpeed'), volumeRange:$('ziyaratVolume'),
      progressBar:$('ziyaratProgressBar'), progressFill:$('ziyaratProgressFill'), progressThumb:$('ziyaratProgressThumb'),
      currentTime:$('ziyaratCurrentTime'), durationEl:$('ziyaratDuration'), textArea:$('ziyaratTextArea'),
      loadingEl:$('ziyaratTextLoading'), collapseBtn:$('ziyaratCollapseBtn'), bookmarkBtn:$('ziyaratBookmarkBtn'),
      resumeBanner:$('ziyaratResumeBanner'), resumeBtn:$('ziyaratResumeBtn'), resumeText:$('ziyaratResumeText'),
      resumeDismiss:$('ziyaratResumeDismiss'), urduBtn:$('toggleUrduBtn'), englishBtn:$('toggleEnglishBtn') };
  }

  function fmt(s) { if(!isFinite(s)||s<0)return'0:00'; const m=Math.floor(s/60),sec=Math.floor(s%60); return m+':'+String(sec).padStart(2,'0'); }

  function findPara(time) {
    if (!_data||!_data.paragraphs||!_data.paragraphs.length) return -1;
    const p=_data.paragraphs; let lo=0,hi=p.length-1;
    while(lo<=hi){const mid=(lo+hi)>>1; if(p[mid].endTime<=time)lo=mid+1; else if(p[mid].startTime>time)hi=mid-1; else return mid;}
    return Math.min(lo,p.length-1);
  }

  function renderText() {
    if (!D.textArea||!_data) return;
    const frag = document.createDocumentFragment();
    _data.paragraphs.forEach((p,i) => {
      const div=document.createElement('div'); div.className='ziyarat-paragraph'; div.dataset.index=i;
      const num=document.createElement('span'); num.className='para-number'; num.textContent=p.id+'.'; div.appendChild(num);
      const ar=document.createElement('div'); ar.className='para-arabic'; ar.textContent=p.arabic||''; div.appendChild(ar);
      if(p.urdu){const u=document.createElement('div'); u.className='para-urdu'; u.textContent=p.urdu; div.appendChild(u);}
      if(p.english){const e=document.createElement('div'); e.className='para-english'; e.textContent=p.english; div.appendChild(e);}
      frag.appendChild(div);
    });
    D.textArea.innerHTML=''; D.textArea.appendChild(frag);
    if(D.loadingEl) D.loadingEl.style.display='none';
  }

  function syncLoop() {
    if (!_audio||_audio.paused){_rafId=null;return;}
    const t=_audio.currentTime;
    if (!_isDragging&&_audio.duration&&isFinite(_audio.duration)){
      const pct=(t/_audio.duration)*100;
      if(D.progressFill)  D.progressFill.style.width=pct+'%';
      if(D.progressThumb) D.progressThumb.style.left=pct+'%';
      if(D.progressBar)   D.progressBar.setAttribute('aria-valuenow',Math.round(pct));
    }
    if(D.currentTime) D.currentTime.textContent=fmt(t);
    const idx=findPara(t);
    if(idx!==_lastParaIdx&&D.textArea){
      const prev=D.textArea.querySelector('.para-active'); if(prev)prev.classList.remove('para-active');
      const paras=D.textArea.querySelectorAll('.ziyarat-paragraph');
      if(paras[idx]){paras[idx].classList.add('para-active'); paras[idx].scrollIntoView({behavior:'smooth',block:'nearest'});}
      _lastParaIdx=idx;
    }
    _rafId=requestAnimationFrame(syncLoop);
  }

  function startSync(){if(!_rafId)_rafId=requestAnimationFrame(syncLoop);}
  function stopSync(){if(_rafId){cancelAnimationFrame(_rafId);_rafId=null;}}

  function setPlayUI(playing){
    if(!D.playBtn)return;
    const pi=D.playBtn.querySelector('.play-icon'), ps=D.playBtn.querySelector('.pause-icon');
    if(pi)pi.style.display=playing?'none':''; if(ps)ps.style.display=playing?'':'none';
    D.playBtn.setAttribute('aria-label',playing?'Pause Ziyarat':'Play Ziyarat');
  }

  function saveBookmark(){if(!_audio)return; const t=Math.floor(_audio.currentTime); try{localStorage.setItem(ZIYARAT_BOOKMARK_KEY,String(t));}catch(e){} if(D.bookmarkBtn){D.bookmarkBtn.classList.add('bookmarked');setTimeout(()=>D.bookmarkBtn.classList.remove('bookmarked'),2000);}}
  function loadBookmark(){try{return parseInt(localStorage.getItem(ZIYARAT_BOOKMARK_KEY)||'0',10)||0;}catch(e){return 0;}}
  function clearBookmark(){try{localStorage.removeItem(ZIYARAT_BOOKMARK_KEY);}catch(e){}}

  function showResume(){const t=loadBookmark(); if(!t||!D.resumeBanner)return; if(D.resumeText)D.resumeText.textContent='Resume from '+fmt(t); D.resumeBanner.style.display='';}
  function hideResume(){if(D.resumeBanner)D.resumeBanner.style.display='none';}

  function seekToPara(idx){if(!_data||!_audio)return; const p=_data.paragraphs[idx]; if(p){_audio.currentTime=p.startTime;_lastParaIdx=-1;}}

  function setCollapsed(c){if(!D.widget)return; D.widget.classList.toggle('collapsed',c); if(D.collapseBtn)D.collapseBtn.setAttribute('aria-expanded',!c); try{localStorage.setItem(ZIYARAT_COLLAPSE_KEY,c?'1':'0');}catch(e){}}

  function applyTranslation(u,en){
    document.body.classList.toggle('ziyarat-hide-urdu',!u); document.body.classList.toggle('ziyarat-hide-english',!en);
    if(D.urduBtn){D.urduBtn.classList.toggle('active',u);D.urduBtn.setAttribute('aria-pressed',u);}
    if(D.englishBtn){D.englishBtn.classList.toggle('active',en);D.englishBtn.setAttribute('aria-pressed',en);}
  }

  async function init(){
    cache();
    const cfg=loadIslamicSettings();
    if(!D.widget)return;
    if(!cfg.showZiyaratPlayer){D.widget.style.display='none';return;}
    setCollapsed(localStorage.getItem(ZIYARAT_COLLAPSE_KEY)==='1');
    applyTranslation(cfg.ziyaratUrdu, cfg.ziyaratEnglish);
    try {
      const url=(typeof chrome!=='undefined'&&chrome.runtime&&chrome.runtime.getURL)?chrome.runtime.getURL('assets/data/ziyarat_ashura.json'):'assets/data/ziyarat_ashura.json';
      _data=await (await fetch(url)).json(); renderText();
    } catch(e){ if(D.loadingEl)D.loadingEl.innerHTML='<span style="color:var(--text-secondary)">Could not load Ziyarat text.</span>'; return; }
    _audio=D.audio;
    if(_audio){
      const src=(typeof chrome!=='undefined'&&chrome.runtime&&chrome.runtime.getURL)?chrome.runtime.getURL('assets/audio/ziyarat_ashura.mp3'):'assets/audio/ziyarat_ashura.mp3';
      fetch(src,{method:'HEAD'}).then(r=>{if(r.ok){_audio.src=src;if(D.widget)D.widget.classList.add('has-audio');}}).catch(()=>{});
      _audio.addEventListener('loadedmetadata',()=>{if(D.durationEl)D.durationEl.textContent=fmt(_audio.duration);});
      _audio.addEventListener('play',()=>{setPlayUI(true);startSync();});
      _audio.addEventListener('pause',()=>{setPlayUI(false);stopSync();});
      _audio.addEventListener('ended',()=>{setPlayUI(false);stopSync();clearBookmark();hideResume();if(D.currentTime)D.currentTime.textContent='0:00';_lastParaIdx=-1;});
      _audio.addEventListener('timeupdate',()=>{if(D.currentTime)D.currentTime.textContent=fmt(_audio.currentTime);});
    }
    if(D.playBtn) D.playBtn.addEventListener('click',()=>{if(!_audio||!_audio.src)return; _audio.paused?_audio.play().catch(()=>{}):((_audio.pause(),saveBookmark()));});
    if(D.stopBtn) D.stopBtn.addEventListener('click',()=>{if(!_audio)return;_audio.pause();_audio.currentTime=0;setPlayUI(false);stopSync();if(D.progressFill)D.progressFill.style.width='0%';if(D.progressThumb)D.progressThumb.style.left='0%';if(D.currentTime)D.currentTime.textContent='0:00';_lastParaIdx=-1;const prev=D.textArea&&D.textArea.querySelector('.para-active');if(prev)prev.classList.remove('para-active');});
    if(D.prevBtn) D.prevBtn.addEventListener('click',()=>{if(!_audio||!_data)return;seekToPara(Math.max(0,findPara(_audio.currentTime)-1));});
    if(D.nextBtn) D.nextBtn.addEventListener('click',()=>{if(!_audio||!_data)return;seekToPara(Math.min(_data.paragraphs.length-1,findPara(_audio.currentTime)+1));});
    if(D.speedSelect) D.speedSelect.addEventListener('change',()=>{if(_audio)_audio.playbackRate=parseFloat(D.speedSelect.value)||1;});
    if(D.volumeRange) D.volumeRange.addEventListener('input',()=>{if(_audio)_audio.volume=parseFloat(D.volumeRange.value);});
    if(D.progressBar){
      const seekTo=(e)=>{if(!_audio||!_audio.duration)return;const rect=D.progressBar.getBoundingClientRect();const pct=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));_audio.currentTime=pct*_audio.duration;_lastParaIdx=-1;};
      D.progressBar.addEventListener('mousedown',(e)=>{_isDragging=true;seekTo(e);});
      document.addEventListener('mousemove',(e)=>{if(_isDragging)seekTo(e);});
      document.addEventListener('mouseup',()=>{_isDragging=false;});
      D.progressBar.addEventListener('keydown',(e)=>{if(!_audio||!_audio.duration)return;if(e.key==='ArrowRight'){e.preventDefault();_audio.currentTime=Math.min(_audio.duration,_audio.currentTime+5);}if(e.key==='ArrowLeft'){e.preventDefault();_audio.currentTime=Math.max(0,_audio.currentTime-5);}});
    }
    if(D.bookmarkBtn) D.bookmarkBtn.addEventListener('click',saveBookmark);
    showResume();
    if(D.resumeBtn) D.resumeBtn.addEventListener('click',()=>{const t=loadBookmark();if(_audio&&t){_audio.currentTime=t;_audio.play().catch(()=>{});}hideResume();});
    if(D.resumeDismiss) D.resumeDismiss.addEventListener('click',()=>{clearBookmark();hideResume();});
    if(D.collapseBtn) D.collapseBtn.addEventListener('click',()=>setCollapsed(!D.widget.classList.contains('collapsed')));
    if(D.urduBtn) D.urduBtn.addEventListener('click',()=>{const a=D.urduBtn.classList.toggle('active');D.urduBtn.setAttribute('aria-pressed',a);document.body.classList.toggle('ziyarat-hide-urdu',!a);});
    if(D.englishBtn) D.englishBtn.addEventListener('click',()=>{const a=D.englishBtn.classList.toggle('active');D.englishBtn.setAttribute('aria-pressed',a);document.body.classList.toggle('ziyarat-hide-english',!a);});
    document.addEventListener('keydown',(e)=>{
      const tag=document.activeElement?.tagName?.toLowerCase();
      if(tag==='input'||tag==='textarea'||tag==='select')return;
      if(e.code==='Space'&&!e.ctrlKey&&!e.metaKey){if(!_audio||!_audio.src)return;e.preventDefault();_audio.paused?_audio.play().catch(()=>{}):((_audio.pause(),saveBookmark()));}
      if(e.ctrlKey&&e.key==='b'){e.preventDefault();saveBookmark();}
      if(e.ctrlKey&&e.key==='r'){e.preventDefault();const t=loadBookmark();if(_audio&&t){_audio.currentTime=t;_audio.play().catch(()=>{});}}
      if(e.key==='ArrowRight'&&!e.ctrlKey&&document.activeElement!==D.progressBar){if(!_audio||!_audio.src||!_data)return;e.preventDefault();seekToPara(Math.min(_data.paragraphs.length-1,findPara(_audio.currentTime)+1));}
      if(e.key==='ArrowLeft'&&!e.ctrlKey&&document.activeElement!==D.progressBar){if(!_audio||!_audio.src||!_data)return;e.preventDefault();seekToPara(Math.max(0,findPara(_audio.currentTime)-1));}
    });
    if(cfg.ziyaratAutoplay&&_audio&&_audio.src)_audio.play().catch(()=>{});
  }
  return { init };
})();

// ---- Apply Islamic Settings ----
function applyMuharramMode(enabled) { document.body.classList.toggle('muharram-mode', !!enabled); }
function applyArabicFont(f) { document.documentElement.style.setProperty('--arabic-font', `'${f}', 'Amiri', Georgia, serif`); }
function applyArabicFontSize(s) {
  document.body.classList.remove('arabic-size-small','arabic-size-medium','arabic-size-large','arabic-size-xlarge');
  document.body.classList.add({small:'arabic-size-small',medium:'arabic-size-medium',large:'arabic-size-large',xlarge:'arabic-size-xlarge'}[s]||'arabic-size-medium');
}
function applyKarbalaBg(bgKey) {
  const wp = document.getElementById('wallpaper'); if (!wp) return;
  if (!bgKey||bgKey==='none'){wp.classList.remove('karbala-bg');wp.style.backgroundImage='';return;}
  const url=(typeof chrome!=='undefined'&&chrome.runtime&&chrome.runtime.getURL)?chrome.runtime.getURL(`assets/backgrounds/${bgKey}.jpg`):`assets/backgrounds/${bgKey}.jpg`;
  wp.style.cssText+=`;background-image:url('${url}');background-size:cover;background-position:center;`;
  wp.classList.add('karbala-bg');
}
function applyIslamicSettings(cfg) {
  applyMuharramMode(cfg.muharramMode);
  applyArabicFont(cfg.arabicFont||'Amiri');
  applyArabicFontSize(cfg.arabicFontSize||'medium');
  applyKarbalaBg(cfg.karbalaBg||'none');
  const vis = { islamicDateWidget:cfg.showIslamicDate, tasbeehWidget:cfg.showTasbeeh, quranVerseWidget:cfg.showQuranWidget, hadithWidget:cfg.showHadithWidget, ziyaratPlayerWidget:cfg.showZiyaratPlayer };
  Object.entries(vis).forEach(([id,show])=>{ const el=document.getElementById(id); if(el)el.style.display=(show===false)?'none':''; });
  document.body.classList.toggle('ziyarat-hide-urdu',   !cfg.ziyaratUrdu);
  document.body.classList.toggle('ziyarat-hide-english',!cfg.ziyaratEnglish);
}

// ---- Islamic Settings Panel ----
function initIslamicSettingsPanel() {
  const cfg = loadIslamicSettings();
  function wireCheck(id, key) { const el=document.getElementById(id); if(!el)return; el.checked=!!cfg[key]; el.addEventListener('change',()=>{cfg[key]=el.checked;saveIslamicSettings(cfg);applyIslamicSettings(cfg);}); }
  function wireSel(id, key)   { const el=document.getElementById(id); if(!el)return; el.value=cfg[key]||'';  el.addEventListener('change',()=>{cfg[key]=el.value;saveIslamicSettings(cfg);applyIslamicSettings(cfg);}); }
  wireCheck('toggleMuharramMode','muharramMode');
  wireCheck('toggleZiyaratAutoplay','ziyaratAutoplay');
  wireCheck('toggleZiyaratUrdu','ziyaratUrdu');
  wireCheck('toggleZiyaratEnglish','ziyaratEnglish');
  wireCheck('toggleIslamicDate','showIslamicDate');
  
  // Hijri offset controls
  const offsetInput = document.getElementById('hijriOffsetValue');
  const offsetMinus = document.getElementById('hijriOffsetMinus');
  const offsetPlus = document.getElementById('hijriOffsetPlus');
  if (offsetInput) {
    offsetInput.value = cfg.hijriOffset || 0;
    offsetInput.addEventListener('change', () => {
      let val = parseInt(offsetInput.value) || 0;
      if (val < -3) val = -3;
      if (val > 3) val = 3;
      offsetInput.value = val;
      cfg.hijriOffset = val;
      saveIslamicSettings(cfg);
      initIslamicDateWidget();
    });
  }
  if (offsetMinus) {
    offsetMinus.addEventListener('click', () => {
      let val = (parseInt(offsetInput.value) || 0) - 1;
      if (val < -3) val = -3;
      offsetInput.value = val;
      cfg.hijriOffset = val;
      saveIslamicSettings(cfg);
      initIslamicDateWidget();
    });
  }
  if (offsetPlus) {
    offsetPlus.addEventListener('click', () => {
      let val = (parseInt(offsetInput.value) || 0) + 1;
      if (val > 3) val = 3;
      offsetInput.value = val;
      cfg.hijriOffset = val;
      saveIslamicSettings(cfg);
      initIslamicDateWidget();
    });
  }
  
  wireCheck('toggleTasbeeh','showTasbeeh');
  wireCheck('toggleQuranWidget','showQuranWidget');
  wireCheck('toggleHadithWidget','showHadithWidget');
  wireCheck('toggleZiyaratPlayer','showZiyaratPlayer');
  wireSel('arabicFontSelect','arabicFont');
  wireSel('arabicFontSize','arabicFontSize');
  const kbs = document.getElementById('karbalaBgSelector');
  if (kbs) {
    const chips = kbs.querySelectorAll('.karbala-bg-chip');
    chips.forEach(chip=>{ if(chip.dataset.bg===cfg.karbalaBg)chip.classList.add('active'); chip.addEventListener('click',()=>{ chips.forEach(c=>c.classList.remove('active')); chip.classList.add('active'); cfg.karbalaBg=chip.dataset.bg; saveIslamicSettings(cfg); applyKarbalaBg(cfg.karbalaBg); }); });
  }
}

// ---- Master Init ----
function initIslamicDashboard() {
  const cfg = loadIslamicSettings();
  applyIslamicSettings(cfg);
  initIslamicDateWidget();
  initTasbeehWidget();
  initIslamicSettingsPanel();
  void initQuranVerseWidget();
  void initHadithWidget();
  void ZiyaratPlayer.init();
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(initIslamicDashboard, 250); });