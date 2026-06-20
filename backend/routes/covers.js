import express from "express";
import { authenticate } from "../modules/auth.js";
import { covers_dir } from "../utils/paths.js";

export default function covers(){
    const router = express.Router();

    router.use("/", authenticate, 
        express.static(covers_dir, {
            maxAge: "1d"
        })
    );

    return router;
}