import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUserRequest } from "../../services/apiService";
import Cookies from "js-cookie";
import { useShoppingCart } from "../../components/ShoppingCartContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearCart } = useShoppingCart();
  const navigate = useNavigate();

    const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      userName: email,
      password: password,
    };

      try {
          const response = await loginUserRequest(userData, navigate);
          if (response) {
              if (response.token && response.userInfo) {
                  Cookies.set("token", response.token, { expires: 7 });

                  localStorage.setItem("userInfo", JSON.stringify(response.userInfo));

                  navigate("/");

                  clearCart();
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
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
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
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "6px",
              },
            }}
          />
          <Link
            to="/forgottenpassword"
            style={{
              color: "white",
              textDecoration: "none",
              textAlign: "right",
              textDecorationLine: "underline",
            }}
          >
            Zapomenuté heslo
          </Link>
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
            přihlásit se
          </Button>
          <Link
            to="/register"
            style={{
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Jsem tu nový
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
