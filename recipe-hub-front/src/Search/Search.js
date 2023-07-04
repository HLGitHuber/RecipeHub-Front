import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './Searchbar';
import ProductList from './ProductList';

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
          name: item.name, // Update to use the "name" property from the API response
        }));
        setProductList(updatedProductList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    fetchProducts();
  }, []);


  return (
    <div>
      <h1>Search</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ backgroundColor: 'green' }}>
        <div style={{ display: 'inline-block', width: '50%', maxWidth: '200px', border: '1px solid black' }}>
          <ProductList items={returned} onItemClick={toggleSelection} />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'top', width: '50%', maxWidth: '200px', border: '1px solid black' }}>
          <ProductList items={chosenProductsList} onItemClick={toggleSelection} />
        </div>
      </div>
    </div>
  );
};

export default Search;

