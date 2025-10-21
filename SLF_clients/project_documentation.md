# SLF Clients - Legal Case Management App Documentation

## 📋 Project Overview

A bilingual (English/Spanish) mobile and web application built with React Native and Expo Router that guides legal clients through 15 phases of their case. The app features video education content, progress tracking, and personalized user experiences.

---

## 🏗️ Project Structure

```
SLF_clients/
├── app/
│   ├── _layout.tsx              # Root layout with navigation setup
│   ├── index.tsx                # Dashboard/redirect screen
│   ├── Phases/
│   │   ├── phase1.tsx          # Phase 1: Investigation
│   │   ├── phase2.tsx          # Phase 2: Property Damage
│   │   ├── phase3.tsx          # Phase 3: Treatment
│   │   └── ... (phase4-15)     # Additional phases
│   ├── (tabs)/                 # Tab navigation (hidden from drawer)
│   └── modal.tsx               # Modal screen (hidden from drawer)
├── components/
│   ├── CustomHeader.tsx        # Custom header with language toggle
│   ├── PhaseProgressBar.tsx    # Progress dots in header
│   ├── VideoSection.tsx        # Video player and content container
│   ├── PhaseProgressFooter.tsx # Fixed footer showing phase progress
│   └── PhaseScreenWrapper.tsx  # Wrapper that adds footer to phases
├── constants/
│   └── phases.ts               # Phase configuration and screen definitions
└── contexts/
    ├── LanguageContext.tsx     # Language switching (EN/ES)
    └── UserContext.tsx         # User data and current phase
```

---

## 📁 Detailed File Documentation

### **1. app/_layout.tsx**
**Purpose:** Root layout that sets up the drawer navigation and wraps the app with context providers.

**Key Features:**
- Configures drawer navigation with custom header
- Wraps app with `UserProvider` and `LanguageProvider`
- Maps all 15 phases dynamically from `phases.ts`
- Translates drawer labels based on selected language
- Hides (tabs) and modal routes from drawer menu

**Important Code:**
```typescript
<UserProvider>
  <LanguageProvider>
    <DrawerLayout />
  </LanguageProvider>
</UserProvider>
```

**Dependencies:**
- `expo-router/drawer`
- `react-native-gesture-handler`
- `@expo/vector-icons`

---

### **2. app/index.tsx**
**Purpose:** Dashboard screen that redirects users to their current phase.

**Key Features:**
- Reads user's current phase from `UserContext`
- Automatically redirects to appropriate phase on load
- Shows loading indicator with user welcome message
- Uses 500ms delay to ensure contexts are loaded

**Flow:**
1. Component mounts
2. Checks user data from `UserContext`
3. Gets phase route using `getPhaseRouteName()`
4. Redirects using `router.replace()`

**Future Enhancement:**
- Can be converted to actual dashboard with case overview
- Currently serves as smart redirect based on user progress

---

### **3. app/Phases/phase[1-15].tsx**
**Purpose:** Individual phase screen showing educational videos and content.

**Structure:**
```typescript
export default function Phase1Screen() {
  const videos: VideoItem[] = [
    {
      id: "phase1-video1",
      title: { en: "...", es: "..." },
      loomEmbedUrl: { en: "...", es: "..." },
      summary: { en: "...", es: "..." }
    }
  ];

  return (
    <PhaseScreenWrapper phaseNumber={1} totalVideos={videos.length}>
      <VideoSection
        phaseTitle={{ en: "...", es: "..." }}
        phaseDescription={{ en: "...", es: "..." }}
        videos={videos}
        phaseNumber={1}
      />
    </PhaseScreenWrapper>
  );
}
```

**Required for each phase:**
- Unique video IDs (e.g., "phase1-video1")
- English and Spanish content for all fields
- Correct phase number passed to wrapper

---

### **4. components/CustomHeader.tsx**
**Purpose:** Custom header component with title and language toggle.

