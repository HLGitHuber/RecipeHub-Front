import "../css/basicPage.css";
import RecipeForm from "../components/RecipeForm";
import LoginModal from "../components/LoginModal";
import { Button } from '@mui/material';
import { orange } from "@mui/material/colors";
import React, { useState } from 'react';
import Modal from '../components/LoginModal';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const AddRecipePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };

    const closeModal = () => {
        setIsModalOpen(false);
      };

    if (!localStorage.getItem('token')){
        return (
            <div className='background'>
                <div className='container'>
                <Link to="/" className='home-link' style={{ top: 50, right: 15 }}>
                    <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }}/>
                </Link>
                    <h1>You need to be logged in to create a new recipe!</h1>
                    <div className="loginButton">        
                        <Button variant="contained" sx={{ backgroundColor: orange[500], fontSize: 15}} onClick={openModal}>Login</Button>
                    </div>
                    <LoginModal/>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        )
    }

    return(
        <div className='background'>
            <div className='container'>
                <Link to="/" className='home-link'>
                    <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange'}}/>
                </Link>
                <RecipeForm/>
            </div>
        </div>
  
    )
}

export default AddRecipePage