import express from "express";
import { authenticate } from "../modules/auth.js";
    
export default function check(){
    const router = express.Router();

    router.get("/", authenticate, (req, res)=> {
        res.sendStatus(200);
    });

    return router;
}