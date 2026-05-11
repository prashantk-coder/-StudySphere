# StudySphere Architecture

StudySphere is a premium MERN EdTech SaaS platform for cohort learning, self-paced courses, gamified practice, instructor analytics, and admin operations.

## 1. Complete Project Architecture

```txt
StudySphere
├── src/                         # React UI, Redux, feature pages, reusable components
│   ├── assets/                  # Static images, logos, videos
│   ├── components/              # Shared and domain UI components
│   ├── context/                 # Theme and app-level contexts
│   ├── data/                    # Navigation and mock UI data
│   ├── hooks/                   # Reusable React hooks
│   ├── pages/                   # Route-level pages
│   ├── reducer/                 # Redux root reducer
│   ├── services/                # Axios connector, API constants, operations
│   ├── slices/                  # Redux Toolkit feature slices
│   └── utils/                   # Date/rating constants and helpers
├── server/                      # Express API
│   ├── config/                  # DB, Cloudinary, Razorpay config
│   ├── controllers/             # MVC controllers by domain
│   ├── mail/                    # Transactional email templates
│   ├── middlewares/             # Auth, roles, validation, upload, security
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # REST route modules
│   └── utils/                   # Mail, upload, formatting helpers
├── docs/                        # Architecture, APIs, deployment guide
├── public/                      # Static public assets
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 2. Frontend Folder Structure

```txt
src/
├── components/
│   ├── common/                  # Navbar, Footer, modal, buttons, ratings
│   ├── core/
│   │   ├── Auth/                # Login/signup/private route components
│   │   ├── Catalog/             # Course discovery cards and sliders
│   │   ├── Course/              # Course detail accordions/cards
│   │   ├── Dashboard/           # Student/instructor/admin shell modules
│   │   ├── HomePage/            # Hero, showcase, reviews
│   │   └── ViewCourse/          # Video player, sidebar, review modal
│   └── ui/                      # GlassCard, Skeleton, future design primitives
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── CourseDetails.jsx
│   ├── ViewCourse.jsx
│   ├── Dashboard.jsx
│   ├── Wishlist.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── VerifyEmail.jsx
│   ├── ForgotPassword.jsx
│   └── UpdatePassword.jsx
├── services/
│   ├── apiconnector.js
│   ├── apis.js
│   └── operations/
├── slices/
└── context/
```

Recommended next frontend modules:

- `features/student`: planner, notes, streaks, certificates, purchases.
- `features/instructor`: analytics, quiz builder, course approvals.
- `features/admin`: moderation, revenue, users, course approvals.
- `features/realtime`: notifications, chat, forum, whiteboard rooms.
- `features/gamification`: XP, badges, leaderboard, challenges.

## 3. Backend Folder Structure

```txt
server/
├── config/
│   ├── database.js
│   ├── cloudinary.js
│   └── razorpay.js
├── controllers/
│   ├── Auth.js
│   ├── Course.js
│   ├── Payments.js
│   ├── Profile.js
│   ├── admin/
│   │   └── adminController.js
│   └── platform/
│       └── platformController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Section.js
│   ├── SubSection.js
│   ├── RatingAndRaview.js
│   ├── Order.js
│   ├── Payment.js
│   ├── Notification.js
│   ├── Message.js
│   ├── QuizAttempt.js
│   ├── Certificate.js
│   ├── Leaderboard.js
│   ├── Badge.js
│   ├── Challenge.js
│   └── Subscription.js
└── routes/
    ├── User.js
    ├── Course.js
    ├── Payments.js
    ├── Profile.js
    ├── admin/
    │   └── Admin.js
    └── platform/
        └── Platform.js
