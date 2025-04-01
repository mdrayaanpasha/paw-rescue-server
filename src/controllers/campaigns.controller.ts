import { Response,Request } from "express";
import pool from "../config/connectDB";
// import { Campaign } from "../models/campaigns.model";
import dotenv from "dotenv";
dotenv.config();



export const AddCampaigns = async (req: Request, res: Response): Promise<any> => {
    const { title, description, location, start_date, end_date, image_url } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO campaigns (title, description, location, start_date, end_date, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, description, location, start_date, end_date, image_url]
        );
        res.status(200).json({ campaign: result.rows[0] });
    } catch (error) {
        console.error("Error adding campaign:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetAllCampaigns = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await pool.query(
            `SELECT * FROM campaigns`
        );
        res.status(200).json({ campaigns: result.rows });
    } catch (error) {
        console.error("Error getting campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetCampaignById = async (req: Request, res: Response): Promise<any> => {
    const { CampaignId } = req.body;
    try {
        const result = await pool.query(
            `SELECT * FROM campaigns WHERE id = $1`,
            [CampaignId]
        );
        res.status(200).json({ campaign: result.rows[0] });
    } catch (error) {
        console.error("Error getting campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetCampaignByLocation = async (req: Request, res: Response): Promise<any> => {
    const { location } = req.body;
    try {
        const result = await pool.query(
            `SELECT * FROM campaigns WHERE location = $1`,
            [location]
        );
        res.status(200).json({ campaign: result.rows });
    } catch (error) {
        console.error("Error getting campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const GetCampaignByDate = async (req: Request, res: Response): Promise<any> => {
    const { start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            `SELECT * FROM campaigns WHERE start_date >= $1 AND end_date <= $2`,
            [start_date, end_date]
        );
        res.status(200).json({ campaign: result.rows });
    } catch (error) {
        console.error("Error getting campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}





