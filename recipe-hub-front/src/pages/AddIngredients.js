import "../css/basicPage.css";
import ProductList from '../components/ProductList';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../components/Searchbar';
import axios from 'axios';
import apiSettings from '../config/apisettings.js';
import { Button } from '@mui/material';


const AddIngredientsPage = () => {
    let {id: recipeId} = useParams();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [chosenProductsList, setChosenProductsList] = useState([]);

    const token = localStorage.getItem('token');

    const handleNavigateButtonClick = () => {
        chosenProductsList.forEach((product) => {
          axios({
            method: 'post',
            url: apiSettings.apiUrlRecipeIngredient,
            data: {
              recipeId: recipeId,
              IngredientId: product.id,
            },
            headers: {
              'Content-Type': 'application/json-patch+json',
              'Authorization': `Bearer ${token}`,
            }
          })
        })
      navigate(`/userPanel`);
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
        const response = await fetch(apiSettings.apiUrlIngredients);
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

    return(
        <div className='background'>
            <div className='container'>
                <h2 className='header'>Add ingredients to your recipe</h2>
                <div className='adding-ingredients-container'>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <div>
                        <div className='searchProducts' style={{ flex: 1, height: '100%', maxWidth: '50%' }}>
                            <ProductList items={returned} onItemClick={toggleSelection} icon='add'/>
                        </div>
                        <div className='myProducts' style={{ flex: 1, maxWidth: '50%', maxHeight: '560px'  }}>
                            <h2>Your ingredients</h2>
                        </div>
                        <div className='scrollable-content'>
                            <ProductList items={chosenProductsList} onItemClick={toggleSelection} icon='remove' />
                        </div>
                    </div>
              </div>   
              <div className="finish-button">
                <Button
                        variant="contained"
                        style={{ backgroundColor: 'bisque', color: 'black', fontSize: '100%' }}
                        onClick={() => handleNavigateButtonClick()}
                        >
                        finish
                    </Button>    
                </div>
            </div>
        </div>
    )
}

export default AddIngredientsPage