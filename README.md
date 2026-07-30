<<<<<<< HEAD
# Safinat al-Najat Tab – Smart Dashboard

A privacy-first Chrome extension that replaces your new tab page with a glass-morphism dashboard combining everyday productivity widgets with an integrated Islamic (Shia) devotional toolkit — prayer times, Hadith/Ahlul Bayt quotes, Quran verses, a Tasbeeh counter, and Ziyarat audio.

## ✨ Features

### Dashboard & Productivity
- **Glass Morphism UI** — iOS 17+/macOS-inspired design with light and dark themes (manual or auto/system)
- **Custom Greeting** — Editable name with time-of-day greeting (Good Morning/Afternoon/Evening)
- **Live Clock & Islamic Date** — 12/24-hour clock alongside the current Hijri date
- **Spotlight-Style Search** — Search via Chrome's native search API, with selectable search-engine shortcuts (Google, DuckDuckGo, Bing, Brave, YouTube, etc.)
- **App Dock & Shortcuts** — Quick-launch dock with custom icons for frequently visited sites/apps
- **Sticky Notes Widget** — Quick on-page notes saved locally
- **System Monitor Widget** — At-a-glance network/connection info
- **Session Tracker Widget** — Tracks time spent in the current browsing session
- **Accent Colors** — Choose from a curated palette to tint the whole UI
- **Backup & Restore** — Export/import all settings as a JSON file; one-click reset

### Islamic Dashboard
- **Prayer Times (Namaz)** — Location-based prayer time calculation
- **Hadith / Ahlul Bayt (a.s.) Quotes** — Rotating quotes widget
- **Quran Verse Widget** — Rotating verse display
- **Tasbeeh Counter** — Digital counter for تَسْبِيحُ فَاطِمَةَ (Tasbih of Fatimah)
- **Ziyarat Player** — Built-in audio player for Ziyarat Ashura and recitations
- **Scrolling Salutations Rail** — Continuous marquee of salutations (ṣalawāt) at the top of the page

### Weather (Optional)
- **Real-Time Weather** — Powered by Open-Meteo/WeatherAPI
- **GPS or Manual Location** — Enable browser geolocation for automatic local weather, or set a location manually
- **Celsius/Fahrenheit** — Switchable temperature units
- **Privacy-Preserving Caching** — Location is rounded/cached locally to minimize precision sent to weather services

## 🔒 Privacy & Security

This extension is **privacy-first** by design:

✅ **What's Stored Locally (`chrome.storage.local`):**
- Preferences (theme, accent color, units, greeting name)
- Widget layout and visibility
- Shortcuts, dock apps, and search-engine preferences
- Sticky notes and Tasbeeh counter state
- Wallpaper and cached weather location

❌ **What We Don't Collect:**
- No personal browsing history tracking
- No analytics or usage data
- No advertising or profiling
- No backend servers — everything runs locally in your browser

**Optional Permissions:**
- **Geolocation** — Only used when you explicitly enable GPS-based weather; not shared with the developer
- **Storage API** — Stores your preferences locally on your device
- **Third-Party Requests** — Weather, favicon, and geocoding services (see table below) are contacted directly from your browser, with only the minimum data each feature needs (e.g., rounded coordinates for weather)

## ⚙️ Configuration

Available in the Settings panel:
- **Greeting** — Set your display name
- **Search** — Default search engine/shortcut
- **Apps & Dock** — Manage quick-launch shortcuts and their icons
- **Widget Manager** — Toggle and reorder dashboard widgets (Prayer Times, Hadith, Quran Verse, Tasbeeh, Ziyarat, Notes, System Monitor, Session Tracker, Islamic Date)
- **Clock & Time** — 12/24-hour format
- **Islamic Dashboard** — Configure prayer-time location and related widgets
- **Weather** — Units, manual location, or GPS-based auto-detection
- **Appearance** — Theme (Dark/Light/Auto) and accent color
- **Wallpaper** — Upload, randomize, or clear
- **Data** — Backup, restore, or reset all settings

