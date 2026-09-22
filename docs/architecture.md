# Project Analysis and Architecture

## 1. Existing Project Analysis

The repository started as an empty workspace with the project overview document as the only source of requirements. There was no existing frontend or backend code, so the implementation was built from a clean scaffold that matches the requested hospitality platform structure.

## 2. Proposed Architecture

### Customer portal

- Luxury hospitality brand experience
- Search, browse and book rooms, packages, tours, dining, wellness, and transport
- My Trips, profile management, previous visits, and rebooking flow
- Responsive design for desktop, tablet, and mobile devices
- Frontend delivered in Next.js App Router for a production-ready shell

### Admin portal

- Dashboard with KPIs and operational summaries
- Reservation and booking management
- Hotel, restaurant, tours, transport, wellness, and package sections
- Payment, reports, staff, settings, and audit access

### Backend

- Django + DRF service-oriented architecture
- App-level separation for each business domain
- Shared business services for pricing, availability, itinerary, and bookings
- PostgreSQL-compatible / MariaDB-ready schema with ORM-driven design

## 3. Database ERD / Design

Key entities:

- Hotel
- RoomType
- Room
- Customer
- Traveler
- Booking
- BookingItem
- Payment
- Reservation
- RestaurantTable
- MenuItem
- Tour
- Activity
- Vehicle
- ServiceAppointment
- Package
- PackageComponent
- Coupon
- AuditLog

Relationships include:

- One hotel to many room types and rooms
- One customer to many bookings and travelers
- One booking to many booking items and payments
- One room type to many rooms
- One tour/activity to many bookings
- One package to many components
- One service appointment to one therapist/customer/traveler

## 4. Django App Structure

```
backend/
├── apps/
│   ├── accounts
│   ├── hotels
│   ├── rooms
│   ├── restaurants
│   ├── bar
│   ├── tours
│   ├── transportation
│   ├── wellness
│   ├── packages
│   ├── bookings
│   ├── pricing
│   ├── payments
│   ├── inventory
│   ├── notifications
│   ├── reviews
│   ├── reports
│   ├── coupons
│   └── audit
├── common/
│   ├── exceptions
│   ├── permissions
│   ├── pagination
│   ├── validators
│   ├── utilities
│   └── responses
├── config/
│   ├── settings
│   ├── urls.py
│   ├── asgi.py
│   ├── wsgi.py
│   └── celery.py
├── manage.py
├── requirements.txt
└── .env.example
```

## 5. React Application Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common
│   │   ├── layout
│   │   ├── booking
│   │   ├── hotel
│   │   ├── restaurant
│   │   ├── bar
│   │   ├── tours
│   │   ├── transportation
│   │   ├── wellness
│   │   ├── packages
│   │   ├── payments
│   │   ├── dashboard
│   │   └── admin
│   ├── pages/
│   │   ├── auth
│   │   ├── customer
│   │   └── admin
│   ├── services
│   ├── stores
│   ├── hooks
│   ├── utils
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── index.html
└── .env.example
```

## 6. API Architecture

The API is organized under `/api/v1/` and follows REST semantics with consistent response shapes:

- `success`: boolean
- `message`: human-readable response
- `data`: payload for successful requests
- `errors`: validation or business-rule details for failures

This project uses DRF, JWT auth, and OpenAPI docs via drf-spectacular.

## 7. Booking Lifecycle

```text
DRAFT
  → PENDING_PAYMENT
  → PAYMENT_FAILED / CONFIRMED
  → CHECKED_IN / IN_PROGRESS / COMPLETED
  → CANCELLATION_REQUESTED / CANCELLED / REFUND_PENDING / REFUNDED
```

Booking flow includes validation, availability check, price calculation, payment authorization, confirmation, and post-booking history tracking.

## 8. Pricing Architecture

The pricing engine is treated as a core service, not a UI calculation.

Key responsibilities:

- room pricing
- age-based pricing
- group discount rules
- bulk tier discount logic
- component modifiers and upgrades
- tax and coupon application
- package price calculation
- reschedule adjustment pricing
- cancellation refund engine

## 9. Availability and Locking Architecture

The availability layer validates room, table, tour, spa, vehicle, and inventory constraints using:

- database transaction boundaries
- inventory locks
- Redis-based temporary reservation locks
- final availability verification before confirmation

## 10. Implementation Phases

1. Project setup and scaffolding - completed
2. Authentication and RBAC - completed
3. Hotel and room foundations - completed
4. Booking and hotel reservation engine - in progress
5. Restaurant and bar modules - pending
6. Tours and transport modules - pending
7. Wellness and spa modules - pending
8. Pricing engine and package builder - pending
9. Unified booking wizard and payments - pending
10. Real-time inventory, reschedule and refund layers - pending
11. Reports, notifications, and admin analytics - pending
12. Testing, security review, and performance tuning - ongoing

## 11. Current State

The repository is now running on a verified Next.js frontend and Django backend foundation. The hotel and room data layer is implemented and validated, with the next workstream focused on the booking engine and pricing services.