```

## 4. Database Schema Design

| Collection | Purpose |
| --- | --- |
| `users` | Student, instructor, admin accounts with JWT auth, Google OAuth metadata, refresh token hash, profile links, wishlist, enrolled courses, gamification counters. |
| `profiles` | Extended bio, image, DOB, gender, contact, social links. |
| `courses` | Course shell, pricing, instructor, sections, reviews, students, approval status, level, language, subscription eligibility. |
| `sections` | Ordered modules inside a course. |
| `subsections` | Lectures, Cloudinary video/document URLs, duration, previews, downloadable resources. |
| `ratingandreviews` | Course reviews and ratings. |
| `orders` | Razorpay course cart order records, invoice metadata, item snapshots. |
| `payments` | Razorpay payment captures, verification status, refunds, webhook events. |
| `subscriptions` | Razorpay subscription plans, cycle status, current period, user and plan metadata. |
| `notifications` | Real-time and email notification records. |
| `messages` | Live chat and discussion forum messages by room/course. |
| `quizattempts` | Quiz answers, scoring, pass/fail, time spent. |
| `certificates` | Issued certificates with verification codes and certificate URLs. |
| `leaderboards` | XP rankings scoped globally, by course, or by challenge. |
| `badges` | Badge catalog and earned user references. |
| `challenges` | Daily/weekly learning challenges and rewards. |

## 5. API Routes Structure

### Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/sendotp`
- `POST /api/v1/auth/reset-password-token`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/google`
- `POST /api/v1/auth/refresh-token`

### Courses
- `GET /api/v1/course/getAllCourses`
- `POST /api/v1/course/createCourse`
- `POST /api/v1/course/editCourse`
- `DELETE /api/v1/course/deleteCourse`
- `POST /api/v1/course/addSection`
- `POST /api/v1/course/addSubSection`
- `POST /api/v1/course/updateCourseProgress`

### Razorpay Payments
- `POST /api/v1/payment/capturePayment` legacy course order creation.
- `POST /api/v1/payment/orders` production course order creation.
- `POST /api/v1/payment/verifyPayment` legacy verification.
- `POST /api/v1/payment/verify` production signature verification.
- `POST /api/v1/payment/webhook` secure Razorpay webhook receiver.
- `POST /api/v1/payment/subscriptions` create Razorpay subscription.
- `POST /api/v1/payment/subscriptions/:subscriptionId/cancel` cancel subscription.
- `GET /api/v1/payment/history` purchase/subscription history.
- `POST /api/v1/payment/refunds` create a refund.
- `GET /api/v1/payment/invoices/:orderId` invoice payload.

### Platform
- `GET /api/v1/platform/notifications`
- `POST /api/v1/platform/notifications/read`
- `POST /api/v1/platform/messages`
- `GET /api/v1/platform/messages/:roomId`
- `POST /api/v1/platform/quiz-attempts`
- `POST /api/v1/platform/certificates`
- `GET /api/v1/platform/leaderboard`
- `GET /api/v1/platform/challenges/today`

### Admin
- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:userId/status`
- `GET /api/v1/admin/courses/pending`
- `PATCH /api/v1/admin/courses/:courseId/approval`
- `GET /api/v1/admin/payments`

## 6. Complete UI Pages List

Public:
- Home, Catalog, Course Detail, About, Contact, Login, Signup, Verify Email, Forgot Password, Reset Password.

Student:
- Dashboard overview, My Learning, Continue Watching, Course Player, Notes, Bookmarks, Wishlist, Cart, Checkout Result, Purchase History, Certificates, Planner, Pomodoro, Challenges, Leaderboard, Profile, Settings.

Instructor:
- Dashboard overview, My Courses, Course Builder, Section/Lecture Builder, Quiz Builder, Upload Media, Reviews, Revenue Analytics, Student Insights, Earnings, Course Approval Status, Profile.

Admin:
- Analytics, Users, Courses, Approval Queue, Payment Monitoring, Revenue, Reports/Moderation, Notifications, Settings.

Realtime/Community:
- Notifications Center, Course Discussion Forum, Direct/Room Chat, Collaborative Whiteboard, Interview Coding Room.

## 7. Module Build Order

1. Platform foundation: Vite app shell, theme, design tokens, API connector.
2. Backend hardening: security middleware, error wrappers, schema completion, route contracts.
3. Auth: OTP, JWT, refresh tokens, Google OAuth.
4. Course marketplace: catalog, filters, course detail, wishlist, cart.
5. Razorpay: orders, verification, webhooks, subscriptions, invoices, refunds.
6. Learning experience: video progress, notes, bookmarks, certificates.
7. Instructor studio: course builder, quiz management, analytics.
8. Admin console: users, approvals, revenue, moderation.
9. Realtime: notifications, chat, forum, whiteboard.
10. Gamification: XP, badges, streaks, leaderboard, daily challenges.
11. Production: Docker, CI/CD, deployment guides, SEO/PWA.
