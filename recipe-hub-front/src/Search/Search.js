import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import ProductList from './ProductList';
import { Button } from '@mui/material';
import '../css/Search.css';
import { Helmet } from 'react-helmet';
import SearchIcon from '@mui/icons-material/Search';
import apiSettings from '../config/apisettings.js'

const Search = () => {
  const [productList, setProductList] = useState([]);

  const [chosenProductsList, setChosenProductsList] = useState([]);

  const navigate = useNavigate();

  const handleNavigateButtonClick = (products) => {
    navigate(`/recipes`, { state: { selectedProducts: products } });
  };

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

  const doSearchLimit10 = (term, query) => {

    if (!productList) return []

    return productList.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10)
  };

  const query = new URLSearchParams(useLocation().search).get('q');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const returned = doSearchLimit10(searchQuery, searchQuery);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiSettings.apiUrl); // Replace with the actual API endpoint for fetching products
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
          <div className='searchProducts' style={{ flex: 1, height: '100%', maxWidth: '50%' }}>
            <ProductList items={returned} onItemClick={toggleSelection} icon='add'/>
          </div>
          <div className='myProducts' style={{ flex: 1, maxWidth: '50%', maxHeight: '560px'  }}>
            <h2>Your ingredients</h2>
            <div className='scrollable-content'>
              <ProductList items={chosenProductsList} onItemClick={toggleSelection} icon='remove' />
            </div>
            <div className="button-wrapper">
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                style={{ backgroundColor: 'bisque', color: 'black', fontSize: '100%' }}
                onClick={() => handleNavigateButtonClick(chosenProductsList)}
                >
                Suggest meal for me
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='right-element' />
    </div>

  );
};

export default Search;