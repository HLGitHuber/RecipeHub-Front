import '../css/Search.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '25%', backgroundColor: 'bisque' }}
      >
        <InputBase
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
          id="header-search"
          name='q'
          sx={{ backgroundColor: 'bisque', ml: 1, flex: 1 }}
          placeholder="Search products"
          inputProps={{ 'aria-label': 'search products' }}
        />
      </Paper>
)
}

export default SearchBar;