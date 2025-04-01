import express,{ Request,Response } from "express";

import pool from "../config/connectDB";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const saltRounds = 10;

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email, phone, password, bio, location, image_url } = req.body;


    //check if user exists:

    try {
        const data = await pool.query("SELECT * FROM volunteers WHERE email=$1", [email]);
        const user = data.rows[0];
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await pool.query(
        "INSERT INTO volunteers (name, email, phone, password, bio, location, verified, image_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [name, email, phone, hashedPassword, bio, location, false, image_url, new Date(), new Date()]
      );

      
  
      const user = result.rows[0];

      //create JWT.
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
      res.status(201).json({ message: "User registered successfully", token});
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM volunteers WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};