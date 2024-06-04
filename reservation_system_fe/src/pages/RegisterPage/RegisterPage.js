import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { registerUserRequest } from "../../services/apiService";
import Cookies from "js-cookie";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordAgainChange = (event) => {
    setPasswordAgain(event.target.value);
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            surname: surname,
            email: email,
            password: password,
        };

        try {
            const response = await registerUserRequest(userData, navigate);
            if (response) {
                if (response.token && response.userInfo) {
                    Cookies.set("token", response.token, { expires: 7 });

                    // Save user info
                    localStorage.setItem("userInfo", JSON.stringify(response.userInfo));

                    navigate("/");

                    localStorage.setItem("logged_in", true);
                    window.dispatchEvent(new CustomEvent("authChanged", {
                        detail: { isLoggedIn: true }
                    }));
                } else {
                    console.error("Missing token or user information in the response.");
                }
            } else {
                console.error("Response is undefined.");
            }
        } catch (error) {
            console.error("Login failed:", error);

            const errorStatus = error.response && error.response.status ? error.response.status : "Unknown error status";
            navigate("/error", { state: { error: errorStatus } });
        }
    };


  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
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
      <IconButton
        sx={{
          position: "absolute",
          top: "0px",
          left: "24px",
          "&:hover": { bgcolor: "#f1efef" },
          "& .MuiAvatar-root": {
            width: 48,
            height: 48,
            transition: "width 0.3s ease, height 0.3s ease",
          },
        }}
        onClick={navigateHome}
        color="inherit"
        aria-label="company logo"
      ></IconButton>
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
            REGISTRACE
          </Typography>
          <TextField
            placeholder="Jméno *"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
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
            placeholder="Příjmení *"
            variant="outlined"
            value={surname}
            onChange={handleSurnameChange}
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
            placeholder="Heslo *"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
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
            placeholder="Heslo znovu*"
            type="password"
            variant="outlined"
            value={passwordAgain}
            onChange={handlePasswordAgainChange}
            required
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
            registrovat
          </Button>
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "10px",
              textDecorationLine: "underline",
            }}
          >
            Již mám účet
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
