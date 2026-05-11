# StudySphere Deployment Guide

## Frontend: Vercel

1. Set the project root to the repository root.
2. Build command: `npm run build`
3. Output directory:
   - Vite target: `dist`
   - Legacy CRA target: `build`
4. Environment variables:
   - `REACT_APP_BASE_URL=https://studysphere-api.onrender.com/api/v1`
   - `REACT_APP_RAZORPAY_KEY_ID=<razorpay_key_id>`

## Backend: Render

1. Root directory: `server`
2. Build command: `npm install`
3. Start command: `npm start`
4. Environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `ALLOWED_ORIGINS`
   - `CLOUD_NAME`
   - `API_KEY`
   - `API_SECRET`
   - `FOLDER_NAME`
   - `RAZORPAY_KEY`
   - `RAZORPAY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
   - `MAIL_HOST`
   - `MAIL_USER`
   - `MAIL_PASS`
   - `REDIS_URL` optional

## MongoDB Atlas

1. Create a cluster.
2. Add database user and IP allowlist.
3. Use the connection string in `MONGODB_URI`.
4. Recommended indexes:
   - `users.email` unique.
   - `orders.user + createdAt`.
   - `payments.razorpayPaymentId` unique sparse.
   - `messages.roomId + createdAt`.
   - `leaderboards.scope + xp`.

## Razorpay Webhook

Webhook URL:

`https://studysphere-api.onrender.com/api/v1/payment/webhook`

Events:

- `payment.captured`
- `payment.failed`
- `refund.processed`
- `subscription.activated`
- `subscription.charged`
- `subscription.cancelled`

Use a strong webhook secret and place it in `RAZORPAY_WEBHOOK_SECRET`.