**Key Features:**
- Displays translated phase titles
- Language toggle button (EN ⇄ ES)
- Menu hamburger button for drawer
- Includes `PhaseProgressBar` component
- Navy blue background (#000080)

**Layout:**
```
[☰ Menu]  [Phase Title]  [EN/ES]
     [Progress Bar with Dots]
```

**Translation Logic:**
- Dashboard → `t('phase.dashboard')`
- Phases → Extracts phase number and uses `t('phase.N')`

---

### **5. components/PhaseProgressBar.tsx**
**Purpose:** Visual progress indicator showing all 15 phases as dots.

**Key Features:**
- Shows all 15 phases as dots
- Green dots with checkmarks for completed phases
- Larger green dot for user's current phase
- Faded white dots for upcoming phases
- Displays current phase name and count (e.g., "Investigation 10/15")

**Visual States:**
- **Completed (< user phase):** Green dot + white checkmark ✓
- **Current (= user phase):** Larger green dot (no checkmark)
- **Upcoming (> user phase):** Small faded white dot

**Data Sources:**
- User's current phase from `UserContext`
- Currently viewing phase from route name
- Phase count from `PHASE_SCREENS` array

---

### **6. components/VideoSection.tsx**
**Purpose:** Displays video content with embedded Loom players and checkboxes.

**Key Features:**
- Embeds Loom videos using iframes (web) or placeholder (mobile)
- Checkbox to mark videos as watched
- Stores watched status in localStorage
- Shows video number badge (e.g., "1/3")
- Bilingual video titles and summaries
- Scrollable content area

**Storage Format:**
```javascript
localStorage key: "phase_N_watched"
value: ["phase1-video1", "phase1-video2"]
```

**Props Required:**
- `phaseTitle`: Bilingual phase title
- `phaseDescription`: Bilingual description
- `videos`: Array of VideoItem objects
- `phaseNumber`: Phase number (1-15)

**Event Dispatch:**
Fires `phaseProgressUpdate` event when checkbox toggled to update footer in real-time.

---

### **7. components/PhaseProgressFooter.tsx**
**Purpose:** Fixed footer showing phase completion progress.

**Key Features:**
- Always visible at bottom of screen
- Shows watched video count (e.g., "2 of 3 videos watched")
- Displays completion percentage
- Green progress bar
- Updates in real-time when checkboxes toggled
- Reads from localStorage

**Display:**
```
Phase Progress                    67%
2 of 3 videos watched
[████████████░░░░] (progress bar)
```

**Event Listeners:**
- `storage` event: Detects localStorage changes
- `phaseProgressUpdate` event: Custom event from VideoSection

---

### **8. components/PhaseScreenWrapper.tsx**
**Purpose:** Wrapper component that adds fixed footer to phase screens.

**Key Features:**
- Simple layout wrapper
- Takes children (VideoSection)
- Adds PhaseProgressFooter at bottom
- Ensures footer stays fixed

**Usage:**
```typescript
<PhaseScreenWrapper phaseNumber={1} totalVideos={2}>
  <VideoSection ... />
</PhaseScreenWrapper>
```

---

### **9. constants/phases.ts**
**Purpose:** Centralized configuration for all phases and screens.

**Exports:**
- `DASHBOARD_SCREEN`: Dashboard configuration
- `PHASE_SCREENS`: Array of 15 phase configurations
- `ALL_SCREENS`: Combined array for layout mapping

**ScreenConfig Type:**
```typescript
{
  name: string;        // Route name (e.g., "Phases/phase1")
  label: string;       // Display label (not used after translations)
  icon: Ionicons name; // Icon for drawer menu
}
```

**Phase List:**
1. Investigation
2. Property Damage
3. Treatment
4. Demand Preparation
5. Negotiation and Insurance
6. Case Transfer to Litigation
7. Lawsuit Filed
8. Discovery
9. Depositions
10. Mediation
11. Trial Preparation
12. Appeal
13. Subrogations and Liens
14. Payoff
15. Closing the File

---

### **10. contexts/LanguageContext.tsx**
**Purpose:** Global language state management and translations.

**Key Features:**
- Manages current language (en/es)
- Provides translation function `t(key)`
- Contains all translations for UI text
- Used throughout app for bilingual support

**Translation Structure:**
```typescript
translations = {
  en: {
    'phase.1': 'Phase 1: Investigation',
    'phase.short.1': 'Investigation',
    'progress.of': 'of',
    'video.summary': 'Summary'
  },
  es: {
    'phase.1': 'Fase 1: Investigación',
    'phase.short.1': 'Investigación',
    'progress.of': 'de',
    'video.summary': 'Resumen'
  }
}
```

**Hook Usage:**
```typescript
const { language, setLanguage, t } = useLanguage();
```

**Translation Categories:**
- Phase names (long form)
- Phase names (short form for progress bar)
- UI elements (buttons, labels)

---

### **11. contexts/UserContext.tsx**
**Purpose:** Manages user data and current phase information.

**Key Features:**
- Stores user information (name, email, case number)
- Tracks user's current phase (1-15)
- Provides `updateCurrentPhase()` function
- Currently uses hardcoded data (ready for API integration)

**UserData Type:**
```typescript
{
  name: string;
  currentPhase: number;  // 1-15
  email?: string;
  caseNumber?: string;
}
```

**Current Implementation:**
```typescript
// HARDCODED - Replace with API call
const [user] = useState({
  name: "John Doe",
  currentPhase: 8,
  email: "john.doe@example.com",
  caseNumber: "CASE-2024-001"
});
```

**Helper Function:**
- `getPhaseRouteName(phaseNumber)`: Converts phase number to route string

**Future Integration:**
Replace hardcoded state with:
```typescript
useEffect(() => {
  fetch('/api/user/current')
    .then(res => res.json())
    .then(data => setUser(data));
}, []);
```

---

## 🔄 Data Flow

### **Language Switching:**
1. User clicks EN/ES button in header
2. `CustomHeader` calls `setLanguage()`
3. `LanguageContext` updates global state
4. All components re-render with new translations
5. Video content switches to appropriate language

### **Progress Tracking:**
1. User watches video and clicks checkbox
2. `VideoSection` updates localStorage
3. Fires `phaseProgressUpdate` event
4. `PhaseProgressFooter` listens and updates display
5. Progress bar animates to new percentage

### **Phase Navigation:**
1. User opens drawer menu
2. Drawer shows 15 translated phase names
3. User selects a phase
4. App navigates to phase screen
5. Header shows phase title and progress dots
6. Footer shows phase-specific video progress

### **Initial Load:**
1. App starts, providers wrap everything
2. `UserContext` loads user data
3. `index.tsx` reads current phase
4. Redirects to user's current phase
5. Phase screen loads with videos
6. Footer reads localStorage for watched videos

---

## 🎨 UI/UX Features

### **Color Scheme:**
- **Primary Navy Blue:** #000080 (headers, buttons)
- **Success Green:** #4CAF50 (completed items, progress)
- **Background Gray:** #f5f5f5
- **White:** #fff (cards, text)

### **Responsive Design:**
- Works on web and mobile
- Drawer navigation for easy access
- Scrollable content areas
- Fixed header and footer

### **Accessibility:**
- Icons with text labels
- High contrast colors
- Clear visual hierarchy
- Touch-friendly buttons (44x44px minimum)

---

## 💾 Data Storage

### **LocalStorage Keys:**
- `phase_N_watched`: Array of watched video IDs for phase N
  - Example: `["phase1-video1", "phase1-video2"]`

### **Storage Format:**
```javascript
// Phase 1 watched videos
localStorage.setItem(
  'phase_1_watched',
  JSON.stringify(['phase1-video1', 'phase1-video2'])
);
```

### **Persistence:**
- Checkbox states persist across page refreshes
- Language preference could be stored (future enhancement)
- User phase stored in context (will move to database)

---

## 🔌 Future API Integration

### **Endpoints Needed:**

#### **1. Get User Data**
```
GET /api/user/current
Response: {
  name: string,
  currentPhase: number,
  email: string,
  caseNumber: string
}
```

#### **2. Update User Phase**
```
POST /api/user/update-phase
Body: { phase: number }
Response: { success: boolean }
```

#### **3. Get/Save Video Progress**
```
GET /api/user/progress/:phaseNumber
Response: { watchedVideos: string[] }

POST /api/user/progress/:phaseNumber
Body: { videoId: string, watched: boolean }
Response: { success: boolean }
```

#### **4. Get User's Language Preference**
```
GET /api/user/language
Response: { language: 'en' | 'es' }

POST /api/user/language
Body: { language: 'en' | 'es' }
```

---

## 🚀 Getting Started

### **Installation:**
```bash
npm install
npx expo start
```

### **Key Dependencies:**
- `expo` - React Native framework
- `expo-router` - File-based routing
- `react-native-gesture-handler` - Drawer navigation
- `react-native-safe-area-context` - Safe area handling
- `@expo/vector-icons` - Icon library

### **Development:**
```bash
# Start web
npx expo start --web

# Start with cache clear
npx expo start -c

# iOS
npx expo start --ios

# Android
npx expo start --android
```

---

## 📝 Adding New Content

### **Adding a New Video:**
1. Open the appropriate phase file (e.g., `phase1.tsx`)
2. Add new video object to `videos` array:
```typescript
{
  id: "phase1-video3",  // Must be unique
  title: { en: "...", es: "..." },
  loomEmbedUrl: { en: "...", es: "..." },
  summary: { en: "...", es: "..." }
}
```
3. Update `totalVideos` count automatically (uses `videos.length`)

### **Adding New Phase:**
1. Add phase to `constants/phases.ts`
2. Create new file `app/Phases/phaseN.tsx`
3. Add translations to `contexts/LanguageContext.tsx`
4. Follow existing phase file structure

### **Adding New Translation:**
1. Open `contexts/LanguageContext.tsx`
2. Add key to both `en` and `es` objects
3. Use `t('your.key')` in components

---

## 🐛 Troubleshooting

### **"useUser/useLanguage must be used within Provider"**
- Ensure providers are in `_layout.tsx`
- Check provider order: UserProvider > LanguageProvider > DrawerLayout

### **Videos not loading**
- Check Loom embed URL format
- Ensure video is public or has correct permissions
- Web only: Check iframe embedding is allowed

### **Checkboxes not persisting**
- Verify localStorage is available (web only)
- Check unique video IDs are being used
- Look for console errors

### **Progress bar not updating**
- Ensure `phaseProgressUpdate` event is firing
- Check localStorage key format: `phase_N_watched`
- Verify footer is listening to events

### **Translation not working**
- Check translation key exists in LanguageContext
- Verify `t()` function is being used correctly
- Ensure language toggle is updating global state

---

## 📊 Current Implementation Status

✅ **Completed:**
- Drawer navigation with 15 phases
- Bilingual system (EN/ES)
- Video embedding with Loom
- Progress tracking per phase
- Header with progress dots
- Fixed footer with phase progress
- Checkbox tracking for videos
- User redirect to current phase
- LocalStorage persistence

⏳ **Pending (MongoDB Integration):**
- User authentication
- API endpoints for user data
- Database storage for progress
- Multi-user support
- Admin dashboard
- Real-time sync across devices

---

## 🎯 Key Design Decisions

1. **File-based routing:** Using Expo Router for intuitive navigation structure
2. **Context for global state:** Language and User contexts avoid prop drilling
3. **LocalStorage for phase progress:** Simple solution before API integration
4. **Separate components:** Modular design for easy maintenance
5. **Bilingual from start:** All content structured for dual language support
6. **Fixed footer:** Always visible progress encourages completion
7. **Phase-based organization:** Mirrors legal case workflow

---

## 📚 Additional Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Loom Embed Documentation](https://support.loom.com/hc/en-us/articles/360002158057)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Last Updated:** October 2024
**Version:** 1.0.0
**Maintained By:** Development Team