export default function PrevBtn({prevTrack}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Previous song" onClick={prevTrack}>
            <rect x="5" y="4" width="2" height="12" fill="currentColor" />
            <path d="M16 4 L8 10 L16 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
        </svg>
    );
}