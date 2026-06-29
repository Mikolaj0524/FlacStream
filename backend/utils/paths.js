import path from "path";

export const data_dir = path.join(process.cwd(), "data")
export const music_dir =  path.join(data_dir, "/covers");
export const covers_dir =  path.join(data_dir, "/covers");
export const cache_file =  path.join(data_dir, "/cache.json");
export const sessions_file =  path.join(data_dir, "/sessions.json");
export const website_dir = path.join(process.cwd(), "../frontend/dist");