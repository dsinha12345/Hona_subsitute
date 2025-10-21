# SLF Clients - Legal Case Management App Documentation

## 📋 Project Overview

A bilingual (English/Spanish) mobile and web application built with React Native and Expo Router that guides legal clients through 15 phases of their case. The app features video education content, progress tracking, role-based authentication, and personalized user experiences.

---

## 🏗️ Project Structure

```
SLF_clients/
├── app/
│   ├── _layout.tsx              # Root layout with auth & navigation
│   ├── index.tsx                # Dashboard/redirect screen
│   ├── login.tsx                # Login page
│   ├── admin.tsx                # Admin dashboard
│   ├── Phases/
│   │   ├── phase1.tsx          # Phase 1: Investigation (9 videos)
│   │   ├── phase2.tsx          # Phase 2: Property Damage
│   │   ├── phase3.tsx          # Phase 3: Treatment
│   │   └── ... (phase4-15)     # Additional phases
│   ├── (tabs)/                 # Tab navigation (hidden)
│   └── modal.tsx               # Modal screen (hidden)
├── components/
│   ├── CustomHeader.tsx        # Header with language toggle
│   ├── CustomDrawerContent.tsx # Drawer with user info & logout
│   ├── PhaseProgressBar.tsx    # Progress dots in header
│   ├── VideoSection.tsx        # Video player with checkboxes
│   ├── PhaseProgressFooter.tsx # Fixed footer with progress
│   └── PhaseScreenWrapper.tsx  # Wrapper adds footer to phases
├── constants/
│   └── phases.ts               # 15 phase configurations
└── contexts/
    ├── AuthContext.tsx         # Authentication & role management
    ├── LanguageContext.tsx     # Language switching (EN/ES)
    └── UserContext.tsx         # User data and current phase
```

---

## 📁 Detailed File Documentation

### **1. app/_layout.tsx**
**Purpose:** Root layout with authentication, role-based routing, and navigation.

**Key Features:**
- Wraps app with `AuthProvider`, `UserProvider`, `LanguageProvider`
- Protected routes - redirects to login if not authenticated
- Role-based routing:
  - **Client** → Drawer with 15 phases
  - **Admin** → Admin dashboard (no drawer)
- Hides login, admin, (tabs), modal from drawer menu
- Custom drawer content with user info and logout

**Auth Flow:**
```typescript
<AuthProvider>
  <RootLayoutNav />
    - Not authenticated → Login page (<Slot />)
    - Admin authenticated → Admin page (<Slot />)
    - Client authenticated → Phase navigation (DrawerLayout)
</AuthProvider>
```

**Dependencies:**
- `expo-router/drawer`
- `react-native-gesture-handler`
- `@expo/vector-icons`

---

### **2. app/login.tsx**
**Purpose:** Beautiful login form with email/password authentication.

**Key Features:**
- Email and password inputs with validation
- Show/hide password toggle
- Loading indicator during authentication
- Error messages for failed login
- Demo account credentials displayed
- Responsive card-based design

**Demo Accounts:**
```
Client: client@demo.com / client123
Admin:  admin@demo.com / admin123
```

**Auth Process:**
1. User enters credentials
2. Calls `login()` from `AuthContext`
3. On success, router redirects based on role
4. On failure, displays error message

---

### **3. app/admin.tsx**
**Purpose:** Admin dashboard for managing clients and cases.

**Key Features:**
- Header with user info and logout
- Welcome card with branding
- 5 menu sections (coming soon):
  - Manage Clients
  - Case Management
  - Content Management
  - Analytics
  - Settings
- Quick stats cards (dummy data)
- No drawer navigation (standalone page)

**Future Features:**
- Client list with search/filter
- Case overview and management
- Video content CRUD
- Progress analytics
- System configuration

---

### **4. app/index.tsx**
**Purpose:** Smart redirect to user's current phase.

**Key Features:**
- Reads user's current phase from `UserContext`
- Auto-redirects authenticated users to their phase
- Shows loading spinner with welcome message
- 500ms delay ensures contexts are loaded

**Flow:**
1. Component mounts
2. Checks `user.currentPhase` from context
3. Constructs route: `Phases/phase8`
4. Redirects using `router.replace()`

---

### **5. app/Phases/phase[1-15].tsx**
**Purpose:** Individual phase screens with educational videos.

**Phase 1 Example (9 videos):**
- Can I use social media during my case?
- What if I owe child support?
- Contact from other law firms
- Dog bite injury responsibility
- Case timeline expectations
- Cyber crime information
- What happens if I pass away
- Consortium claims
- Insurance company involvement

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

