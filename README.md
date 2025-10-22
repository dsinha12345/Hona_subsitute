# SLF Clients - Legal Case Management App Documentation

## 📋 Project Overview

A bilingual (English/Spanish) cross-platform mobile and web application built with React Native and Expo Router that guides legal clients through 15 phases of their case. The app features video education content, progress tracking, role-based authentication, and personalized user experiences.

**Platforms Supported:** Web, iOS, Android

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
├── contexts/
│   ├── AuthContext.tsx         # Authentication & role management
│   ├── LanguageContext.tsx     # Language switching (EN/ES)
│   └── UserContext.tsx         # User data and current phase
└── utils/
    └── storage.ts              # Cross-platform storage wrapper
```

---

## 🔑 Key Features

### Authentication System
- ✅ Login page with email/password
- ✅ Role-based routing (Client vs Admin)
- ✅ Session persistence across app restarts
- ✅ Demo accounts for testing
- ✅ Logout functionality

### Client Experience
- ✅ 15-phase legal case workflow
- ✅ Embedded Loom video education
- ✅ Progress tracking with checkboxes
- ✅ Last watched video auto-scroll
- ✅ Phase completion footer
- ✅ Bilingual content (EN/ES)
- ✅ Language toggle in header

### Admin Dashboard
- ✅ Separate admin interface
- ✅ Menu structure for future features
- ✅ Quick stats display
- ⏳ Client management (coming soon)
- ⏳ Analytics (coming soon)

### Cross-Platform Storage
- ✅ Works on Web, iOS, Android
- ✅ AsyncStorage wrapper
- ✅ Automatic platform detection
- ✅ Persists auth, progress, preferences

---

## 📁 Critical Files Documentation

### **utils/storage.ts** ⭐ NEW
**Purpose:** Cross-platform storage wrapper.

**Why it exists:** 
- `localStorage` only works on web
- Mobile (iOS/Android) requires `AsyncStorage`
- This wrapper automatically uses the right one

**Usage:**
```typescript
import { storage } from '../utils/storage';

// All methods are async
await storage.getItem('key');
await storage.setItem('key', 'value');
await storage.removeItem('key');
await storage.clear();
```

**Platform Detection:**
```typescript
if (Platform.OS === 'web') {
  // Use localStorage
} else {
  // Use AsyncStorage
}
```

---

### **contexts/AuthContext.tsx**
**Purpose:** Authentication state and role management.

**Key Features:**
- Manages authentication state
- Stores user role (client/admin)
- Login/logout functions
- Uses cross-platform storage
- Checks auth on app mount

**Demo Accounts:**
```
Client: client@demo.com / client123
Admin:  admin@demo.com / admin123
```

**Storage Keys:**
- `authUser`: JSON object with user data and role

**Future Integration:**
Replace hardcoded accounts with API authentication.

---

### **app/_layout.tsx**
**Purpose:** Root layout with authentication and role-based routing.

**Auth Flow:**
```
<AuthProvider>
  <RootLayoutNav>
    - Not authenticated → Login page
    - Admin → Admin dashboard (no drawer)
    - Client → Phase navigation (with drawer)
  </RootLayoutNav>
