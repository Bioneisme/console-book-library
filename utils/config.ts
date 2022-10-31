import dotenv from "dotenv";

dotenv.config();

export const DB_URL: string = process.env.DB_URL as string;
export const SECRET_KEY: string = process.env.SECRET_KEY as string;