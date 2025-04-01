import pool from "../config/connectDB";

import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const VolunteerStatus = async (req: Request, res: Response): Promise<any> => {

    const {JWT} = req.body;
    
    const decoded = jwt.verify(JWT, process.env.JWT_SECRET!) as JwtPayload;
    const volunteerId = decoded.id;
    // console.log(volunteerId);

    try {
        const result = await pool.query("SELECT * FROM volunteers WHERE id = $1", [volunteerId]);
        const volunteer = result.rows[0];
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        if(volunteer.verified === false){
            return res.status(401).json({ message: "Volunteer not verified" });
        }
        if(volunteer.verified === true){
            return res.status(200).json({ message: "Volunteer verified" });
        }

    } catch (error) {
        console.error("Error fetching volunteer:", error);
        res.status(500).json({ message: "Internal server error" });
    }

        

}


export const VerifyVolunteer = async (req: Request, res: Response): Promise<any> => {
    

    const {JWT} = req.body;

    if(!JWT) return res.status(400).json({message: "JWT is required"});
    
    const decoded = jwt.verify(JWT, process.env.JWT_SECRET!) as JwtPayload;
    const id = decoded.id;
    // console.log(id);
  

    try {
        const result = await pool.query("UPDATE volunteers SET verified = $1 WHERE id = $2", [true, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.status(200).json({ message: "Volunteer updated successfully" });
    } catch (error) {
        console.error("Error updating volunteer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