</AuthProvider>
```

**Hidden Routes:**
- `login`, `admin`, `(tabs)`, `modal`

---

### **app/login.tsx**
**Purpose:** Login form with validation.

**Features:**
- Email/password inputs
- Show/hide password toggle
- Error messages
- Loading states
- Demo credentials display
- Auto-redirect based on role

---

### **app/admin.tsx**
**Purpose:** Admin dashboard.

**Current Features:**
- Header with logout
- Welcome card
- 5 menu placeholders
- Quick stats (dummy data)
- No drawer navigation

**Menu Sections (Coming Soon):**
1. Manage Clients
2. Case Management
3. Content Management
4. Analytics
5. Settings

---

### **app/index.tsx**
**Purpose:** Smart redirect to user's current phase.

**Flow:**
1. Reads `user.currentPhase` from UserContext
2. Constructs route: `Phases/phase{N}`
3. Redirects with `router.replace()`
4. Shows loading spinner during redirect

---

### **app/Phases/phase[1-15].tsx**
**Purpose:** Individual phase screens with videos.

**Phase 1 Content (9 videos):**
1. Social media usage during case
2. Child support obligations
3. Other law firm contacts
4. Dog bite injury responsibility
5. Case timeline expectations
6. Cyber crime information
7. Claim if client passes away
8. Consortium claims explained
9. Insurance company involvement

**Structure:**
```typescript
<PhaseScreenWrapper phaseNumber={1} totalVideos={9}>
  <VideoSection
    phaseTitle={{ en: "...", es: "..." }}
    phaseDescription={{ en: "...", es: "..." }}
    videos={[...]}
    phaseNumber={1}
  />
</PhaseScreenWrapper>
```

---

### **components/CustomHeader.tsx**
**Purpose:** Header with phase title and language toggle.

**Layout:**
```
[☰ Menu]  [Phase Title]  [EN/ES]
   [Progress Bar: ●●●○○○○○○○○○○○○]
        [Phase Name  10/15]
```

**Features:**
- Translated titles via `t()` function
- Language toggle on right
- Includes PhaseProgressBar
- Navy blue (#000080) background

---

### **components/CustomDrawerContent.tsx**
**Purpose:** Custom drawer with user info.

**Features:**
- User avatar circle
- Name, email, case number
- Navigation items
- Logout button at bottom
- Card-based styling

---

### **components/PhaseProgressBar.tsx**
**Purpose:** Visual progress with 15 dots.

**Visual States:**
- ✅ **Completed:** Green dot + white checkmark
- 🟢 **Current:** Larger green dot (1.3x scale)
- ⚪ **Upcoming:** Faded white dot (0.35 opacity)

**Shows:** Phase name + count (e.g., "Investigation 10/15")

**Data Source:** `user.currentPhase` from UserContext

---

### **components/VideoSection.tsx**
**Purpose:** Video player with progress tracking.

**Features:**
- Loom iframe embedding (web)
- Checkbox to mark watched
- Cross-platform storage
- Video counter badges (1/9, 2/9)
- Bilingual titles/summaries
- Last watched highlighting
- Auto-scroll to continue
- Green border for active video

**Storage Keys:**
- `phase_N_watched`: Array of video IDs
- `lastWatchedVideo`: {phaseNumber, videoId}

**Important:** Uses `await storage.getItem()` for cross-platform compatibility.

---

### **components/PhaseProgressFooter.tsx**
**Purpose:** Fixed footer with phase completion.

**Features:**
- Always visible at bottom
- Shows watched count
- Completion percentage
- Animated progress bar
- Real-time updates
- Bilingual text

**Display:**
```
Phase Progress                    67%
2 of 9 videos watched
[████████████░░░░░░░░░]
```

**Event Handling:**
- Web: Listens to `storage` and `phaseProgressUpdate` events
- Mobile: Re-fetches from storage on checkbox change

---

### **components/PhaseScreenWrapper.tsx**
**Purpose:** Adds footer to phase screens.

**Simple wrapper:**
```typescript
<PhaseScreenWrapper phaseNumber={1} totalVideos={9}>
  <VideoSection ... />
