import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import logo from "../static/img/logoCCC.jpeg";
import { useNavigate } from 'react-router-dom';

const UserPasswordResetPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementujte logiku pro resetování hesla
  };

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'white'
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          '&:hover': { bgcolor: 'transparent' },
        }}
        onClick={navigateHome}
      >
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
      </IconButton>
      <Paper elevation={3} sx={{ 
        padding: '64px', 
        width: '100%', 
        maxWidth: '400px', 
        bgcolor: '#16191b', 
        color: 'white', 
        borderRadius: '12px', 
      }}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            ZAPOMENUTÉ HESLO
          </Typography>
          <TextField
            placeholder="E-mail *"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            required
            InputProps={{
              style: { color: 'black', backgroundColor: 'white', borderRadius: '6px' },
            }}
          />
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: 'green',
              '&:hover': {
                bgcolor: 'darkgreen',
              },
              color: 'white',
              padding: '10px',
              marginTop: '10px',
              fontSize: '1rem',
              borderRadius: '6px',
            }} 
            type="submit"
          >
            resetovat heslo
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserPasswordResetPage;
