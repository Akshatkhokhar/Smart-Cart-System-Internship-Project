# SmartCart - Premium E-Commerce Application

## Project Overview

SmartCart is a modern, production-ready e-commerce shopping cart application built with **React.js**, **Redux Toolkit**, and **Vite**. It features a complete product catalog with search, filtering, and sorting, a fully functional cart with quantity management, and a smart checkout page with dynamic discount calculations. The application demonstrates modern React patterns including lazy loading, state management with Redux Toolkit, and responsive mobile-first design using Tailwind CSS.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **Redux Toolkit** — State management
- **React Router DOM v6** — Routing
- **Tailwind CSS 3** — Styling
- **React Hot Toast** — Toast notifications
- **React Icons** — Icon library

## Features Implemented

### Core Pages
- **Products Page** (`/`) — Grid layout with 50 products, search bar, category filter, and 4-way sorting
- **Cart Page** (`/cart`) — Quantity controls (1-10), remove items, bulk purchase badge at qty ≥ 5
- **Checkout Page** (`/checkout`) — Full order summary with itemized discounts

### Discount System
- **Buy 2 Get 1 Free** — Custom rule: when qty ≥ 3 of the same product, 1 unit is free (applies per 3 units)
- **Cart Discount** — 5% off when cart exceeds ₹5,000 (user must toggle to apply)
- **Product Discount** — 10% off on 3+ units of the same product (only when B2G1 is not active)

### UI & UX
- **Search** — Real-time product name search
- **Category Filtering** — Filter by Electronics, Fashion, Groceries, Home, Sports
- **Sorting** — Price Low/High, Name A-Z/Z-A
- **Dark Mode** — Toggle with localStorage persistence
- **Toast Notifications** — Bottom-right notifications for cart actions and orders
- **Responsive Design** — Mobile-first grid layout (1-4 columns)
- **Loading Skeletons** — Animated skeleton placeholders during data loading

### Performance
- **Lazy Loading** — All pages loaded via `React.lazy()` + `Suspense` (separate chunks)
- **React.memo** — All reusable components wrapped with memo
- **useMemo** — Memoized filtered products, cart totals, and discount calculations
- **useCallback** — Stable function references for event handlers

### State Management
- **3 Redux Slices**: `productsSlice`, `cartSlice`, `uiSlice`
- **localStorage Persistence** — Cart items and dark mode preference saved across sessions

### Reusable Components
- `Navbar`, `ProductCard`, `CartItem`, `Badge`, `Button`, `Loader`, `SearchBar`, `FilterPanel`, `CheckoutSummary`, `EmptyState`

## Assumptions Made

1. **Prices in INR (₹)** — All prices are in Indian Rupees as per the requirement specification
2. **Unsplash Images** — Product images are sourced from Unsplash and may change if the upstream CDN URLs become invalid
3. **Single-Currency** — No multi-currency or currency conversion support
4. **No Authentication** — No user login or session management; cart is tied to the browser via localStorage
5. **Static Product Data** — Products are loaded from a local JSON file rather than an API
6. **No Payment Gateway** — Checkout ends at order confirmation; no actual payment processing
7. **B2G1 per Product** — The Buy 2 Get 1 Free rule applies per product line item, not across different products
8. **Cart Discount Opt-In** — The 5% cart discount requires explicit user action (toggle button), not auto-applied
9. **Max Quantity 10** — Per the requirement, quantity is capped at 10 units per product

## Challenges Faced

1. **Unsplash Image Reliability** — Many Unsplash photo IDs returned 404 errors. Each of the 50 product images was individually HTTP HEAD-verified to ensure they load correctly. Multiplle rounds of testing and replacement were needed.

2. **Discount Rule Conflicts** — The 10% product discount (3+ units) and Buy 2 Get 1 Free both trigger at qty ≥ 3. Stacking them produced confusing checkout summaries. Resolved by making them mutually exclusive — B2G1 takes precedence when active.

3. **B2G1 Logic Interpretation** — "Buy 2 Get 1 Free" had two interpretations: (a) flat 50% off at qty 2, or (b) 1 free unit per every 3 purchased. Went with (b) as it matches standard retail B2G1 semantics.

4. **Cart Discount Toggle UX** — Making the 5% cart discount opt-in required threading a boolean flag through the discount calculation pipeline without introducing side effects.

5. **localStorage Synchronization** — Ensuring cart state in Redux stays in sync with localStorage across page refreshes required careful init logic in the cart slice.

6. **Dark Mode Flicker** — Preventing a flash of unstyled content on page load required applying the dark class before React hydrates.

## Known Issues

1. **Product Images** — Images are sourced from Unsplash free tier. If Unsplash changes their CDN URLs or rate-limits, images may break. No error fallback image is shown.

2. **No Persistent Cart Discount State** — The cart discount toggle resets to disabled on page refresh (not saved to localStorage). This is intentional as the discount requires explicit user opt-in per session.

3. **No Stock Validation on Checkout** — Stock levels are not decremented when an order is placed. Products can be added to cart even if another session already exhausted stock (since data is static JSON).

4. **No Form Validation** — Checkout page has no address/payment form; it confirms the order immediately with no input validation.

5. **Mobile Navbar** — The navbar does not collapse into a hamburger menu on very small screens; links remain visible.

6. **Cart Item Image Loading** — Cart item images are not lazy-loaded and may impact performance on slow connections.

7. **Empty States Edge Case** — When all products are filtered out by search, the "No products found" message appears but no suggestion to clear filters is shown.

## Future Improvements

1. **Backend Integration** — Replace local JSON with a REST API or GraphQL backend with real product data, inventory management, and order persistence.

2. **Payment Gateway** — Integrate Stripe, Razorpay, or similar for real payment processing.

3. **User Authentication** — Add login/registration with JWT-based auth and user-specific carts.

4. **Wishlist** — Allow users to save products to a wishlist.

5. **Product Reviews & Ratings** — Add star ratings and review submissions.

6. **Advanced Filtering** — Add price range slider, multi-category select, and stock availability toggle.

7. **Infinite Scroll / Pagination** — Replace the single-page grid with paginated or infinite-scroll product listing.

8. **Image Fallback** — Show a placeholder image when a product image fails to load.

9. **Animations** — Add page transition animations with Framer Motion for smoother navigation.

10. **Unit Tests** — Add Jest + React Testing Library tests for components, slices, and utility functions.

11. **Accessibility** — Improve ARIA labels, keyboard navigation, and screen reader support.

12. **PWA Support** — Convert to a Progressive Web App with offline support and install prompt.

13. **Email Confirmation** — Send order confirmation emails after successful checkout.

14. **Multi-Currency** — Support currency switching (USD, EUR, etc.) with live exchange rates.

15. **Admin Dashboard** — Separate admin panel for managing products, viewing orders, and tracking inventory.

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd smart-cart

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
smart-cart/
├── public/
│   └── vite.svg
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── CartItem.jsx
│   │   ├── CheckoutSummary.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── SearchBar.jsx
│   ├── data/
│   │   └── products.json  # 50 products with verified images
│   ├── pages/
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   └── CheckoutPage.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── productsSlice.js
│   │       ├── cartSlice.js
│   │       └── uiSlice.js
│   ├── utils/
│   │   └── discounts.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── AI_USAGE.md
```

## Discount Rules Summary

| Rule | Condition | Discount | Applied |
|---|---|---|---|
| Buy 2 Get 1 Free | Qty ≥ 3 of same product | 1 unit free per 3 purchased | Auto |
| Cart Discount | Total > ₹5,000 after other discounts | 5% off | User toggle |
