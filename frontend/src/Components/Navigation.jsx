import Shuffle from './Shuffle'
import { useApp } from "../AppContext";

export default function Navigation(){
    const {search, setSearch} = useApp();

    return(
        <nav className="py-5 flex items-center justify-center gap-4 px-6">
            <a href="https://github.com/Mikolaj0524/FlacStream" target="_blank">
                <img src="logo_purple.svg" alt="Logo" className="h-13"  />
            </a>
            <input type="text"  value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inside library" 
                className="caret-violet-600 hover:border-violet-600 w-full max-w-md bg-zinc-900 text-white placeholder-zinc-500 px-5 py-3 rounded-full border border-zinc-700 outline-none transition duration-200 focus:border-violet-600 focus:ring-2 focus:ring-violet-400/30 shadow-lg"
            />
            <Shuffle />
        </nav>
    );
}