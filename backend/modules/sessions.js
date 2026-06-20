import crypto from "crypto";

const sessions = new Map();

export function createSession(){
    const token = crypto.randomBytes(32).toString("hex");

    sessions.set(token, {
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000
    });

    return token;
}

export function checkSession(token){
    const session = sessions.get(token);
    if(!session)
        return false;

    if(Date.now() > session.expires){
        sessions.delete(token);
        return false;
    }

    return true;
}