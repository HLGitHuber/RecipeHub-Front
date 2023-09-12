import { Button, Modal, Box, TextField, Link } from '@mui/material';
import { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform data validation and login logic here
    if (username === 'admin' && password === 'password') {
      // Login successful
      console.log('Logged in');
    } else {
      // Login failed
      console.log('Invalid credentials');
    }
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
                ><TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
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