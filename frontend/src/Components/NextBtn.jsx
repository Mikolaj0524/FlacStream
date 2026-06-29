export default function NextBtn({nextTrack}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="Next song" onClick={nextTrack}>
            <path d="M4 4 L12 10 L4 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
            <rect x="13" y="4" width="2" height="12" fill="currentColor" />
        </svg>
    );
}