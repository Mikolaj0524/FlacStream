import Item from "./Item";
import Empty from "./Empty";

export default function Items({songs, search}){
    if (!Array.isArray(songs)) 
        return <Empty />;

    const matched = songs.filter(song => match(song, search));
    if (matched.length === 0)
        return <Empty />;

    return (
        <>
            {matched.map((song, idx) => (
                <Item song={song} key={song.id || idx} />
            ))}
        </>
    );
}

function match(song, search) {
    const searchValue = (search ?? "").toString().toLowerCase();

    const title = (song?.title ?? "").toString().toLowerCase();
    const artist = (song?.artists ?? song?.artist ?? "").toString().toLowerCase();

    return title.includes(searchValue) || artist.includes(searchValue);
}