import { AddCampaigns,GetCampaignByDate,GetCampaignByLocation,GetAllCampaigns,GetCampaignById } from "../controllers/campaigns.controller";
import { Router } from "express";

import { Request, Response } from "express";

const CampaignsRouter = Router();

CampaignsRouter.get("/", (req: Request, res: Response) => {
    res.send("Hello from the campaigns router!");
});

CampaignsRouter.post("/add", AddCampaigns);
CampaignsRouter.get("/getAll", GetAllCampaigns);
CampaignsRouter.post("/getById", GetCampaignById);
CampaignsRouter.post("/getByLocation", GetCampaignByLocation);
CampaignsRouter.post("/getByDate", GetCampaignByDate);

export default CampaignsRouter;

