import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/Searchbar';
import ProductList from '../components/ProductList';
import { Button } from '@mui/material';
import '../css/homePage.css';
import { Helmet } from 'react-helmet';
import { orange } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import apiSettings from '../config/apisettings.js';
import Modal from '../components/LoginModal';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Homepage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  
  const DisplayIcon = () => {
    if (localStorage.getItem('token') === null)
    {
      return (
        <div className="loginButton">        
          <Button variant="contained" sx={{ backgroundColor: orange[500], fontSize: 15}} onClick={openModal}>Login</Button>
        </div>
      )
    }
    else {
      return (
        <Link to="/userpanel" className='home-link'>
          <AccountCircleIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }} />
        </Link>
      )
    }
  }

  return (
    <div className='main'>
      {DisplayIcon()}
      <Helmet>
        <style>
            {'body { background-color: #798726; }'}
        </style>
      </Helmet>

      <div className='left-element' >
        <div className='coolHeader'>
          <h1>RecipeHub</h1>
        </div>
        <h2 className='smallHeaders'>With us you're gonna find your dream meal</h2>
        <h3 className='smallHeaders'>Provide ingredients you have and search for your meal</h3>

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
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      <div className='right-element' />
    </div>

  );
  };

export default Homepage;