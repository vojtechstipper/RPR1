import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import logo from "../../static/img/logoCCC.jpeg";
import Avatar from "@mui/material";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Zde implementujte logiku pro registraci
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
            REGISTRACE
          </Typography>
          <TextField
            placeholder="Jméno *"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            required
            InputProps={{
              style: { color: 'black', backgroundColor: 'white', borderRadius: '6px'  },
            }}
          />
          <TextField
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
            registrovat
          </Button>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', textAlign: "center", marginTop: '10px', textDecorationLine: 'underline' }}>
            Již mám účet
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