---

### **6. components/CustomHeader.tsx**
**Purpose:** Custom header with phase title and language toggle.

**Key Features:**
- Displays translated phase titles
- Language toggle button (EN ⇄ ES) on right
- Menu hamburger button on left
- Includes `PhaseProgressBar` component
- Navy blue background (#000080)

**Layout:**
```
[☰ Menu]  [Phase Title]  [EN/ES]
   [Progress Bar: ●●●○○○○○○○○○○○○]
        [Phase Name  10/15]
```

---

### **7. components/CustomDrawerContent.tsx**
**Purpose:** Custom drawer with user info and logout.

**Key Features:**
- User avatar with icon
- Displays name, email, case number
- Standard drawer navigation items
- Logout button at bottom (red)
- Beautiful styling with cards

**User Info Display:**
- Avatar circle with person icon
- User's full name (bold)
- Email address (gray)
- Case number badge (for clients only)

---

### **8. components/PhaseProgressBar.tsx**
**Purpose:** Visual progress showing all 15 phases as dots.

**Key Features:**
- 15 dots representing all phases
- Green dots with white checkmarks for completed
- Larger green dot for current phase
- Faded white dots for upcoming
- Shows phase name and count (e.g., "Investigation 10/15")

**Visual States:**
- **Completed:** Green dot + white checkmark ✓
- **Current:** Larger green dot (1.3x scale)
- **Upcoming:** Small faded white dot (0.35 opacity)

**Progress Calculation:**
Based on `user.currentPhase` from UserContext

---

### **9. components/VideoSection.tsx**
**Purpose:** Displays videos with embedded players and watch tracking.

**Key Features:**
- Embeds Loom videos via iframe (web)
- Checkbox to mark videos watched
- Stores progress in localStorage
- Video counter badge (1/9, 2/9, etc.)
- Bilingual titles and summaries
- Last watched video highlighting
- Auto-scroll to last watched video
- Green border for "Continue" video

**Storage:**
```javascript
localStorage: "phase_N_watched" = ["video1", "video2"]
localStorage: "lastWatchedVideo" = {phaseNumber: 1, videoId: "phase1-video3"}
```

**Auto-scroll Feature:**
- Detects last watched video
- Scrolls to position on page load
- Highlights with green border
- Shows "Continue" badge

---

### **10. components/PhaseProgressFooter.tsx**
**Purpose:** Fixed footer showing phase completion.

**Key Features:**
- Always visible at bottom
- Shows watched count (e.g., "2 of 9 videos watched")
- Completion percentage badge
- Green progress bar animation
- Real-time updates via events
- Bilingual text

**Display:**
```
Phase Progress                    67%
2 of 9 videos watched
[████████████░░░░░░░░░]
```

**Event Listeners:**
- `storage`: Detects localStorage changes
- `phaseProgressUpdate`: Custom event from checkboxes

---

### **11. components/PhaseScreenWrapper.tsx**
**Purpose:** Wrapper that adds footer to phase screens.

**Simple wrapper component:**
```typescript
<PhaseScreenWrapper phaseNumber={1} totalVideos={9}>
  <VideoSection ... />
</PhaseScreenWrapper>
```

Ensures footer stays at bottom of screen.

---

### **12. constants/phases.ts**
**Purpose:** Configuration for all 15 phases.

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

**Exports:**
- `DASHBOARD_SCREEN`: Dashboard config
- `PHASE_SCREENS`: Array of 15 configs
- `ALL_SCREENS`: Combined array

---

### **13. contexts/AuthContext.tsx**
**Purpose:** Authentication state and role management.

**Key Features:**
- Manages authentication state
- Stores user role (client/admin)
- Login/logout functions
- Persists session in localStorage
- Checks auth on app mount

**User Roles:**
```typescript
type UserRole = 'client' | 'admin';

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  caseNumber?: string; // Clients only
};
```

**Demo Authentication:**
Currently uses hardcoded accounts:
- `client@demo.com` / `client123`
- `admin@demo.com` / `admin123`

**Future:**
Replace with API calls to backend authentication service.

---

### **14. contexts/LanguageContext.tsx**
**Purpose:** Global language state and translations.

**Key Features:**
- Manages current language (en/es)
- Translation function `t(key)`
- All UI text translations
- Phase name translations (long & short)

**Translation Categories:**
- Phase names: `phase.1` through `phase.15`
- Short names: `phase.short.1` through `phase.short.15`
- UI elements: `progress.of`, `video.summary`

**Usage:**
```typescript
const { language, setLanguage, t } = useLanguage();
```

---

### **15. contexts/UserContext.tsx**
**Purpose:** User case data and progress tracking.

**Key Features:**
- Stores user case information
- Tracks current phase (1-15)
- Last watched video tracking
- Functions to update progress
- Loads from AuthContext when authenticated

**UserData Type:**
```typescript
{
  name: string;
  currentPhase: number;  // 1-15
  email?: string;
  caseNumber?: string;
  lastWatchedVideo?: {
    phaseNumber: number;
    videoId: string;
  }
}
```

**Integration with Auth:**
- Loads when `AuthContext.isAuthenticated === true`
- Uses `authUser.id` to fetch user data
- Currently hardcoded, ready for API

---

## 🔄 Data Flow

### **Authentication Flow:**
1. User enters credentials on login page
2. `AuthContext.login()` validates credentials
3. Stores user info and role in localStorage
4. `_layout.tsx` checks authentication
5. Redirects based on role:
   - Admin → `/admin`
   - Client → `/` → redirects to current phase

### **Language Switching:**
1. User clicks EN/ES button
2. `setLanguage()` updates context
3. All components re-render
4. Translations update via `t()` function
5. Video content switches language

### **Progress Tracking:**
1. User checks video as watched
2. Updates localStorage
3. Fires `phaseProgressUpdate` event
4. Footer listens and re-renders
5. Updates last watched video in context
6. Next login scrolls to that video

### **Last Watched Video:**
1. User checks video as watched
2. Saves to `UserContext.lastWatchedVideo`
3. Saves to localStorage for persistence
4. On page load, checks if same phase
5. Auto-scrolls to last watched video
6. Highlights with green border

---

## 🎨 UI/UX Features

### **Color Scheme:**
- **Primary Navy:** #000080 (headers, buttons, branding)
- **Success Green:** #4CAF50 (completed, progress)
- **Error Red:** #d32f2f (logout, errors)
- **Background:** #f5f5f5 (page background)
- **Cards:** #fff (white cards)
- **Text:** #333 (primary), #666 (secondary)

### **Design Patterns:**
- Card-based layouts
- Fixed header and footer
- Drawer navigation (client)
- Modal overlays
- Progress indicators
- Badge components
- Icon + text buttons

### **Responsive Design:**
- Works on web and mobile
- Touch-friendly buttons (44x44px min)
- Scrollable content areas
- Fixed positioning for key elements

---

## 💾 Data Storage

### **LocalStorage Keys:**
```javascript
// Authentication
'authUser': JSON // User auth data with role

// Progress tracking
'phase_N_watched': ["video1", "video2"] // Per phase
'lastWatchedVideo': {phaseNumber: 1, videoId: "phase1-video3"}
```

### **Persistence:**
- ✅ Auth session across refreshes
- ✅ Checkbox states per phase
- ✅ Last watched video position
- ⏳ Language preference (to be added)

---

## 🔐 Authentication System

### **Current Implementation:**
- Demo accounts (hardcoded)
- localStorage session storage
- Role-based routing
- Protected routes

### **Demo Accounts:**
```
Client Account:
- Email: client@demo.com
- Password: client123
- Role: client
- Access: Phase navigation

Admin Account:
- Email: admin@demo.com
- Password: admin123
- Role: admin
- Access: Admin dashboard
```

### **Future Integration:**
Will connect to MongoDB with:
- JWT tokens
- Secure password hashing
- Session management
- Refresh tokens
- Password reset

---

## 🔌 MongoDB Integration (Planned)

### **Collections Design:**

#### **users Collection:**
```javascript
{
  _id: ObjectId,
  email: "client@example.com",
  passwordHash: "hashed_password",
  name: "John Doe",
  role: "client", // or "admin"
  caseNumber: "CASE-2024-001",
  currentPhase: 8,
  language: "en",
  lastWatchedVideo: {
    phaseNumber: 8,
    videoId: "phase8-video3",
    timestamp: ISODate
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### **video_progress Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  phaseNumber: 1,
  videoId: "phase1-video1",
  watched: true,
  watchedAt: ISODate
}
```

### **API Endpoints Needed:**

#### **Authentication:**
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

#### **User Management:**
```
GET  /api/user/current
PATCH /api/user/phase
PATCH /api/user/language
PATCH /api/user/last-video
```

#### **Progress Tracking:**
```
GET  /api/progress/:phaseNumber
POST /api/progress/mark-watched
GET  /api/progress/all
```

#### **Admin Endpoints:**
```
GET  /api/admin/clients
GET  /api/admin/client/:id
PATCH /api/admin/client/:id
GET  /api/admin/analytics
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
- `react-native-gesture-handler` - Drawer
- `react-native-safe-area-context` - Safe areas
- `@expo/vector-icons` - Icons
- `@react-navigation/drawer` - Drawer navigation

### **Development:**
```bash
# Web
npx expo start --web

# Clear cache
npx expo start -c

# iOS
npx expo start --ios

# Android
npx expo start --android
```

---

## 📝 Adding New Content

### **Adding Videos to Existing Phase:**
1. Open phase file (e.g., `phase1.tsx`)
2. Add to `videos` array:
```typescript
{
  id: "phase1-video10", // Unique ID
  title: { en: "English Title", es: "Título Español" },
  loomEmbedUrl: { en: "https://...", es: "https://..." },
  summary: { en: "English summary...", es: "Resumen español..." }
}
```

### **Creating New Phase:**
1. Add to `constants/phases.ts`
2. Create `app/Phases/phaseN.tsx`
3. Add translations to `LanguageContext.tsx`
4. Follow phase1 structure

### **Adding Translations:**
1. Open `contexts/LanguageContext.tsx`
2. Add to both `en` and `es` objects:
```typescript
'your.key': 'English text'
'your.key': 'Texto español'
```
3. Use in components: `t('your.key')`

---

## 🐛 Troubleshooting

### **White blank screen:**
- Check browser console for errors
- Verify all context providers are in `_layout.tsx`
- Check route exists in `app/` folder
- Restart dev server with `-c` flag

### **"Must be used within Provider" error:**
- Ensure providers wrap components in correct order
- AuthProvider > UserProvider > LanguageProvider
- Check import paths are correct

### **Videos not loading:**
- Verify Loom embed URL format
- Check video is public/accessible
- Test URL in separate tab

### **Checkboxes not persisting:**
- Check localStorage is available (web)
- Verify unique video IDs
- Check console for errors

### **Auto-scroll not working:**
- Check console logs for "Scrolling to..."
- Verify lastWatchedVideo in localStorage
- Confirm on same phase as last watched

---

## 📊 Implementation Status

### ✅ **Completed Features:**
- Authentication system with login
- Role-based access (client/admin)
- 15 phase navigation structure
- Bilingual support (EN/ES)
- Video embedding with Loom
- Progress tracking with checkboxes
- Phase completion footer
- Header with progress dots
- Last watched video tracking
- Auto-scroll to continue watching
- Custom drawer with user info
- Logout functionality
- Admin dashboard skeleton
- LocalStorage persistence

### ⏳ **Pending Features:**
- MongoDB integration
- Real API authentication
- Admin client management
- Admin case management
- Content management system
- Analytics dashboard
- Multi-user database sync
- Video content for all 15 phases
- Push notifications
- Email notifications
- Password reset
- User profile editing

---

## 🎯 Key Design Decisions

1. **Authentication First:** Built auth before database for security
2. **Role-Based Access:** Separate UX for clients vs admins
3. **LocalStorage Bridge:** Temporary storage before MongoDB
4. **Context Architecture:** Clean separation of concerns
5. **Bilingual from Start:** All content structured for translation
6. **Component Modularity:** Easy to maintain and extend
7. **Fixed Footer:** Encourages completion visibility
8. **Auto-scroll Feature:** Improves user experience
9. **Phase-Based Flow:** Mirrors legal process

---

## 📚 Resources

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation Drawer](https://reactnavigation.org/docs/drawer-navigator/)
- [Loom Embed Guide](https://support.loom.com/hc/en-us/articles/360002158057)
- [React Context API](https://react.dev/reference/react/useContext)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🔮 Future Roadmap

### **Phase 1: Database Integration**
- Set up MongoDB Atlas
- Create API endpoints
- Migrate from localStorage
- Implement real authentication

### **Phase 2: Admin Features**
- Client management interface
- Case assignment system
- Progress monitoring
- Analytics dashboard

### **Phase 3: Enhanced Features**
- Email notifications
- Push notifications
- In-app messaging
- Document uploads
- Calendar integration

### **Phase 4: Mobile Apps**
- iOS app submission
- Android app submission
- App store optimization
- Push notification setup

---

**Last Updated:** December 2024  
**Version:** 2.0.0  
**Status:** Authentication & Progress Tracking Complete  
**Next:** MongoDB Integration  
**Maintained By:** Development Team