import crypto from "crypto";
import fs from "fs";
import path from "path";
import { sessions_file } from "../utils/paths.js";

const sessions = new Map();

function hashToken(token){
    return crypto.createHash("sha256").update(token).digest("hex");
}

function save(){
    fs.writeFileSync(sessions_file, JSON.stringify(Object.fromEntries(sessions), null, 2), "utf-8");
}

function load(){
    if(!fs.existsSync(sessions_file)){
        fs.writeFileSync(sessions_file, "{}", "utf-8");
        return;
    }

    try{
        const data = JSON.parse(fs.readFileSync(sessions_file, "utf-8"));
        for(const [key, value] of Object.entries(data)){
            if(value.expires > Date.now())
                sessions.set(key,value);
        }
    }
    catch{
        console.log("sessions.json is broken");
    }
}

load();

export function createSession(){
    const token = crypto.randomBytes(32).toString("hex");
    const id = hashToken(token);

    sessions.set(id, {
        created: Date.now(), 
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000
    });

    save();
    return token;
}

export function checkSession(token){
    if(!token)
        return false;

    const id = hashToken(token);
    const session = sessions.get(id);

    if(!session)
        return false;

    if(Date.now() > session.expires){
        sessions.delete(id);
        save();

        return false;
    }

    return true;
}

export function deleteSession(token){
    const id = hashToken(token);
    sessions.delete(id);
    save();
}

setInterval(()=>{
    let changed = false;

    for(const [id, session] of sessions){
        if(Date.now() > session.expires){
            sessions.delete(id);
            changed = true;
        }
    }

    if(changed)
        save();

}, 60 * 60 * 1000);