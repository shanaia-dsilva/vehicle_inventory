# Vehicle Inventory Management System

## Project Overview
A web-based vehicle inventory management system with dual seat capacity filtering (exact match and editable range) using your existing MySQL schema structure but implemented with SQLite for easy deployment on Replit.

## User Preferences
- Preferred tech stack: HTML, CSS, JavaScript (vanilla)
- Database: SQLite (matching existing MySQL schema)
- Backend: Node.js with Express
- Simple, clean UI without complex frameworks

## Project Architecture
- **Backend**: Node.js/Express REST API
- **Database**: SQLite with schema matching user's MySQL structure
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Deployment**: Single-click Replit deployment

## Database Schema
Based on user's existing MySQL schema:
- sl_no: Primary key, auto-increment
- reg_no: Vehicle registration number
- make: Vehicle manufacturer
- model: Vehicle model
- mfg_year: Manufacturing year
- reg_date: Registration date
- entity_name: Entity/owner name
- running_site: Site where vehicle operates
- engine_no: Engine number
- chassis_no: Chassis number
- seat_capacity: Number of seats
- vehicle_type: Bus/Winger/TT
- ac_status: 0=Non-AC, 1=AC

## Key Features
- Dual seat capacity filtering (exact match + min/max range)
- AC/Non-AC filtering
- Vehicle type filtering
- Vehicle age calculation from manufacturing year
- Add new vehicles form
- Responsive table display

## Recent Changes
- Project initialization (July 07, 2025)
- Schema design matching user's MySQL structure