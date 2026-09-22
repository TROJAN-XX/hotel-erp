# Hotel ERP & Hospitality Platform

This repository contains a full-service hospitality platform for hotel operations, travel, dining, wellness, package bookings, and admin operations.

## Current stack

- Frontend: Next.js 14 app-router with React 18
- Backend: Django 4 + Django REST Framework
- Auth: JWT with Django custom user model
- Database: SQLite by default, MySQL-ready configuration via .env
- API docs: drf-spectacular

## Structure

- `frontend/` - Next.js customer and admin portal
- `backend/` - Django + DRF backend services
- `docs/` - architecture and implementation notes
- `OVERVIEW.md` - product specification and phase roadmap

## Getting started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Phase status

### Phase 1 - Authentication foundation: completed

- Custom email-based auth model
- JWT login, registration, refresh, and profile endpoints
- Verified with Django API tests

### Phase 2 - Hotel and room foundation: completed

- Hotel master data model with star rating, location, and operation times
- Room type and room inventory models
- Hotel and room listing API endpoints
- Verified with Django API tests

### Phase 3 - Booking and reservation engine: completed

- Reservation workflow
- Booking and guest record creation
- Hotel room booking API flow
- Verified with Django API tests

### Phase 4 - Pricing and package engine: completed

- Dynamic pricing rules
- Package catalog with pricing metadata
- Rule list/detail API endpoints
- Verified with Django API tests

### Phase 5 - Restaurant and bar modules: completed

- Restaurant table and menu catalog APIs
- Bar table and bar menu catalog APIs
- Dining service foundation for future reservations and inventory-aware flows
- Verified with Django API tests

### Phase 6 - Tours and transport modules: next

- Destination and tour catalog
- Transport service and tour booking flows
- Vehicle and itinerary foundations

## Notes

The project is now implemented as a Next.js frontend and Django API backend, with hotel, booking, pricing, and dining foundations validated. The next milestone is tours and transport operations.
