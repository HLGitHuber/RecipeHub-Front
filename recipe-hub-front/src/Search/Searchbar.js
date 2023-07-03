import '../css/SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

    return (

        <form action='/search' method='get'>
            <div>
                <label htmlFor='header-search'>
                    <span className='visually-hidden'>Search products</span>
                </label>
                <input 
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Search products"
                    name="q" 
                />
            </div>
        </form>

)
}

export default SearchBar;