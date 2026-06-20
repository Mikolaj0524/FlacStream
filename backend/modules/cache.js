import fs from "fs";
import path from "path";
import * as musicMetadata from "music-metadata";

import { music_dir, covers_dir, cache_file } from "../utils/paths.js";

let cache = [];
export default async function InitCache(){
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
        try{
            cache = JSON.parse(fs.readFileSync(cache_file, "utf-8"));
            console.log("Loaded old cache file.");
        }
        catch{
            cache = [];
            console.log("Cache file is broken.");
        }
    }

    return cache;
}