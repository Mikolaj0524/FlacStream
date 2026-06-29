import { useEffect, useState, useRef } from "react";
import { useApp } from "../AppContext";

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

function VolumeBar({audioRef}){
    const [volumeDragging, setVolumeDragging] = useState(false);
    const [over, setOver] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);

    const volumeRef = useRef(null);

    const toggleMute = () => {
        if (!audioRef.current)
            return;

        const audio = audioRef.current;
        audio.muted = !audio.muted;
        audio.volume = audio.muted ? 0 : 1;

        setMuted(audio.muted);
        setVolume(audio.volume);
    };    
        
    useEffect(() => {
        if (!volumeDragging) 
            return;

        const handleMove = e => changeVolume(e.clientY);
        const handleUp = () => setVolumeDragging(false);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [volumeDragging]);

    const changeVolume = clientY => {
        const audio = audioRef.current;
        if (!audio || !volumeRef.current) 
            return;

        const rect = volumeRef.current.getBoundingClientRect();

        const y = clientY - rect.top;
        const newVolume = Math.min(Math.max(1 - (y / rect.height), 0), 1);

        audio.volume = newVolume;
        setVolume(newVolume);

        if(newVolume > 0){
            setMuted(false);
            audio.muted = false;
        }
        else{
            setMuted(true);
            audio.muted = true;
        }
    };

    return(
        <div className="relative z-20" onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}>
            {over &&
                <div className="h-35 pb-8 bottom-0 w-full absolute z-30">
                    <div className="border-zinc-800 border bg-zinc-900 w-full h-full rounded-md p-2">
                        <div className="h-full w-full bg-zinc-600 flex items-end align-middle rounded-full cursor-pointer"
                            ref={volumeRef}
                            onMouseDown={e => {
                                setVolumeDragging(true); 
                                changeVolume(e.clientY);
                            }}
                        >
                            <div className="bg-violet-600 rounded-full flex-1" style={{height: `${volume * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            }
            <div className="relative z-40" onClick={toggleMute}>
                {muted ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Muted">
                        <path d="M4 8 H7 L12 4 V16 L7 12 H4 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                        <path d="M14 8 L17 12 M17 8 L14 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Volume">
                        <path d="M4 8 H7 L12 4 V16 L7 12 H4 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                        <path d="M14 7 C16 8.5 16 11.5 14 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                }
            </div>
        </div>
    );
}

function Progress({audioRef, dragging, setDragging}){
    const {playing, currentlyPlaying, time, setTime, TimeToString} = useApp();

    const barRef = useRef(null);

    useEffect(() => {
        if (!dragging) 
            return;

        const handleMove = e => changeTime(e.clientX);
        const handleUp = () => setDragging(false);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [dragging, currentlyPlaying]);

    const changeTime = clientX => {
        const audio = audioRef.current;
        if (!audio || !currentlyPlaying.length || !barRef.current) 
            return;

        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        
        const newTime = Math.min(Math.max(x / rect.width, 0), 1) * currentlyPlaying.length;

        audio.currentTime = newTime;
        setTime(newTime);
    };

    return(
        <>
            <div className="text-neutral-400 text-right text-xs">{TimeToString(Math.round(time))}</div>
            <div className="w-full h-1 rounded-full bg-zinc-600 transition-all cursor-pointer duration-200 overflow-hidden hover:h-3" 
                ref={barRef}
                onMouseDown={e => {
                    setDragging(true); 
                    changeTime(e.clientX);
                }}
            >
                <div className="bg-violet-600 h-full rounded-full" style={{width:`${time / currentlyPlaying.length * 100}%`}}></div>
            </div>
            <div className="text-neutral-400 text-xs">{TimeToString(currentlyPlaying.length)}</div>
        </>
    );
}

function PrevBtn({prevTrack}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Previous song" onClick={prevTrack}>
            <rect x="5" y="4" width="2" height="12" fill="currentColor" />
            <path d="M16 4 L8 10 L16 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
        </svg>
    );
}

function StateBtn({playing, setPlaying}){
    return(
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
    );
}

function NextBtn({nextTrack}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Next song" onClick={nextTrack}>
            <path d="M4 4 L12 10 L4 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
            <rect x="13" y="4" width="2" height="12" fill="currentColor" />
        </svg>
    );
}