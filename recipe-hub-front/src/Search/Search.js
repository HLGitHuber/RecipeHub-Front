import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from './Searchbar';

const Items = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Milk' },
    { id: '3', name: 'Bread' },
    { id: '4', name: 'Chicken' },
];

const doSearch = (term, query) => {
    if(!term)
        return Items

    return Items.filter(
        (item) => item.name.toLowerCase().includes(query))

}

const Search = () => {
    
    const { search } = window.location
    const query = new URLSearchParams(search).get('q')
    const [searchQuery, setSearchQuery] = useState(query || '')
    const returned = doSearch(Items, searchQuery)
    console.log(query)
    return (

    <div>
        <h1>Search</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ul>
            {returned.map(t => (
                <li key={t.id}>{t.name}</li>
            ))}
        </ul>
    </div>

)}

export default Search;