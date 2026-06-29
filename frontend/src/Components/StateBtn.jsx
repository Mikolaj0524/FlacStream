export default function StateBtn({playing, setPlaying}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="cursor-pointer size-6 text-zinc-400 hover:text-white transition" alt="play/pause" onClick={() => setPlaying(!playing)} >
            {playing ? (
                <>
                    <rect x="6" y="4" width="3" height="12" rx="1" fill="currentColor" className="hover:fill-white" />
                    <rect x="11" y="4" width="3" height="12" rx="1" fill="currentColor" />
                </>
            ):(
                <path d="M6 4 L16 10 L6 16 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
            )}
        </svg>
    );
}