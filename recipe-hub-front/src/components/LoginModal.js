import { Button, Modal, Box, TextField, Link } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import apiSettings from '../config/apisettings';

const LoginModal = ({ isOpen, onClose }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: 'options',
      url: apiSettings.apiUrlUserLogin,
      data: {
        'userName': username,
        'password': password,
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert("You're succesfully logged in")
      onClose();
    })
    .catch(error => {
      if (error.response.status === 401 || error.response.status === 400){
        console.log(error);
        setError('Invalid Username or Password');
      } else {
        setError('An error occurred');
      }
    })


    
  };

  if (!isOpen) return null;

  return (
    <div className="modal"> 
        <div className='modal-content'>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'bisque',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    }}
                >
                { error && <p>{error}</p> }
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button><br/>
                <div>
                    Don't have account yet?
                    <Link href="/registration"> Sign Up!</Link>
                </div>
                
                </Box>
            </Modal>
        </div>
    </div>

);
};

export default LoginModal;