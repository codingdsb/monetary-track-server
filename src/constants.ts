import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const __prod__ = process.env.NODE_ENV === "production";
export const JWT_SECRET = process.env.JWT_SECRET;
