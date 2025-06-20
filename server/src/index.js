import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from '../lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server } from "../lib/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

// Increase the body size limit to handle image messages (e.g., base64)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Enable CORS with credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Connect to DB first, then start server
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    
app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client','dist','index.html'));
    });
}
const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
