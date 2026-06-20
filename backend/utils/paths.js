import path from "path";

export const data_dir = "./data";
export const music_dir = data_dir + "/music";
export const covers_dir =  data_dir + "/covers";
export const cache_file =  data_dir + "/cache.json";
export const website_dir = path.join(process.cwd(), "../frontend/dist");