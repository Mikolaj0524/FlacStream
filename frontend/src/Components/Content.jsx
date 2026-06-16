import { useApp } from "../AppContext";
import Loader from "./Loader";
import Items from "./Items";

export default function Content(){
    const {songs, search} = useApp();

    return(
        <main className="flex-1 overflow-y-auto px-3">
            {songs == null ? (
                <Loader />
            ) : (
                <Items songs={songs} search={search} />
            )}
        </main>
    );
}