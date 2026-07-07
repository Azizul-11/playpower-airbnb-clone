# Airbnb Clone - Playpower Labs Take-Home Task

A pixel-perfect, highly responsive clone of the Airbnb Listing Page, built with modern web technologies and AI-assisted workflows. 

## 🌟 Key Features Implemented
* **Pixel-Perfect UI:** Exact spacing, typography, and layout matching the reference.
* **Photo Tour & Lightbox:** Fully functional overlays using `framer-motion` for smooth, native-feeling transitions. Keyboard navigation and focus management included.
* **Dynamic AI Integration:** The "Host Highlight" section dynamically generates real-time copywriting using Groq (Llama 3) based on the listing's amenities and description.
* **Resilient Data Layer:** Connects to a Supabase (PostgreSQL) database dynamically, with built-in fallbacks to ensure the UI never breaks if the database is unreachable.

## 🏗️ Tech Stack

### Frontend
* **Core:** React, Vite, JSX
* **Styling:** Tailwind CSS v4 
* **Motion/Animations:** Framer Motion 
* **Icons:** Lucide React

### Backend (Microservice Architecture)
* **Core:** Node.js, Express (ES Modules)
* **Database:** Supabase (PostgreSQL via `@supabase/supabase-js`)
* **AI Integration:** Groq SDK (`llama-3.1-8b-instant`)

## 🚀 How to Run Locally

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env` and add your Groq and Supabase credentials.
4. Start the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env`.
4. Start the Vite server: `npm run dev`

## 📂 Architecture Diagram
Please see `Airbnb_Clone_Architecture.png` in the root directory for the High-Level Design (HLD) mapping out the production scaling strategy (CDN, API Gateway, Microservices, and caching).