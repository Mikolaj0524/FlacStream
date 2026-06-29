import { useEffect, useState } from "react";
import { useApp } from "../AppContext";

export default function Login() {
    const {setValidated} = useApp();

    const [key, setKey] = useState("");
    const [error, setError] = useState(false);

    useEffect(()=>{
        setError(false);
    }, [key]);

    const handleClick = () => {
        if(key == ""){
            setError("Please enter your access key.");
            return;
        }

        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({key: key})
        })
        .then(res => {
            switch (res.status) {
                case 200: setError(false); setValidated(true); break;
                case 403: setError("The access key you entered is invalid."); break;
                case 429: setError("Too many attempts. Please try again in a moment."); break;
                default: setError("An unexpected error occurred. Please try again."); break;
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center text-center py-20 w-full max-w-6xl mx-auto rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20">
            <svg className="size-12 text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
            </svg>

            <h3 className="text-lg font-semibold text-zinc-300">Login required</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-xs">Please sign in to access your music library.</p>

            <form className="flex my-5 rounded-lg" onSubmit={e => {e.preventDefault(); handleClick();}}>
                <input type="text" name="username" autoComplete="username" value="" readOnly hidden />
                <input type="password" autoComplete="current-password" size={15} className={`border-l border-y bg-zinc-900 px-3 py-1.5 md:py-1 rounded-l-lg outline-none text-white transition-all duration-200 ${error ? "border-red-500" : "border-zinc-700"}`} value={key} onChange={e => setKey(e.target.value)} />

                <button className={`border-r border-y bg-zinc-800 hover:bg-zinc-700 px-4 rounded-r-lg cursor-pointer  transition-all duration-200 ${error ? "border-red-500" : "border-zinc-700"}`}>
                    <svg className="size-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </form>

            <p className="text-xs text-red-500 h-4">{error}</p>
        </div>
    );
}