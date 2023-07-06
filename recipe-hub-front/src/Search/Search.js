import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './Searchbar';
import ProductList from './ProductList';
import Button from '@mui/material/Button';
import '../css/Search.css';
import {Helmet} from 'react-helmet';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [productList, setProductList] = useState([]);

  const [chosenProductsList, setChosenProductsList] = useState([]);

  const toggleSelection = (itemId) => {
    const selectedItem = productList.find((item) => item.id === itemId);
    if (selectedItem) {
      setProductList((prevProductList) =>
        prevProductList.filter((item) => item.id !== itemId)
      );
      setChosenProductsList((prevChosenProductsList) => [
        ...prevChosenProductsList,
        selectedItem,
      ]);
    } else {
      const selectedItem = chosenProductsList.find((item) => item.id === itemId);
      setChosenProductsList((prevChosenProductsList) =>
        prevChosenProductsList.filter((item) => item.id !== itemId)
      );
      setProductList((prevProductList) => [...prevProductList, selectedItem]);
    }
  };

  const doSearch = (term, query) => {
    if (!term || !query) return productList;

    return productList.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const query = new URLSearchParams(useLocation().search).get('q');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const returned = doSearch(searchQuery, searchQuery);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://localhost:44395/FoodData'); // Replace with the actual API endpoint for fetching products
        const data = await response.json();
        const updatedProductList = data.map((item) => ({
          id: item.id,
          name: item.name, 
        }));
        setProductList(updatedProductList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    fetchProducts();
  }, []);


  return (
    <div className='main'>
    <Helmet>
    <style>
        {'body { background-color: #8f8f24; }'}
    </style>
    </Helmet>
      <div className='left-element' >
        <div className='coolHeader'>
          <h1>Provide ingredients you have</h1>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ display: 'flex' }}>
          <div id='searchProducts' style={{ flex: 1, height: '100%', maxWidth: '50%' }}>
            <ProductList items={returned} onItemClick={toggleSelection} />
          </div>
          <div id='myProducts' style={{ flex: 1, maxWidth: '50%' }}>
            <ProductList items={chosenProductsList} onItemClick={toggleSelection} />
            <Link to={'/recipes'}>
              <Button variant="contained" startIcon={<SearchIcon />} style={{ backgroundColor: 'bisque', color: 'black', fontSize: '100%' }} >
                Suggest meal for me
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='right-element' />
    </div>

  );
};

export default Search;