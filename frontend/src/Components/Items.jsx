import Item from "./Item";
import Empty from "./Empty";

export default function Items({songs, search, center, setCenter}){
    if (!Array.isArray(songs)){
        setCenter(true);
        return <Empty />;
    }

    const matched = songs.filter(song => match(song, search));
    if (matched.length === 0){
        setCenter(true);
        return <Empty />;
    }

    setCenter(false);

    return (
        <div className={`${center && "hidden"}`}>
            {matched.map((song, idx) => (
                <Item song={song} key={song.id || idx} />
            ))}
        </div>
    );
}

function match(song, search) {
    const searchValue = (search ?? "").toString().toLowerCase().trim();

    const title = (song?.title ?? "").toString().toLowerCase();
    const artist = (song?.artists ?? song?.artist ?? "").toString().toLowerCase();

    if (searchValue.startsWith("artist:") || searchValue.startsWith("artists:") || searchValue.startsWith("a:")) {
        const artistSearch = searchValue.replace(/^(artist:|artists:|a:)/, "").trim();
        return artist.includes(artistSearch);
    }

    if (searchValue.startsWith("title:") || searchValue.startsWith("t:")) {
        const titleSearch = searchValue.replace(/^(title:|t:)/, "").trim();
        return title.includes(titleSearch);
    }

    return title.includes(searchValue);
}