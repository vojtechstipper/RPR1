import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { resetPassword, resetSetNewPassword } from '../../services/apiService';
import { useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordEquals, setPasswordEquals] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordResetCodeChanged = (event) => {
    setPasswordResetCode(event.target.value);
  };
  const handlePasswordChanged = (event) => {
    setPassword(event.target.value);
    if (password === passwordAgain) setPasswordEquals(true);
    else setPasswordEquals(false);
  };
  const handlePasswordAgainChanged = (event) => {
    
    setPasswordAgain(event.target.value);
    if(password===passwordAgain) setPasswordEquals(true);
      else setPasswordEquals(false)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(showCode)
      {
        const userData = {
          userEmail: email,
          passwordResetCode: passwordResetCode,
          newPassword: password,
        };
        
        try {
          const response = await resetSetNewPassword(userData);
          if (response) navigate("/login");
        }
        catch{}
      }
      else{

        const userData = {
          userEmail: email
        };
        
        try {
          const response = await resetPassword(userData);
          setShowCode(true)
        }
        catch{}
      }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "white",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "64px",
          width: "100%",
          maxWidth: "400px",
          bgcolor: "#16191b",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
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
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
            }}
          />
          <TextField
            placeholder="Obnovovací kód "
            variant="outlined"
            hidden={!showCode}
            value={passwordResetCode}
            onChange={handlePasswordResetCodeChanged}
            required
            InputProps={{
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
            }}
          />
          <TextField
            placeholder="Nové heslo *"
            type="password"
            variant="outlined"
            value={password}
            hidden={!showCode}
            onChange={handlePasswordChanged}
            required
            InputProps={{
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
            }}
          />
          <TextField
            placeholder="Nové heslo znovu*"
            type="password"
            variant="outlined"
            value={passwordAgain}
            hidden={!showCode}
            onChange={handlePasswordAgainChanged}
            required
            error={passwordEquals}
            helperText={!passwordEquals ? null : "Hesla se musí shodovat"}
            InputProps={{
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              bgcolor: "red",
              "&:hover": {
                bgcolor: "#8b0000",
              },
              color: "white",
              padding: "10px",
              marginTop: "10px",
              fontSize: "1rem",
              borderRadius: "6px",
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

export default PasswordResetPage;
