import Search from './Search'
import Filter from './Filter'

export default function Navigation(){
    return(
        <nav className="py-5 md:py-8 lg:py-10 xl:py-50 flex items-center justify-center gap-4 px-6">
            <img src="logo_purple.svg" alt="Logo" className="h-13" />
            <Search />
            <Filter />
        </nav>
    );
}