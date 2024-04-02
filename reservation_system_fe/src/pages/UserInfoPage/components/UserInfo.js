import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setUserInfo("");
    }
  }, []);

  if (!userInfo) {
    return <div>Načítání...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        px: { xs: 2, sm: 0 },
      }}
    >
      <Paper elevation={6} sx={{ maxWidth: 800, width: "100%", p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Informace o uživateli
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography
              variant="h6"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              <AccountCircleIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
              {userInfo.firstName} {userInfo.secondName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Email:{" "}
              {userInfo.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Student:{" "}
              {userInfo.isStudent ? "Ano" : "Ne"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {userInfo.isVerified ? (
                <VerifiedUserIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              ) : (
                <BlockIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              )}
              Ověřený uživatel: {userInfo.isVerified ? "Ano" : "Ne"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserInfo;
