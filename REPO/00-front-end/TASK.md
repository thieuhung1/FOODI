# FOODI Front-End Development Task (AI-Optimized)

## 🎯 Project Overview
Build a production-ready front-end for FOODI - a modern food delivery web app. Mobile-first, performant, visually stunning with advanced animations.

**Target Metrics:**
- Lighthouse: 95+ Performance/Accessibility/Best Practices
- Bundle size: <150KB gzipped
- 60fps animations
- PWA capable

## 🛠️ Tech Stack (Optimal 2024)
```
Vite 5 + React 18 + TypeScript 5
Tailwind CSS 3 + Headless UI
Framer Motion 11 (animations)
React Router 6.23
Zustand 4 (state)
React Query 5 (API)
React Hot Toast 2 (notifications)
React Hook Form 7 + Zod (forms)
Lucide React (icons)
Class Variance Authority (CVA) + Tailwind Merge (component styling)
AOS 2 (scroll animations fallback)
```

## 📁 File Structure
```
REPO/00-front-end/
├── public/
│   ├── index.html
│   └── assets/ (images, icons)
├── src/
│   ├── assets/ (images, svgs)
│   ├── components/
│   │   ├── common/ (Button.Motion.tsx, Card.Animate.tsx, Modal.Transition.tsx)
│   │   ├── layout/ (Navbar.Animated.tsx, Hero.Scroll.tsx, Footer.tsx)
│   │   ├── ui/ (LoadingSkeleton.tsx, PageTransition.tsx, Input.Animate.tsx)
│   │   └── sections/ (Features.Scroll.tsx, MenuGrid.Animate.tsx)
│   ├── pages/
│   │   ├── Home/ (index.tsx - hero + scroll animations)
│   │   ├── Menu/ (MenuGrid.tsx + micro-interactions)
│   │   ├── Cart/ (Cart.Animate.tsx)
│   │   ├── Checkout/ (Form.Transitions.tsx)
│   │   ├── Profile/
│   │   └── Admin/
│   ├── hooks/ (useScrollAnimation.ts, useMicroInteraction.ts, useInView.ts)
│   ├── lib/ (utils.ts, cn.ts, animations.ts, api.ts)
│   ├── providers/ (QueryProvider.tsx, MotionProvider.tsx, ThemeProvider.tsx)
│   ├── store/ (cartStore.ts, userStore.ts)
│   ├── types/ (api.ts, components.ts)
│   ├── App.tsx
│   ├── main.tsx
│   └── globals.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ✨ Required Animations & Interactions (Mandatory)
### 1. Micro-interactions (Framer Motion)
```
- Button: scale 0.95 + spring on tap, glow on hover
- Cards: lift 4px + shadow on hover
- Inputs: underline expand + focus ring pulse
- Dropdowns: scale + opacity cascade
```

### 2. Scroll-triggered Animations
```
- Hero: parallax background + staggered title reveal
- Features: fade-up with delay stagger (0.1s each)
- Menu items: slide-in from sides + scale up
- Stats counters: animate on scroll into view
```

### 3. Loading & Transitions
```
- Skeleton loaders: shimmer effect (all data lists)
- Page transitions: scale + blur (AnimatePresence)
- Route changes: shared layout slide
- Infinite scroll: fade-in new items
```

## 🚀 Core Features Priority
```
P0: Routing, Home page (hero+menu preview), responsive layout
P1: Cart (add/remove, persist), User auth flow
P2: Checkout (forms+payment mock), Admin dashboard skeleton
P3: Search/Filter, Order history, Profile
```

## 🔌 Backend Integration (REPO/01-back-end/)
```
Endpoints expected:
/api/auth/login, /api/user/profile
/api/menu?category=string&search=string
/api/cart/add, /api/cart
/api/orders, /api/checkout
```

## 📋 Implementation Steps for AI Agent
1. **Setup**: `npm create vite@latest . -- --template react-ts`
2. **Dependencies**: Install exact versions from package.json spec below
3. **Tailwind + PostCSS**: Full setup with animation plugins
4. **Routing + Providers**: App.tsx wrapper
5. **Build components/ui**: Button, Card, Input with Motion variants
6. **Animations config**: MotionProvider + scroll hooks
7. **Pages**: Home → Menu → Cart → Checkout
8. **State + API**: Zustand stores + React Query
9. **Polish**: Skeleton loaders, error boundaries, SEO meta
10. **PWA**: vite-plugin-pwa config

## 📦 package.json Dependencies
```json
{
  "dev": ["vite", "tailwindcss", "autoprefixer", "@types/react", "@types/node"],
  "prod": ["react", "react-dom", "framer-motion", "react-router-dom", "zustand",
           "@tanstack/react-query", "react-hot-toast", "lucide-react",
           "class-variance-authority", "tailwind-merge", "clsx",
           "react-hook-form", "zod", "headlessui/react"]
}
```

## 🎨 Design Guidelines
- Color: Primary #FF6B35 (orange), Secondary #2D3436
- Typography: Inter (fonts.google.com)
- Spacing: Tailwind defaults + custom 18px rhythm
- Border radius: 12px (modern)
- Shadows: soft neumorphism

## ✅ Success Criteria
- [ ] `npm run dev` works, opens localhost:5173
- [ ] Mobile responsive (iPhone 12 viewport)
- [ ] All animations smooth 60fps
- [ ] Lighthouse 95+ scores
- [ ] Bundle analyzer <150KB
- [ ] TypeScript error-free
- [ ] README with screenshots + setup instructions

**AI Agent: Execute steps sequentially. Create TODO.md tracking progress. Test each major feature before proceeding.**

