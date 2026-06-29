import { useState, useEffect, useRef } from "react";


export default function VolumeBar({audioRef}){
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
        <div className="relative z-20 hidden md:block" onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}>
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