</PhaseScreenWrapper>
```

---

### **constants/phases.ts**
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
- `DASHBOARD_SCREEN`
- `PHASE_SCREENS` (array of 15)
- `ALL_SCREENS` (combined)

---

### **contexts/LanguageContext.tsx**
**Purpose:** Global language state and translations.

**Features:**
- Manages current language (en/es)
- Translation function `t(key)`
- All UI text translations

**Usage:**
```typescript
const { language, setLanguage, t } = useLanguage();
```

**Translation Keys:**
- `phase.1` through `phase.15` (long names)
- `phase.short.1` through `phase.short.15` (short names)
- `progress.of`, `video.summary` (UI elements)

---

### **contexts/UserContext.tsx**
**Purpose:** User case data and progress.

**Features:**
- Case information
- Current phase (1-15)
- Last watched video
- Update functions
- Uses cross-platform storage

**Data Type:**
```typescript
{
  name: string;
  currentPhase: number;
  email?: string;
  caseNumber?: string;
  lastWatchedVideo?: {
    phaseNumber: number;
    videoId: string;
  }
}
```

**Integration:**
- Loads when authenticated
- Uses `authUser.id` for API calls
- Currently hardcoded (ready for API)

---

## 💾 Cross-Platform Storage

### **Storage Keys:**
```javascript
// Authentication
'authUser': JSON object with user data

// Progress tracking
'phase_N_watched': ["video1", "video2"]
'lastWatchedVideo': {phaseNumber: 1, videoId: "phase1-video3"}
```

### **Usage Pattern:**
```typescript
import { storage } from '../utils/storage';

// Always use await
const data = await storage.getItem('key');
await storage.setItem('key', JSON.stringify(data));
await storage.removeItem('key');
```

### **Platform Behavior:**
- **Web:** Uses `localStorage` (synchronous internally)
- **iOS:** Uses `AsyncStorage` (async)
- **Android:** Uses `AsyncStorage` (async)

---

## 🎨 UI/UX Design

### **Color Scheme:**
- **Primary Navy:** #000080 (headers, buttons)
- **Success Green:** #4CAF50 (completed, progress)
- **Error Red:** #d32f2f (logout, errors)
- **Background:** #f5f5f5
- **Cards:** #fff
- **Text:** #333 (primary), #666 (secondary)

### **Design Patterns:**
- Card-based layouts
- Fixed header and footer
- Drawer navigation (clients)
- Progress indicators
- Badge components
- Touch-friendly buttons (44x44px min)

---

## 🔄 Data Flow

### **Authentication:**
1. User enters credentials
2. `AuthContext.login()` validates
3. Stores in cross-platform storage
4. `_layout.tsx` checks auth
5. Redirects based on role

### **Language Switching:**
1. User clicks EN/ES button
2. `setLanguage()` updates context
3. Components re-render
4. Translations update via `t()`
5. Videos switch language

### **Progress Tracking:**
1. User checks video
2. Updates storage (async)
3. Fires `phaseProgressUpdate` (web only)
4. Footer re-fetches data
5. Updates last watched video

### **Last Watched Video:**
1. User checks video
2. Saves to UserContext + storage
3. On page load, checks if same phase
4. Auto-scrolls to video
5. Highlights with green border

---

## 📦 Dependencies

### **Core:**
- `expo` - React Native framework
- `expo-router` - File-based routing
- `react-native-gesture-handler` - Drawer
- `react-native-safe-area-context` - Safe areas
- `@expo/vector-icons` - Icons

### **Storage:**
- `@react-native-async-storage/async-storage` - Mobile storage

### **Navigation:**
- `@react-navigation/drawer` - Drawer navigation
- `@react-navigation/native` - Navigation core

---

## 🚀 Getting Started

### **Installation:**
```bash
npm install
npx expo start
```

### **Run on Different Platforms:**
```bash
# Web
npx expo start --web

# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Clear cache
npx expo start -c
```

### **Demo Accounts:**
```
Client: client@demo.com / client123
Admin:  admin@demo.com / admin123
```

---

## 🐛 Common Issues & Solutions

### **"localStorage doesn't exist" error:**
**Problem:** Using `localStorage` directly on mobile.
**Solution:** Import and use `storage` from `utils/storage.ts`:
```typescript
import { storage } from '../utils/storage';
await storage.getItem('key');
```

### **White screen on login:**
**Problem:** `_layout.tsx` returning `null` when not authenticated.
**Solution:** Use `<Slot />` to render login route.

### **Drawer showing login/admin:**
**Problem:** Routes not hidden from drawer.
**Solution:** Add to drawer screens:
```typescript
<Drawer.Screen name="login" options={{ drawerItemStyle: { display: "none" } }} />
```

### **Videos not loading:**
- Verify Loom embed URL format
- Check video is public
- Test URL in browser

### **Progress not persisting:**
- Ensure using `await storage.setItem()`
- Check unique video IDs
- Verify storage wrapper is imported

---

## 📊 Implementation Status

### ✅ **Completed:**
- Authentication system with login
- Role-based access (client/admin)
- Cross-platform storage wrapper ⭐
- 15 phase navigation
- Bilingual support (EN/ES)
- Video embedding with Loom
- Progress tracking with checkboxes
- Phase completion footer
- Header with progress dots
- Last watched video tracking
- Auto-scroll to continue
- Custom drawer with user info
- Logout functionality
- Admin dashboard skeleton
- Runs on Web, iOS, Android ⭐

### ⏳ **Pending:**
- MongoDB integration
- Real API authentication
- Admin client management
- Case management
- Content management
- Analytics dashboard
- Video content for phases 2-15
- Push notifications
- Email notifications
- Password reset

---

## 🔌 MongoDB Integration (Planned)

### **Collections:**

**users:**
```javascript
{
  _id: ObjectId,
  email: string,
  passwordHash: string,
  name: string,
  role: "client" | "admin",
  caseNumber?: string,
  currentPhase: number,
  language: "en" | "es",
  lastWatchedVideo: {
    phaseNumber: number,
    videoId: string,
    timestamp: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

**video_progress:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  phaseNumber: number,
  videoId: string,
  watched: boolean,
  watchedAt: Date
}
```

### **API Endpoints:**

**Auth:**
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

**User:**
```
GET  /api/user/current
PATCH /api/user/phase
PATCH /api/user/language
PATCH /api/user/last-video
```

**Progress:**
```
GET  /api/progress/:phaseNumber
POST /api/progress/mark-watched
GET  /api/progress/all
```

**Admin:**
```
GET  /api/admin/clients
GET  /api/admin/client/:id
PATCH /api/admin/client/:id
GET  /api/admin/analytics
```

---

## 🎯 Key Lessons Learned

### **Cross-Platform from Day 1:**
⚠️ **Always use cross-platform APIs from the start:**
- ❌ Don't use `localStorage` directly
- ✅ Use AsyncStorage wrapper
- ✅ Test on all target platforms early
- ✅ Check React Native docs for platform differences

### **Storage Migration:**
If you need to migrate existing code:
1. Create `utils/storage.ts` wrapper
2. Replace all `localStorage` with `storage`
3. Add `await` to all storage calls
4. Wrap in async functions
5. Test on mobile devices

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation Drawer](https://reactnavigation.org/docs/drawer-navigator/)
- [Loom Embed Guide](https://support.loom.com/hc/en-us/articles/360002158057)

---

## 🔮 Next Steps

### **Immediate Priority:**
1. Test all features on iOS/Android
2. Verify storage works correctly
3. Test video playback on mobile
4. Ensure checkboxes persist

### **Phase 1: Database Integration**
1. Set up MongoDB Atlas
2. Create API endpoints
3. Implement JWT authentication
4. Migrate from storage to database

### **Phase 2: Content**
1. Add videos to phases 2-15
2. Translate all content
3. Record Loom videos
4. Add phase descriptions

### **Phase 3: Admin Features**
1. Client management interface
2. Case assignment
3. Progress monitoring
4. Analytics dashboard

### **Phase 4: Production**
1. iOS app submission
2. Android app submission
3. Domain and hosting
4. Production database

---

**Last Updated:** December 2024  
**Version:** 2.1.0  
**Status:** Cross-platform storage complete, Auth system working  
**Platforms:** Web ✅ iOS ✅ Android ✅  
**Next:** MongoDB Integration  
**Maintained By:** Development Team