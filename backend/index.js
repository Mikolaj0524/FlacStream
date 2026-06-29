import express from "express";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";   
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { PORT } from "./config.js";
import { data_dir, website_dir, music_dir, covers_dir } from "./utils/paths.js";

import InitCache from "./modules/cache.js";

import songs from "./routes/songs.js";
import stream from "./routes/stream.js";
import covers from "./routes/covers.js";
import login from "./routes/login.js";
import check from "./routes/check.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());

if (!fs.existsSync(website_dir)) {
    console.error(`Unable to find website folder <${website_dir}>.`);
    process.exit(1);
}

if (!fs.existsSync(data_dir))
    fs.mkdirSync(data_dir);

if (!fs.existsSync(music_dir))
    fs.mkdirSync(music_dir);

if (!fs.existsSync(covers_dir))
    fs.mkdirSync(covers_dir);

async function start() {
    const cache = await InitCache();

    app.use("/", express.static(website_dir));
    app.use("/covers", covers());
    app.use("/songs", songs(cache));
    app.use("/stream", stream());
    app.use("/check", check());
    app.use("/login", rateLimit({windowMs: 10 * 60 * 1000, max: 5}), login());

    app.listen(PORT, () => {
        console.log(`Flac Stream server is now running on port ${PORT}.`);
    });
}

start();