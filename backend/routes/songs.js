import express from "express";
import { authenticate } from "../modules/auth.js";

export default function songs(cache) {
    const router = express.Router();

    router.get("/", authenticate, (req, res) => {
        res.json(cache);
    });

    return router;
}