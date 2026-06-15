import Search from './Search'
import Filter from './Filter'

export default function Navigation(){
    return(
        <nav className="min-h-30 md:min-h-100 flex items-center justify-center gap-4 px-6">
            <img src="logo_purple.svg" alt="Logo" className="h-13" />
            <Search />
            <Filter />
        </nav>
    );
}