## 🛠️ Development

### Project Structure
```
├── manifest.json           # Chrome extension manifest
├── newtab.html              # New tab page markup (dashboard, widgets, settings panel)
├── newtab.css                # Glass morphism styling, themes, layout
├── newtab.js                  # Dashboard logic, widgets, storage, search, weather
├── early-theme.js           # Applies saved theme before first paint (avoids flash)
├── popup.html/js            # Extension toolbar popup
├── privacy.html/css         # Privacy policy page
├── settings/                 # Liquid glass settings panel (if separated from newtab)
├── assets/
│   ├── audio/                 # Ziyarat/recitation audio files
│   ├── backgrounds/         # Bundled wallpapers
│   ├── data/                  # JSON data (Quran verses, Hadiths, Ziyarat text)
│   └── icons/                 # Extension icons
```

### Technologies Used
- **HTML5** — Semantic markup
- **CSS3** — Glass morphism, CSS Grid, Flexbox, CSS Variables
- **JavaScript (ES6+)** — Chrome Storage API, Chrome Search API, Geolocation API
- **Chrome APIs** — `storage`, `search`, `tabs`, `scripting`

### Local Development
1. Make changes to the source files
2. Go to `chrome://extensions/` and click the refresh icon on the unpacked extension
3. Open a new tab to test

### Building for Release
```bash
# Create optimized zip archive
Compress-Archive -Path * -DestinationPath "Fusion-Glass-Tab-Smart-Dashboard-3.0.1.zip"
```

## 📦 Optional Third-Party Services

| Service | Purpose | Data Sent | Optional |
|---------|---------|-----------|----------|
| **Open-Meteo** | Weather data | Rounded coordinates | ✅ Yes |
| **WeatherAPI** | Weather data | Rounded coordinates | ✅ Yes |
| **BigDataCloud** | Reverse geolocation | IP address | ✅ Yes |
| **Nominatim** | Reverse geocoding | Coordinates | ✅ Yes |
| **Google Favicon Service / DuckDuckGo** | Favicon fetching for dock/shortcuts | Domain name | ✅ Yes |

All services are contacted directly from your browser — there is no relay through developer-owned servers.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Make your changes with clear commit messages
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 👨‍💻 Author

**Hunain Zaidi**
📧 Email: syedhunainalizaidi@gmail.com

## 📋 Changelog

### Version 3.0.1
- 🧩 Widget Manager with drag-and-drop rearrangement and per-widget visibility
- 🕌 Expanded Islamic Dashboard (Prayer Times, Hadith, Quran Verse, Tasbeeh, Ziyarat Player, Islamic Date)
- 📝 Sticky Notes and Session Tracker widgets
- 💾 Backup/Restore settings as JSON

### Version 3.0.0
- 🚀 Major release and version alignment across extension pages
- 🧾 Updated docs and build artifact naming for 3.0.0 packaging

### Version 2.5.0
- ✨ Enhanced glass morphism design
- 🔒 Privacy policy with semantic icons
- 🎨 Improved theme switching
- 📍 Optional GPS-based weather with rounded location caching
- 🛡️ Security hardening for permissions
- 📱 Better responsive design

## 🙏 Acknowledgments

- Glass morphism design inspiration from Apple's iOS 17+ and macOS aesthetic
- Weather data from Open-Meteo and WeatherAPI

## ⚠️ Disclaimer

This extension is not affiliated with Google Chrome or Google Inc. Chrome is a trademark of Google LLC.

---

**Ready to transform your new tab experience?** Install now and enjoy a beautiful, private dashboard rooted in daily remembrance. 🎉
=======
# Safinat-al-Najat-Tab
A privacy-first Chrome extension that replaces your new tab page with a glass-morphism dashboard combining everyday productivity widgets with an integrated Islamic (Shia) devotional toolkit — prayer times, Hadith/Ahlul Bayt quotes, Quran verses, a Tasbeeh counter, and Ziyarat audio.
>>>>>>> c6b1dc678ab27086e3673a3a4d850cb5bf5be234
