# Ollie Shearing - Portfolio Site

A personal portfolio and photo gallery web app built with React and Firebase.

## Features

- **Home**: Bio, contact links, and resume download/upload
- **Gallery**: Photo grid with upload, delete, and EXIF location/date overlay on hover. Supports JPEG, PNG, and NEF (RAW) files
- **Projects**: Video clip cards linking to GitHub repositories, with hover-to-play previews
- **Auth**: Firebase email/password login gates all write operations (upload, delete). Public visitors can view everything

## Tech Stack

- [React](https://reactjs.org/) (Create React App)
- [Firebase](https://firebase.google.com/) — Firestore, Storage, Authentication
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [React Router](https://reactrouter.com/) — Client-side routing
- [exifr](https://github.com/MikeKovarik/exifr) — EXIF/GPS extraction from images and RAW files

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root with your Firebase config:
   ```
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   ```

3. Start the dev server:
   ```bash
   npm start
   ```
