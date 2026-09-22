# Hotel ERP & Hospitality Platform

This repository contains a project skeleton for a full-service hotel, travel, tourism, restaurant, bar, transportation, wellness, and package management platform.

## Structure

- `frontend/` - React + Vite customer/admin portal
- `backend/` - Django + DRF API project skeleton
- `docs/` - architecture and implementation notes

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
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Notes

This is a production-oriented skeleton with dummy pages and route layout to reflect the architecture described in the project overview.
