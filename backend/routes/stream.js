import express from "express";
import fs from "fs";
import path from "path";

import { authenticate } from "../modules/auth.js";
import { music_dir } from "../utils/paths.js";

export default function stream() {
    const router = express.Router();
    
    router.get("/:file", authenticate, (req,res)=>{
        const fileName = path.basename(req.params.file);
        if(!fileName.endsWith(".flac"))
            return res.sendStatus(400);

        const filePath = path.join(music_dir, fileName);
        if(!fs.existsSync(filePath))
            return res.sendStatus(404);

        const stat = fs.statSync(filePath);
        const size = stat.size;
        const range = req.headers.range;

        if(!range){
            res.writeHead(200,{
                "Content-Type":"audio/flac",
                "Accept-Ranges":"bytes",
                "Content-Length":size
            });

            fs.createReadStream(filePath).pipe(res);
            return;
        }

        const parts = range.replace("bytes=","").split("-");
        const start = parseInt(parts[0],10);

        if(isNaN(start))
            return res.sendStatus(416);

        const max = 1024 * 1024;
        let end = parts[1] ? parseInt(parts[1],10) : start + max - 1;
        if(end >= size)
            end = size-1;

        if(start >= size)
            return res.sendStatus(416);

        const chunk = end-start + 1;
        const stream = fs.createReadStream(filePath, {start, end});

        res.writeHead(206,{
            "Content-Range":
            `bytes ${start}-${end}/${size}`,
            "Accept-Ranges":"bytes",
            "Content-Length":chunk,
            "Content-Type":"audio/flac"
        });

        stream.pipe(res);
    });

    return router;
}