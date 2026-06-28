import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({children}){
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [songs, setSongs] = useState(null);
    const [key, setKey] = useState("");
    const [validated, setValidated] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        fetch("/check", {
            method: "GET",
            credentials: "include"
        })
        .then(res =>{
            if(res.status == 200){
                setValidated(true);
            }
            setChecked(true);
        });
    }, []);

    useEffect(()=>{
        if(!validated){
            fetch("/login", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({key: key})
            })
            .then(res => {
                if(res.status == 200)
                    setValidated(true);
            });
        }
    }, [key]);

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
        currentlyPlaying,
        songs,
        setSongs,
        PlaySong,
        TimeToString,
        time, 
        setTime,
        search,
        setSearch,
        validated,
        setKey,
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