import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Type for tracking connection status
type ConnectionObject = {
    isConnected?: number; // Tracks the readyState of the connection
};

const connection: ConnectionObject = {};

const dbConnection = async (): Promise<void> => {
    // Skip reconnection if already connected
    if (connection.isConnected) {
        console.log("DB already connected");
        return;
    }

    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables");
        return;
    }

    try {
        // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState; // Update connection status
        console.log("DB connection successful");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
};

export default dbConnection;
