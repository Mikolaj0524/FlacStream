import { useEffect } from "react";
import { useApp } from "../AppContext";
import { useState } from "react";


export default function Item({song}){
    const {PlaySong, TimeToString, time, currentlyPlaying} = useApp();
    const current = currentlyPlaying === song;

    return(
        <div className="flex items-center gap-4 max-w-6xl mx-auto my-2 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-violet-500 hover:bg-zinc-800/60 transition-all duration-300 cursor-pointer p-1 xl:p-2" onClick={() => {if(!current) PlaySong(song);}}>
            <img src={song.cover ?? "unknown.svg"} alt="song cover" className="size-12 m-1 rounded-sm" />
            <div className="flex flex-col items-start justify-center flex-1">
                <div className={`font-semibold font-stretch-50% ${current && "text-violet-500"}`}>{song.title}</div>
                <div className="text-gray-300 text-sm">{song.artists}</div>
            </div>
            {song.speed && <div className="text-xs text-neutral-500 hidden md:block font-light font-mono">{song.speed}kbps</div>}
            <div className={`text-neutral-400 mr-4 ${current && "text-violet-600"}`}>{current && TimeToString(time) + " / "}{TimeToString(song.length)}</div>
        </div>
    );
}