import { Router } from "express";

import { Request, Response } from "express";
import { AddAnimals, GetAllAnimals, GetAnimalByAdoptionStatus, GetAnimalByCategory, GetAnimalById, GetAnimalByLocation, GetAnimalBySubCategory, GetAnimalsOfVolunteers } from "../controllers/animals.controller";

export const AnimalsRouter = Router();

AnimalsRouter.get("/", (req: Request, res: Response) => {
    res.send("Hello from the animals router!");
});

AnimalsRouter.post("/add", AddAnimals);
AnimalsRouter.get("/getAll", GetAllAnimals);
AnimalsRouter.post("/getById", GetAnimalById);
AnimalsRouter.post("/getByCategory", GetAnimalByCategory);
AnimalsRouter.post("/getBySubCategory", GetAnimalBySubCategory);
AnimalsRouter.post("/getByLocation", GetAnimalByLocation);
AnimalsRouter.post("/getByAdoptionStatus", GetAnimalByAdoptionStatus);
AnimalsRouter.post("/getByVolunteer", GetAnimalsOfVolunteers);


