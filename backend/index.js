import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import * as musicMetadata from "music-metadata";
import { execSync } from "child_process";

const PORT = 3001;

const app = express();
app.use(cors())

const music_dir = "./music";
const covers_dir = "./covers";
const cache_file = "./cache.json";
const website_dir = "../frontend/dist/"

if(!fs.existsSync(website_dir)){
    console.error(`Unable to find website folder <${website_dir}>.`);
    console.log("Trying to build website..");

    try {
        execSync("npm run build", {
            cwd: path.join(process.cwd(), "../frontend"),
            stdio: "inherit"
        });
    } 
    catch (err) {
        console.error("Build failed:", err);
        process.exit(1);
    }
}

if(!fs.existsSync(music_dir))
    fs.mkdirSync(music_dir);

if(!fs.existsSync(covers_dir))
    fs.mkdirSync(covers_dir);

if(!fs.existsSync(covers_dir))
    fs.mkdirSync(covers_dir);

let cache = [];

async function InitCache(){
    const start = Date.now();

    try{
        const files = fs.readdirSync(music_dir).filter(file => file.endsWith(".flac"));
        const songs = [];

        for(const file of files){
            const filePath = path.join(music_dir, file);
            let duration = 0, artists = "Unknown", cover = null, title = null, speed = 0;

            try{
                const md = await musicMetadata.parseFile(filePath);

                duration = Math.floor(md.format.duration || 0);

                if(md.common.artists && md.common.artists.length > 0){
                    artists = md.common.artists.join(", ");
                }
                else if(md.common.artist){
                    artists = md.common.artist;
                }

                title = md.common.title || file.replace(".flac", "");

                if(md.common.picture && md.common.picture.length > 0){
                    const p = md.common.picture[0];
                    const ext = p.format.split("/")[1] || "jpg";
                    const coverName = `${file.replace(".flac", "")}.${ext}`;
                    const coverPath = path.join(covers_dir, coverName);

                    if (!fs.existsSync(coverPath))
                        fs.writeFileSync(coverPath, p.data);

                    cover = `/covers/${encodeURIComponent(coverName)}`;
                }

                speed = md.format.bitrate ? Math.round(md.format.bitrate / 1000) : null;
            }
            catch(err){
                console.error(`Error while reading metadata for <${file}> file.`, err);
                title = file.replace(".flac", "");
            }

            songs.push({
                id: file,
                title: title,
                length: duration,
                artists: artists,
                cover: cover,
                speed: speed
            });
        }

        fs.writeFileSync(cache_file, JSON.stringify(songs, null, 2), "utf-8");
        cache = songs;

        const actionTime = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`Successfully indexed ${songs.length} songs in ${actionTime}s.`);
    }
    catch(err){
        console.error("Error while initializing cache: ", err);
        if (fs.existsSync(cache_file)) {
            cache = JSON.parse(fs.readFileSync(cache_file, "utf-8"));
            console.log("Error happens with cache file, loaded old cache.");
        }
    }
}

app.use("/", express.static(website_dir));

app.use("/covers", express.static(covers_dir, {
    maxAge: "1d"
}));

app.get("/songs", (req, res) => {
    res.json(cache);
})

app.get("/stream/:file", (req, res) => {
    const fileName = path.basename(req.params.file);
    if (!fileName.endsWith(".flac"))
        return res.sendStatus(400);

    const filePath = path.join(music_dir, fileName);

    if(!fs.existsSync(filePath))
        return res.sendStatus(404);

    const stat = fs.statSync(filePath);
    const size = stat.size;
    const range = req.headers.range;

    if(!range){
        res.writeHead(200, {
            "Content-Type": "audio/flac",
            "Accept-Ranges": "bytes",
            "Content-Length": size
        });
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);

    if (isNaN(start))
        return res.sendStatus(416);

    const maxChunkSize = 1024 * 1024;
    let end = parts[1] ? parseInt(parts[1], 10) : start + maxChunkSize;
    if(end >= size)
        end = size - 1;

    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, {start, end});

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/flac"
    });

    stream.pipe(res);
})

app.listen(PORT, async () => {
    console.log(`Flac Stream server is now running on port ${PORT}.`);
    await InitCache();
})