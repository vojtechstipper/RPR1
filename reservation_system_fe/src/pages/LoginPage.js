import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import logo from "../static/img/logoCCC.jpeg";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Zde implementujte logiku pro přihlášení
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
          top: '0px',
          left: '24px',
          '&:hover': { bgcolor: '#f1efef' },
          '& .MuiAvatar-root': {
            width: 48,
            height: 48,
            transition: "width 0.3s ease, height 0.3s ease",
          },
        }}
        onClick={navigateHome}
        color="inherit"
        aria-label="company logo"
      >
        <Avatar src={logo} sx={{ width: 48, height: 48 }} />
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
          PŘIHLÁŠENÍ
        </Typography>
          <TextField
            label=""
            placeholder="E-mail *"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            required
            InputProps={{
              style: { color: 'black', backgroundColor: 'white', borderRadius: '6px'  },
            }}
          />
          <TextField
            label=""
            placeholder="Heslo *"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            required
            InputProps={{
              style: { color: 'black', backgroundColor: 'white', borderRadius: '6px'},
            }}
          />
          <Link to="/forgotPassword" style={{ color: 'white', textDecoration: 'none',textAlign: "right", textDecorationLine: 'underline'   }}>
            Zapomenuté heslo
          </Link>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: 'red',
              '&:hover': {
                bgcolor: '#8b0000',
              },
              color: 'white',
              padding: '10px',
              marginTop: '10px',
              fontSize: '1rem',
              borderRadius: '6px',
            }} 
            type="submit"
          >
            přihlásit se
          </Button>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none',textAlign: "center", textDecorationLine: 'underline'  }}>
            Jsem tu nový
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;