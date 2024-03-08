import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import userAuthRouter from "./api/v1/user/auth/index.js";

app.use("/api/v1/user/auth", userAuthRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
