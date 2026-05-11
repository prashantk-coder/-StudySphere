# StudySphere

StudySphere is a production-oriented MERN EdTech platform inspired by Udemy, Coursera, Notion, Discord, and Duolingo. It supports course discovery, instructor course creation, student dashboards, gamification, realtime community features, Cloudinary media, JWT auth, OTP email verification, and complete Razorpay order/subscription infrastructure.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Redux Toolkit, Axios, React Router.
- Backend: Node.js, Express.js, MongoDB, Mongoose, Socket.io.
- Auth: JWT, OTP email verification, role middleware, refresh-token ready schema, Google OAuth ready schema.
- Payments: Razorpay course orders, payment verification, webhooks, subscriptions, invoices, refunds, purchase history.
- Media: Cloudinary.
- Production: Helmet, rate limiting, CORS, Mongo sanitize, XSS cleanup, Morgan logs, Docker, GitHub Actions.

## Architecture Docs

- [StudySphere Architecture](docs/STUDYSPHERE_ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Quick Start

```bash
npm install
cd server && npm install
cd ..
cp .env.example .env
cp server/.env.example server/.env
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:4000`

## Environment

Frontend `.env`:

```bash
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Backend `server/.env`:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/studysphere
JWT_SECRET=replace_me_with_a_strong_secret
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=studysphere
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
REDIS_URL=redis://localhost:6379
PORT=4000
```

## Scripts

```bash
npm start          # Vite frontend
npm run build      # production frontend build
npm run server     # backend dev server
npm run dev        # frontend + backend together
```

Backend scripts:

```bash
cd server
npm run dev
npm start
```

## Razorpay Flow

1. Student checks out with course ids.
2. Backend creates an `Order` and Razorpay order.
3. Frontend opens Razorpay Checkout.
4. Backend verifies `razorpay_order_id|razorpay_payment_id` with HMAC SHA256.
5. Backend records `Payment`, marks `Order` paid, enrolls the student, creates course progress, sends email, and exposes invoice data.
6. Razorpay webhooks keep payment, refund, and subscription states in sync.

## Core Domains

- Users, profiles, auth, roles.
- Courses, sections, subsections, reviews, progress.
- Wishlist, cart, course purchases.
- Orders, payments, refunds, subscriptions, invoices.
- Notifications, messages, quiz attempts, certificates.
- Leaderboards, badges, daily challenges.
- Admin analytics, users, approvals, payment monitoring.

## Deployment

- Frontend: Vercel.
- Backend: Render.
- Database: MongoDB Atlas.
- Media: Cloudinary.
- Payments: Razorpay dashboard and webhook setup.

See [Deployment Guide](docs/DEPLOYMENT.md).
