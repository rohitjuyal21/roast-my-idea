// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected = false; // Track the connection state

export async function dbConnect() {
  if (isConnected) {
    return; // If already connected, return
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true; // Update the connection state
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error for better error handling
  }
}
