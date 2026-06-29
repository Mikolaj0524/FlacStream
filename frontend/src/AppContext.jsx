import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({children}){
    const [checked, setChecked] = useState(false);
    const [validated, setValidated] = useState(false);

    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState(null);

    const [playing, setPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [time, setTime] = useState(0);

    useEffect(()=>{
        fetch("/check", {
            method: "GET",
            credentials: "include"
        })
        .then(res =>{
            if(res.status == 200)
                setValidated(true);

            setChecked(true);
        });
    }, []);

    useEffect(()=>{
        if(!validated)
            return;

        fetch("/songs", {credentials: "include"})
        .then(res => res.json())
        .then(res => setSongs(res))
        .catch(e => setSongs([]));
    }, [validated])

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
        songs,
        setSongs,
        time, 
        setTime,
        TimeToString,
        PlaySong,
        currentlyPlaying,
        search,
        setSearch,
        validated,
        setValidated,
        checked
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