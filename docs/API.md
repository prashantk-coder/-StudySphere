# StudySphere API Documentation

Base URL: `http://localhost:4000/api/v1`

Authentication: protected routes require `Authorization: Bearer <accessToken>` or the existing `token` cookie.

## Razorpay

### Create Course Order

`POST /payment/orders`

```json
{
  "courses": ["64f..."],
  "couponCode": "LAUNCH20"
}
```

Response contains the Razorpay order, StudySphere order id, currency, and amount in paise.

### Verify Payment

`POST /payment/verify`

```json
{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "signature",
  "courses": ["64f..."]
}
```

The backend verifies the HMAC SHA256 signature with `RAZORPAY_SECRET`, records a payment, enrolls the student, and sends confirmation email.

### Webhook

`POST /payment/webhook`

Razorpay must send the raw JSON body and `x-razorpay-signature`. Configure the webhook secret as `RAZORPAY_WEBHOOK_SECRET`.

Handled events:

- `payment.captured`
- `payment.failed`
- `refund.processed`
- `subscription.activated`
- `subscription.charged`
- `subscription.cancelled`

### Subscriptions

`POST /payment/subscriptions`

```json
{
  "planId": "plan_...",
  "planName": "StudySphere Pro",
  "totalCount": 12,
  "notes": {
    "source": "dashboard"
  }
}
```

`POST /payment/subscriptions/:subscriptionId/cancel`

### Refunds

`POST /payment/refunds`

```json
{
  "paymentId": "pay_...",
  "amount": 49900,
  "reason": "Duplicate purchase"
}
```

Admin-only endpoint. Amount is in paise.

### History And Invoice

- `GET /payment/history`
- `GET /payment/invoices/:orderId`

## Platform

- `GET /platform/notifications`
- `POST /platform/notifications/read`
- `POST /platform/messages`
- `GET /platform/messages/:roomId`
- `POST /platform/quiz-attempts`
- `POST /platform/certificates`
- `GET /platform/leaderboard`
- `GET /platform/challenges/today`

## Admin

- `GET /admin/analytics`
- `GET /admin/users`
- `PATCH /admin/users/:userId/status`
- `GET /admin/courses/pending`
- `PATCH /admin/courses/:courseId/approval`
- `GET /admin/payments`
