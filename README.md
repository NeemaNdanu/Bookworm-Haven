# The Gilded Page - Frontend Prototype

A modern, mobile-friendly online bookstore MVP built with React, Tailwind CSS, and Framer Motion.

## Features

- **Responsive Design**: Mobile-first layout with a clean, bookish aesthetic.
- **Product Browsing**: Filterable book grid with search functionality.
- **Shopping Cart**: Persistent cart state (using LocalStorage) with a slide-out drawer.
- **Authentication UI**: Login and Register forms with mock authentication flow.
- **Optimistic UI**: Instant feedback for cart actions and interactions.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS v4, Lucide Icons, Shadcn UI components
- **Routing**: Wouter
- **State Management**: React Context + LocalStorage
- **Animations**: Framer Motion

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the preview**:
    The app will be available at `http://localhost:5000` (or your Replit preview URL).

## Mock Data & limitations

This is a **Frontend-Only Prototype**.
-   **No Backend**: There is no real server or database connected.
-   **Data Persistence**: Cart data is saved to the browser's `localStorage`.
-   **Authentication**: Login accepts any email/password combination. It simulates a logged-in state in memory.
-   **Images**: Uses generated placeholder assets.

## Project Structure

-   `client/src/components`: UI components (BookCard, Header, CartDrawer)
-   `client/src/pages`: Page views (Home, BookDetail, Auth)
-   `client/src/context`: React Context for global state (Cart, Auth)
-   `client/src/lib/data.ts`: Mock book data and types


