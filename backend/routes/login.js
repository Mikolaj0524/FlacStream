import express from "express";
import { AUTHENTICATION } from "../config.js";
import { createSession } from "../modules/sessions.js";

export default function login(){
    const router = express.Router();

    router.post("/", express.json(), (req, res)=>{
        const key = req.body.key;

        if(AUTHENTICATION != null){
            if(!AUTHENTICATION.includes(key))
                return res.sendStatus(403);
        }

        const session = createSession();
        res.cookie("session", session, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({logged: true});
    });

    return router;
}