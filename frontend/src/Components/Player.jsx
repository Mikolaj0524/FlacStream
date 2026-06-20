import { useEffect, useState, useRef } from "react";
import { useApp } from "../AppContext";

export default function Player() {
    const {playing, setPlaying, currentlyPlaying, PlaySong, time, setTime, TimeToString, songs} = useApp();
    const [isDragging, setIsDragging] = useState(false);
    const audioRef = useRef(null);

    const updateAudio = () => {
        if(!audioRef.current)
            return;

        const audio = audioRef.current;
        const url = `/stream/${encodeURIComponent(currentlyPlaying.id)}`;

        audio.src = url;
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

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.src) 
            return;

        if (playing) {
            if (audio.paused)
                audio.play();
        } 
        else {
            if (!audio.paused)
                audio.pause();
        }
    }, [playing]);

    const changeTime = e => {
        const audio = audioRef.current;
        if (!audio || !currentlyPlaying.length) 
            return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const newTime = Math.min(Math.max(x / rect.width, 0), 1) * currentlyPlaying.length;

        audio.currentTime = newTime;
        setTime(Math.round(newTime));
    };

    const handleTime = () => {
        if (!isDragging && audioRef.current)
            setTime(Math.round(audioRef.current.currentTime));
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
    
    useEffect(() => {
        const keyDown = e => {
            if (e.code === "Space")
                setPlaying(prev => !prev);
        };
        
        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    }, []);
    
    
    const handleEnd = () => nextTrack();
    const handleError = () => {};

    return (
        <div className="flex items-center justify-center md:px-3">
            <div className="border-zinc-800 bg-zinc-900/20 hover:border-violet-600 flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-15 border-t md:border w-full max-w-6xl md:rounded-xl transition-all duration-200 text-white p-3 md:p-2 xl:p-4 mt-6 md:my-6">
                <audio ref={audioRef} className="hidden" onTimeUpdate={handleTime} onEnded={handleEnd} onError={handleError}  />
                <div className="flex gap-4 items-center justify-start">
                    <img src={currentlyPlaying.cover ?? "unknown.svg"} alt="Song cover" className="size-13 object-cover rounded" />
                    <div className="flex flex-col justify-center">
                        <div className="font-bold text-sm">{currentlyPlaying.title}</div>
                        <div className="text-gray-300 text-xs">{currentlyPlaying.artists}</div>
                    </div>
                </div>
                <div className="flex gap-2.5 flex-1 flex-col w-full md:w-auto md:flex-row-reverse items-center justify-center">
                    <div className="flex gap-4 px-4 items-center justify-center">
                        {/* PREV */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Previous song" onClick={() => prevTrack()}>
                            <rect x="5" y="4" width="2" height="12" fill="currentColor" />
                            <path d="M16 4 L8 10 L16 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                        </svg>

                        {/* PLAY / PAUSE */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="play/pause" onClick={() => setPlaying(!playing)} >
                            {playing ? (
                                <>
                                    <rect x="6" y="4" width="3" height="12" rx="1" fill="currentColor" className="hover:fill-white" />
                                    <rect x="11" y="4" width="3" height="12" rx="1" fill="currentColor" />
                                </>
                            ):(
                                <path d="M6 4 L16 10 L6 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                            )}
                        </svg>

                        {/* NEXT */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Next song" onClick={() => nextTrack()}>
                            <path d="M4 4 L12 10 L4 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                            <rect x="13" y="4" width="2" height="12" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-4 w-full min-w-0">
                        <div className="text-neutral-400 text-right text-xs">{TimeToString(time)}</div>
                        <div className="w-full h-1 rounded-full bg-zinc-600 transition-all cursor-pointer duration-200 overflow-hidden hover:h-3" 
                            onMouseDown={e => {
                                setIsDragging(true); 
                                changeTime(e);
                            }} 
                            onMouseMove={e => {
                                if (!isDragging)
                                    return; 
                                changeTime(e);
                            }}
                            onMouseUp={() => setIsDragging(false)} 
                            onMouseLeave={() => setIsDragging(false)}
                        >
                            <div className="bg-violet-600 h-full transition-all duration-100 rounded-full" style={{width:`${time / currentlyPlaying.length * 100}%`}}></div>
                        </div>
                        <div className="text-neutral-400 text-xs">{TimeToString(currentlyPlaying.length)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}