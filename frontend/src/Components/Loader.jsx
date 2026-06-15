export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 max-w-6xl mx-auto rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20">
            <svg className="size-12 text-zinc-600 mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h3 className="text-lg font-semibold text-zinc-300">Loading library</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-xs">Fetching your favorite tracks...</p>
        </div>
    );
}