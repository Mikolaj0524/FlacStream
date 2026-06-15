import { useApp } from "../AppContext";

export default function Filter() {
    const {songs, setSongs} = useApp();

    const handleClick = () => {
        const shuffled = [...songs];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setSongs(shuffled);
    };

    return (
        <button onClick={handleClick} className="aspect-square cursor-pointer group flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 shadow-lg hover:border-violet-500 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all duration-200" >
            <img src="sort_rnd.svg" alt="random" className="w-6 h-6 transition-transform duration-200 group-active:scale-90" />
        </button>
    );
}