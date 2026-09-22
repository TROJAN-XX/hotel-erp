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

### Phase 3 - Booking and pricing engine: next

- Reservation workflow
- Availability checks
- Pricing rules and dynamic package pricing

## Notes

The project is now implemented as a Next.js frontend and Django API backend, with the core hotel domain foundation active and ready for the next booking and pricing phase.
