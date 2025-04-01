import { Router } from "express";


const AuthRouter = Router();

import { register, login } from "../controllers/auth.controller";

AuthRouter.post("/volunteer/register", register);
AuthRouter.post("/volunteer/login", login );


export default AuthRouter;