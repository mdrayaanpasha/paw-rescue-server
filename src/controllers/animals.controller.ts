import { Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/connectDB";
dotenv.config();

export const AddAnimals = async (req: Request, res: Response): Promise<any> => {
    const { JWT, name, category, sub_category, age, gender, health_status, vaccinated, description, location, adoption_status, image_url } = req.body;
    
    if (!JWT) return res.status(400).json({ message: "JWT is required" });

    try {
        // Decode JWT and get volunteer_id
        const decoded = jwt.verify(JWT, process.env.JWT_SECRET!) as JwtPayload;
        const volunteer_id = decoded.id; 
        
        if (!volunteer_id) return res.status(401).json({ message: "Invalid token" });


        //check if the volunteer is verified

        const volunteerResult = await pool.query("SELECT * FROM volunteers WHERE id = $1", [volunteer_id]);
        const volunteer = volunteerResult.rows[0];
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        if (volunteer.verified === false) {
            return res.status(401).json({ message: "Volunteer not verified" });
        }
        

        // Insert animal into database
        const result = await pool.query(
            `INSERT INTO animals (volunteer_id, name, category, sub_category, age, gender, health_status, vaccinated, description, location, adoption_status, image_url, created_at, updated_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW()) 
             RETURNING *`,
            [volunteer_id, name, category, sub_category, age, gender, health_status, vaccinated, description, location, adoption_status, image_url]
        );

        res.status(201).json({ message: "Animal added successfully", animal: result.rows[0] });
    } catch (error) {
        console.error("Error adding animal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const GetAnimalsOfVolunteers = async (req: Request, res: Response): Promise<any> => {
    const { JWT } = req.body;
    
    if (!JWT) return res.status(400).json({ message: "JWT is required" });

    try {
        // Decode JWT and get volunteer_id
        const decoded = jwt.verify(JWT, process.env.JWT_SECRET!) as JwtPayload;
        const volunteer_id = decoded.id; 
        
        if (!volunteer_id) return res.status(401).json({ message: "Invalid token" });


        //check if the volunteer is verified

        const volunteerResult = await pool.query("SELECT * FROM volunteers WHERE id = $1", [volunteer_id]);
        const volunteer = volunteerResult.rows[0];
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        if (volunteer.verified === false) {
            return res.status(401).json({ message: "Volunteer not verified" });
        }
        

        // Get animals from database
        const result = await pool.query(
            `SELECT * FROM animals WHERE volunteer_id = $1`,
            [volunteer_id]
        );

        res.status(200).json({ animals: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const GetAllAnimals = async (req: Request, res: Response): Promise<any> => {
    const { JWT } = req.body;
    
    if (!JWT) return res.status(400).json({ message: "JWT is required" });

    try {
     

        // Get animals from database
        const result = await pool.query(
            `SELECT * FROM animals`
        );

        res.status(200).json({ animals: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAnimalById = async (req: Request, res: Response): Promise<any> => {

    const {AnimalId} = req.body;
    try {
       
        const result = await pool.query(
            `SELECT * FROM animals WHERE id = $1`,
            [AnimalId]
        );

        res.status(200).json({ animal: result.rows[0] });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAnimalByCategory = async (req: Request, res: Response): Promise<any> => {
    const {category} = req.body;
    try {
       
        const result = await pool.query(
            `SELECT * FROM animals WHERE category = $1`,
            [category]
        );

        res.status(200).json({ animal: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAnimalBySubCategory = async (req: Request, res: Response): Promise<any> => {
    const {sub_category} = req.body;
    try {
       
        const result = await pool.query(
            `SELECT * FROM animals WHERE sub_category = $1`,
            [sub_category]
        );

        res.status(200).json({ animal: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAnimalByLocation = async (req: Request, res: Response): Promise<any> => {
    const {location} = req.body;
    try {
       
        const result = await pool.query(
            `SELECT * FROM animals WHERE location = $1`,
            [location]
        );

        res.status(200).json({ animal: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAnimalByAdoptionStatus = async (req: Request, res: Response): Promise<any> => {
    const {adoption_status} = req.body;
    try {
       
        const result = await pool.query(
            `SELECT * FROM animals WHERE adoption_status = $1`,
            [adoption_status]
        );

        res.status(200).json({ animal: result.rows });
    } catch (error) {
        console.error("Error getting animals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

