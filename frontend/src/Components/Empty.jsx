export default function Empty() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 max-w-6xl mx-auto rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20">
            <svg className="size-12 text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0L21 7.5M19.5 6V18a3 3 0 01-3 3H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <h3 className="text-lg font-semibold text-zinc-300">No tracks found</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-xs">Try adjusting your keywords or searching for something else.</p>
        </div>
    );
}