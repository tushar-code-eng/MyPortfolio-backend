import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";

import cors from "cors";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
