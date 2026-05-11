const express = require("express");
const app = express();

app.set("trust proxy", 1);

const http = require("http");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const wishlistRoutes = require("./routes/Wishlist");
const platformRoutes = require("./routes/platform/Platform");
const adminRoutes = require("./routes/admin/Admin");

const { handleWebhook } = require("./controllers/Payments");

const database = require("./config/database");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const xss = require("xss-clean");

const { cloudinaryConnect } = require("./config/cloudinary");

const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

// DATABASE CONNECTION
database.connect();

// SECURITY MIDDLEWARES
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan("tiny"));

// RATE LIMITER
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// RAZORPAY WEBHOOK
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

// BODY PARSER
app.use(express.json());

// COOKIE PARSER
app.use(cookieParser());

// CORS CONFIGURATION
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// FILE UPLOAD
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// CLOUDINARY CONNECTION
cloudinaryConnect();

// API ROUTES
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/platform", platformRoutes);
app.use("/api/v1/admin", adminRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// SOCKET.IO SETUP
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

app.set("io", io);

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_room", ({ roomId }) => {
    if (roomId) {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    }
  });

  socket.on("chat_message", ({ roomId, message }) => {
    if (!roomId || !message) return;

    io.to(roomId).emit("chat_message", {
      message,
      ts: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// START SERVER
server.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});