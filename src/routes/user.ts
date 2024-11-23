import express from "express";
import User from "../models/UserModel";
import dbConnection from "../config/db";

const router = express.Router();

interface User {
    name: string;
    email: string;
}

router.post("/", async (req: any, res: any) => {
    await dbConnection()

    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const newUser = new User({
            name,
            email
        })
        await newUser.save()

        res.status(201).json({
            message: "User added successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

export default router;
