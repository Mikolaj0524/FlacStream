import { useApp } from "../AppContext";
import Loader from "./Loader";
import Items from "./Items";
import Login from "./Login";
import { useState } from "react";

export default function Content(){
    const {songs, search, validated, checked} = useApp();
    const [center, setCenter] = useState(true);

    return(
        <main className={`flex-1 overflow-y-auto px-3 ${(songs == null || center) && "flex items-center justify-center"}`}>
            {(validated || !checked) ? (
                songs == null ? <Loader /> : <Items songs={songs} search={search} center={center} setCenter={setCenter} />
            ) : <Login /> }
        </main>
    );
}