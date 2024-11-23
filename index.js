import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { dbquery } from "./controller/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

import userAuthRouter from "./api/v1/user/auth/index.js";
import adminAuthRouter from "./api/v1/admin/auth/index.js";
import appointmentsRouter from "./api/v1/appointments/index.js";
import nursesRouter from "./api/v1/nurses/index.js";
import doctrosRouter from "./api/v1/doctors/index.js";

app.use("/api/v1/user/auth", userAuthRouter);
app.use("/api/v1/admin/auth", adminAuthRouter);
app.use("/api/v1/appointment", appointmentsRouter);
app.use("/api/v1/nurses", nursesRouter);
app.use("/api/v1/doctors", doctrosRouter);
app.use("/api/v1/chat", doctrosRouter);

// const users = {}; // { userId: [socketId, ...] }
// const chatOwnership = {}; // { chatId: ownerId }

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Handle user registration
//   socket.on("register", (userId) => {
//     console.log("userId ->", userId);
//     if (!users[userId]) users[userId] = [];
//     users[userId].push(socket.id);
//   });

//   // Handle sending messages
//   socket.on(
//     "send_message",
//     async ({ chatId, senderId, receivers, message, service }) => {
//       console.log("receivers ->", receivers);

//       if (!chatOwnership[chatId]) {
//         receivers.forEach((receiverId) => {
//           console.log(users, receiverId, users[receiverId]);
//           if (users[receiverId]) {
//             users[receiverId].forEach((socketId) => {
//               io.to(socketId).emit("message_notification", { chatId, message });
//             });
//           }
//         });
//       } else {
//         // Emit to chat owner
//         const ownerId = chatOwnership[chatId];
//         if (users[ownerId]) {
//           users[ownerId].forEach((socketId) => {
//             io.to(socketId).emit("receive_message", {
//               chatId,
//               senderId,
//               message,
//             });
//           });
//         }
//       }
//     },
//   );

//   // Handle claiming ownership
//   socket.on("claim_chat", ({ chatId, userId }) => {
//     if (!chatOwnership[chatId]) {
//       chatOwnership[chatId] = userId;
//       io.to(socket.id).emit("ownership_granted", { chatId });
//     }
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     for (const userId in users) {
//       users[userId] = users[userId].filter((id) => id !== socket.id);
//       if (users[userId].length === 0) delete users[userId];
//     }
//     console.log("User disconnected:", socket.id);
//   });
// });

// app.use((req, res, next) => {
//   if (req.path.startsWith("/socket.io/")) {
//     console.log("asdasdasd");
//     return next();
//   }
// });

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
