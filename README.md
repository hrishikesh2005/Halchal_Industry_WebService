# Halchal Industries — AI-Powered Irrigation Pipe E-Commerce Platform

A full-stack e-commerce platform for an HDPE irrigation pipe manufacturer, built as a final year
engineering project. It combines a customer storefront with an ML-driven dynamic pricing engine,
an admin operations dashboard, and GST-compliant billing.

## Features

- **AI dynamic pricing** — a Flask + scikit-learn (Random Forest) service predicts demand and
  computes a final ex-factory price per product, factoring in season, delivery zone, state-level
  adoption, and recent sales volume.
- **Storefront** — product browsing, live AI-priced quotes, cart (synced to MongoDB per session),
  and bulk-quantity discount tiers.
- **Checkout** — delivery address/phone/pincode capture, choice of **Cash on Delivery** or
  **Pay Online** (Razorpay, currently in test mode), and automatic GST calculation (12% under
  HSN 3917).
- **Admin dashboard** — stock management, order approval workflow (orders over 100 coils require
  manual approval), pricing approvals for AI-generated batches, contact message inbox, and
  per-order visibility into price/unit, GST, payment method, and delivery details.
- **Auth** — bcrypt-hashed passwords backed by MongoDB Atlas; separate customer and admin login
  flows.

## Tech stack

| Layer      | Technology                                              |
|------------|----------------------------------------------------------|
| Frontend   | React, React Router                                      |
| Backend    | Node.js, Express, Mongoose                                |
| Database   | MongoDB Atlas                                             |
| ML service | Python, Flask, scikit-learn (Random Forest)               |
| Payments   | Razorpay                                                  |

## Project structure

```
backend/
  server.js              # Express API — auth, products, cart, orders, payments
  model/                  # Mongoose schemas (User, Order, Cart, Stock, ApprovedPrice)
  utils/pricingEngine.js # Bulk-discount + GST calculation
  ml/                     # Flask ML API — Random Forest demand/price prediction
frontend/halchal-ai-ecommerce/
  src/pages/              # Customer-facing pages (Home, Products, Cart, Profile, ...)
  src/pages/admin/        # Admin dashboard pages (Orders, Stock, Pricing, Settings, ...)
  src/context/            # Auth, Cart, Theme React contexts
docs/                     # Project report, ERD, use case & class diagrams
```

## Getting started (local development)

Three services need to run side by side.

### 1. ML pricing API (port 5001)

```bash
cd backend/ml
python -m venv venv          # first time only
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python ml_api.py
```

### 2. Backend API (port 5000)

```bash
cd backend
npm install
cp .env.example .env         # then fill in real values
node server.js
```

Required environment variables (see [`backend/.env.example`](backend/.env.example)):

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API keys (test mode is fine for local dev) |

### 3. Frontend (port 3000)

```bash
cd frontend/halchal-ai-ecommerce
npm install
npm start
```

The frontend defaults to `http://localhost:5000` for the API — no extra config needed for local dev
(see [`src/config.js`](frontend/halchal-ai-ecommerce/src/config.js)).

## Documentation

Project report, ER diagram, use case diagram, and class diagram are in [`docs/`](docs/).
