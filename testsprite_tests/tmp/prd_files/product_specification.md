# NaikApa - Product Specification Document (PSD)

## 1. Product Overview
**NaikApa** is a modern, responsive web-based platform tailored for daily commuters in the Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) area. The application solves the complex problem of navigating heavy traffic and uncoordinated public transit by providing **multi-modal route comparisons**. Users can discover, compare, and theoretically book the most efficient routing combinations (e.g., combining Ride-hailing with KRL Commuter lines) optimized for time, cost, and convenience.

## 2. Core Features
- **Smart Multi-Modal Routing**: Accepts Origin and Destination inputs to generate diverse routing options such as:
  - Fastest Combinations (Ojek + KRL/MRT)
  - Pure Ride-Hailing (Motor/Mobil)
  - Personal Vehicle (Bensin + Tol estimations)
- **Real-Time Data Aggregation (Simulated)**: A backend abstraction layer designed to concurrently fetch data from mapping providers (Google Maps/Mapbox), transit APIs (Trafi), and Ride-hailing providers (Gojek/Grab).
- **Step-by-Step Navigation Interface**: A detailed timeline view giving users step-by-step transitions between walking, taking public transit, and taking an online taxi.
- **Integrated Booking CTA**: Actionable prompts allowing premium users to book ride-hailing transit without leaving the interface.
- **Authentication & User Profiles**: Secure login system preserving user search histories and tracking mock bookings.

---

## 3. Technical Architecture

The application strictly follows a Client-Server Full-Stack architecture bundled within a unified codebase to prioritize rapid prototyping and deployment efficiency.

### 3.1. Frontend (Client)
- **Framework**: Next.js 14.2 (App Router)
- **Styling**: Tailwind CSS v3
- **Component Library**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Design Paradigm**: Implements dynamic, animated hero components (Custom SVGs) and dark-mode capable glassmorphism elements to provide a premium UX.

### 3.2. Backend (Server API)
- **Framework**: Next.js Serverless API Routes
- **Authentication**: **Better Auth** library supporting OAuth (Google) and Email/Password.
- **Database Engine**: Local **SQLite** utilizing `better-sqlite3`.
- **ORM**: **Drizzle ORM** for type-safe schema definitions and rapid local development.

---

## 4. API Route Specifications

The application relies on Next.js API endpoints to obfuscate external third-party API keys and synthesize concurrent aggregations.

### `GET /api/routes`
- **Purpose**: Proxies and aggregates routing data based on the user's origin and destination.
- **Query Params**: `origin` (string), `destination` (string).
- **Behavior**: 
  1. Instantly logs the requested query mapped to the user (or as an anonymous search) in the `search_histories` database.
  2. Spawns concurrent `Promise.all` requests polling mocked endpoints for Google Maps, Trafi, and Ride-Hailing APIs to determine metrics like congestion and transit availability.
  3. Returns formatted uniform routing objects.

### `POST /api/bookings`
- **Purpose**: Simulates the transactional process of confirming a ride-booking.
- **Payload Request**: `{ provider: "Gojek", estimatedCost: 15000, routeId: "r1" }`
- **Behavior**:
  1. Handles artificial network delay to represent 3rd-party webhook confirmations.
  2. Inserts a "Success" status log into the SQLite `bookings` table.

---

## 5. Database Schema Models

The database is built locally (`sqlite.db`) and managed by Drizzle Kit. It utilizes the following entity relationship mappings:

### `users` / `sessions` / `accounts`
Standardized tables explicitly managed and configured by the Better Auth framework storing encrypted credentials and active JWT validation constraints.

### `search_histories`
Records analytical user intent to provide historical auto-fill mapping.
- `id` (PK, string, uuid)
- `user_id` (FK, string)
- `origin` (string)
- `destination` (string)
- `preferred_mode` (string)
- `created_at` (timestamp)

### `bookings`
Handles the transactional mock-state of ride-hailing interactions directly initiated via the platform.
- `id` (PK, string, uuid)
- `user_id` (FK, string)
- `provider` (string)
- `status` (string Enum: Pending, Success, Failed)
- `estimated_cost` (real)
- `created_at` (timestamp)

---

## 6. Future Deployment & Roadmap
1. **Third-Party API Replacements**: Swap the internal `Promise.all` timeouts in `/api/routes` with authenticated `fetch` requests pointing to production APIs (e.g., Google Directions API, Trafi SDK).
2. **Cloud Migration**: Migrate `sqlite.db` to a serverless robust database like Turso (LibSQL) or PostgreSQL (Supabase) for production scalability.
3. **PWA Integration**: Compile the Next.js routes with Next-PWA plugins to allow native app installations for mobile commuters without traversing the App Store.
