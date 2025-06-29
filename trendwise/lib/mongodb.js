import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose || { conn: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  cached.conn = await mongoose.connect(uri);
  return cached.conn;
}

// Add default export for backward compatibility
export default connectDB;
