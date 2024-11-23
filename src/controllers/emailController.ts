import { Request, Response } from "express";
import resend from "../config/resend";

export const sendEmail = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    try {
        // Send email using Resend
        await resend.emails.send({
            from: "no-reply@example.com",
            to: process.env.TO_EMAIL,   
            subject: "New User Details",
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
};
