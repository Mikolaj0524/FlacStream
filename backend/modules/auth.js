import { checkSession } from "./sessions.js";
import { AUTHENTICATION } from "../config.js";

export function authenticate(req, res, next){
    if(AUTHENTICATION != null){
        const token = req.cookies.session;
        if(!token)
            return res.sendStatus(401);

        if(!checkSession(token))
            return res.sendStatus(403);
    }
    next();
}