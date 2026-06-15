import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({children}){
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [songs, setSongs] = useState(null);

    useEffect(()=>{
        fetch("/songs")
        .then(res => res.json())
        .then(res => setSongs(res))
        .catch(e => setSongs([]));
    }, [])

    const PlaySong = song => {
        setPlaying(false);
        setCurrentlyPlaying(song);
        setTime(0);
        setPlaying(true);
    };

    const TimeToString = (time) => {
        if (time === undefined || time === null || isNaN(time)) 
            return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const values = {
        playing,
        setPlaying,
        currentlyPlaying,
        songs,
        setSongs,
        PlaySong,
        TimeToString,
        time, 
        setTime,
        search,
        setSearch
    };
    
    return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export function useApp(){
    return useContext(AppContext);
}