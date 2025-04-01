import { Router } from "express";
import { Request,Response } from "express";
import { VolunteerStatus, VerifyVolunteer } from "../controllers/volunteer.controller";
export const VolunteerRouter = Router();

VolunteerRouter.get("/", (req: Request, res: Response) => {
    res.send("Hello from the volunteer router!");
});


VolunteerRouter.post("/status", VolunteerStatus);
VolunteerRouter.post("/verify-volunteer", VerifyVolunteer);

export default VolunteerRouter;
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQzNTAwMDM5fQ.4vpA4-l3GcPA6lDMeSZndrSjlWuCFFqz2XtSjUuO3S0"