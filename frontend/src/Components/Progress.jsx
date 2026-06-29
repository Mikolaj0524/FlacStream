import { useState, useEffect, useRef } from "react";
import { useApp } from "../AppContext";

export default function Progress({audioRef, dragging, setDragging}){
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