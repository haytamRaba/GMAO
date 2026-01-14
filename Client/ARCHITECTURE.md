# GMAO Application Architecture

## Component Hierarchy

```
App.jsx
├── Router
│   └── AuthProvider
│       ├── Navbar (visible on all pages except login)
│       │   ├── Brand Logo
│       │   ├── Navigation Links
│       │   │   ├── Dashboard
│       │   │   ├── Equipments
│       │   │   ├── Interventions
│       │   │   └── Stock
│       │   └── User Info & Logout
│       │
│       └── Routes
│           ├── /login → Login Page
│           │   └── Login Form
│           │
│           ├── /dashboard → Dashboard Page (Protected)
│           │   ├── Card (Total Equipments)
│           │   ├── Card (Ongoing Interventions)
│           │   ├── Card (Stock Alerts)
│           │   ├── Card (Completed Interventions)
│           │   └── Recent Activities List
│           │
│           ├── /equipments → Equipments Page (Protected)
│           │   ├── Search & Filter Bar
│           │   ├── Table Component
│           │   │   └── Action Buttons (Edit, Delete)
│           │   └── Modal Component
│           │       └── Equipment Form
│           │
│           ├── /interventions → Interventions Page (Protected)
│           │   ├── Search & Filter Bar
│           │   ├── Table Component
│           │   │   └── Action Buttons (Complete, Edit, Delete)
│           │   └── Modal Component
│           │       └── Intervention Form
│           │
│           └── /stock → Stock Page (Protected)
│               ├── Summary Info (Total, Alerts, Value)
│               ├── Search & Filter Bar
│               ├── Table Component
│               │   └── Action Buttons (Edit, Delete)
│               └── Modal Component
│                   └── Stock Item Form
```

## Data Flow Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   React Router      │
│   (Routing)         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   AuthProvider      │
│   (Global State)    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐         ┌──────────────┐
│   Components/Pages  │ ←────→  │   Services   │
│   (UI Layer)        │         │   (API Layer)│
└─────────────────────┘         └──────┬───────┘
                                       │
                                       ▼
                                ┌──────────────┐
                                │  Mock Data   │
                                │  (utils)     │
                                └──────────────┘
```

## Service Layer Architecture

```
┌─────────────────────────────────────────────┐
│              Frontend Application            │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Pages   │  │Components│  │ Context  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       └──────────────┼─────────────┘        │
│                      ▼                       │
│            ┌─────────────────┐               │
│            │    Services     │               │
│            ├─────────────────┤               │
│            │ authService     │               │
│            │ equipmentService│               │
│            │interventionSvc  │               │
│            │ stockService    │               │
│            └────────┬────────┘               │
└─────────────────────┼──────────────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
           ▼                     ▼
    ┌─────────────┐      ┌─────────────┐
    │  Mock Data  │      │  Backend API│
    │  (Current)  │      │   (Future)  │
    └─────────────┘      └─────────────┘
```

## Authentication Flow

```
┌──────────────┐
│ User enters  │
│ credentials  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Login Component  │
│ validates form   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  authService     │
│  .login()        │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Find user in    │
│  mockData        │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Store user in   │
│  localStorage    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Set user in     │
│  AuthContext     │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Navigate to     │
│  Dashboard       │
└──────────────────┘
```

## CRUD Operations Flow

```
User Action (Click Add/Edit/Delete)
    ↓
Component opens Modal or confirms action
    ↓
User fills form / confirms
    ↓
Component calls Service function
    ↓
Service performs operation on mock data
    ↓
Service returns result
    ↓
Component updates state
    ↓
Table re-renders with new data
```

## Role-Based Access Control

```
┌─────────────────┐
│  User Login     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AuthContext     │
│ stores role     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Component checks role:          │
│  - user.role === 'Admin'         │
│  - hasRole(['Admin', 'Engineer'])│
│  - canEdit()                     │
│  - canManage()                   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Conditional Rendering:          │
│  - Show/Hide buttons             │
│  - Enable/Disable actions        │
│  - Display appropriate UI        │
└──────────────────────────────────┘
```

## File Organization

```
src/
├── pages/           → Route components (screens)
│   └── [Page]/      → Each page has its own folder
│       ├── Page.jsx → Component logic
│       └── Page.css → Component styles
│
├── components/      → Reusable components
│   └── [Component]/ → Each component has its own folder
│       ├── Component.jsx → Component logic
│       └── Component.css → Component styles
│
├── services/        → API abstraction layer
│   └── *.js        → Service files (no CSS)
│
├── context/         → React Context providers
│   └── *.jsx       → Context files
│
├── utils/           → Helper functions & constants
│   └── *.js        → Utility files
│
├── App.jsx         → Main app component with routing
└── main.jsx        → Entry point
```

## Technology Stack

```
┌─────────────────────────────────────┐
│          User Interface              │
│         (React Components)           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          State Management            │
│     (React Context + useState)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│            Routing                   │
│       (React Router v6)              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│            Services                  │
│      (API Abstraction)               │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          Data Source                 │
│    (Mock Data /  Backend)     │
└──────────────────────────────────────┘
```




