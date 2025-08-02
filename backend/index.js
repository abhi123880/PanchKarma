import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import remedyRouter from "./routes/remedy.routes.js";

dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error(
      "Make sure your current IP address is whitelisted in your MongoDB Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-ip-allowlist/"
    );
    process.exit(1);
  });

// Define your frontend origin(s)
// IMPORTANT: Replace this URL with the actual URL of your Vercel frontend deployment
const frontendOrigin = 'https://panchkarma-dun.vercel.app/'; 

// Middleware
app.use(express.json());
app.use(cookieParser());

// --- CORRECTION STARTS HERE ---
// Correct CORS configuration to allow specific origins and credentials
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our allowed list
    if (origin === frontendOrigin || origin === localOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Crucial for allowing cookies and Authorization header
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// --- CORRECTION ENDS HERE ---

// Log every incoming request - for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from Origin: ${req.headers.origin || 'unknown'}`);
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/remedies", remedyRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  console.error(`❌ [${new Date().toISOString()}] Error: ${message}`, err.stack);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js";
// import remedyRouter from "./routes/remedy.routes.js"; // Corrected to import

// dotenv.config();

// const app = express();

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connection successful"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     console.error(
//       "Make sure your current IP address is whitelisted in your MongoDB Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-ip-allowlist/"
//     );
//     process.exit(1); // Exit process on connection failure
//   });

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// // Log every incoming request - for debugging
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// // Routes
// app.use("/api/auth", authRouter); // Prefixed with /api for consistency
// app.use("/api/user", userRouter); // Prefixed with /api for consistency
// app.use("/api/remedies", remedyRouter); // Updated to match your remedy routes

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";
//   console.error(`❌ [${new Date().toISOString()}] Error: ${message}`);
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // 404 handler for unmatched routes
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
// });
