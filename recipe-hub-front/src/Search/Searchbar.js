import React, {/*{Component}*/} from 'react';
import '../css/SearchBar.css';

const SearchBar = () => (
  <form action="/" method="get">
    <label htmlFor='header-search'>
        <span className='visually-hidden'>Search recipes</span>
    </label>
    <input 
        type="text"
        id="header-search"
        placeholder="Search blog posts"
        name="s" 
    />
    <button type="submit">Search</button>
  </form>

)

export default SearchBar;