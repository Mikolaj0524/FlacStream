import { useEffect, useState, useRef } from "react";
import { useApp } from "../AppContext";
import VolumeBar from "./VolumeBar";
import PrevBtn from "./PrevBtn";
import StateBtn from "./StateBtn";
import NextBtn from "./NextBtn";
import Progress from "./Progress";

export default function Player() {
    const {playing, setPlaying, currentlyPlaying, PlaySong, time, setTime, TimeToString, songs} = useApp();
    const [dragging, setDragging] = useState(false);
    const audioRef = useRef(null);

    const updateAudio = () => {
        if(!audioRef.current)
            return;

        const audio = audioRef.current;
        audio.src = `/stream/${encodeURIComponent(currentlyPlaying.id)}`;
        audio.currentTime = time;

        if (playing) 
            audio.play();
    }

    useEffect(() => {
        if (!("mediaSession" in navigator)) 
            return;
        
        navigator.mediaSession.setActionHandler("play", () => setPlaying(true));
        navigator.mediaSession.setActionHandler("pause", () => setPlaying(false));
        navigator.mediaSession.setActionHandler("nexttrack", () => nextTrack());
        navigator.mediaSession.setActionHandler("previoustrack", () => prevTrack());
    }, [songs, currentlyPlaying]);

    useEffect(() => {
        if (!audioRef.current) 
            return;
        
        updateAudio();
    }, [currentlyPlaying]);

    const prevTrack = () => {
        const currentTime = audioRef.current?.currentTime ?? 0;
        if(currentTime >= 5){
            audioRef.current.currentTime = 0;
            return;
        }

        const index = songs.findIndex(s => s.id === currentlyPlaying.id);
        const prev = songs[index - 1];

        if (prev){
            PlaySong(prev);
        }
        else{
            const s = songs[songs.length - 1];
            if(s)
                PlaySong(s);
        }
    };

    const nextTrack = () => {
        const index = songs.findIndex(s => s.id === currentlyPlaying.id);
        const next = songs[index + 1];
        if (next){
            PlaySong(next);
        }
        else{
            const s = songs[0];
            if(s)
                PlaySong(s);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.src) 
            return;

        if (playing){
            if (audio.paused) 
                audio.play();
        } 
        else {
            if (!audio.paused) 
                audio.pause();
        }
    }, [playing]);

    const handleTime = () => {
        if (!dragging && audioRef.current)
            setTime(audioRef.current.currentTime);
    };
    
    useEffect(() => {
        const keyDown = e => {
            if (e.code === "Space")
                setPlaying(prev => !prev);
        };
        
        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    }, []);
    

    return (
        <div className="flex items-center justify-center md:px-3">
            <div className="border-zinc-800 bg-zinc-900/20 hover:border-violet-600 flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-15 border-t md:border w-full max-w-6xl md:rounded-xl transition-all duration-200 text-white p-3 md:p-2 xl:p-4 mt-6 md:my-6">
                <audio ref={audioRef} className="hidden" onTimeUpdate={handleTime} onEnded={nextTrack} />
                <div className="flex gap-4 items-center justify-start">
                    <img src={currentlyPlaying.cover ?? "unknown.svg"} alt="Song cover" className="size-13 object-cover rounded" />
                    <div className="flex flex-col justify-center">
                        <div className="font-bold text-sm">{currentlyPlaying.title}</div>
                        <div className="text-gray-300 text-xs">{currentlyPlaying.artists}</div>
                    </div>
                </div>
                <div className="flex gap-2.5 flex-1 flex-col w-full md:w-auto md:flex-row-reverse items-center justify-center">
                    <div className="flex gap-4 px-4 items-center justify-center">
                        <VolumeBar audioRef={audioRef} />
                        <PrevBtn prevTrack={prevTrack} />
                        <StateBtn playing={playing} setPlaying={setPlaying} />
                        <NextBtn nextTrack={nextTrack} />
                    </div>
                    <div className="flex items-center gap-4 w-full min-w-0">
                        <Progress audioRef={audioRef} dragging={dragging} setDragging={setDragging} />
                    </div>
                </div>
            </div>
        </div>
    );
}