import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { editUser } from "../../../services/apiService";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editInfo, setEditInfo] = useState({
    id: "",
    firstName: "",
    secondName: "",
    email: "",
    isVerified: true,
    isStudent: true,
    role: "Admin",
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userData = JSON.parse(storedUserInfo);
      setUserInfo(userData);
      setEditInfo({
        ...userData,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keyMap = {
      name: "firstName",
      surname: "secondName",
    };
    const stateKey = keyMap[name] || name;

    setEditInfo((prevEditInfo) => ({
      ...prevEditInfo,
      [stateKey]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      id: editInfo.id,
      name: editInfo.firstName,
      surname: editInfo.secondName,
      email: editInfo.email,
      isVerified: editInfo.isVerified,
      isStudent: editInfo.isStudent,
      role: editInfo.role,
    };

    try {
      const updatedData = await editUser(postData);
      console.log(postData);
      setUserInfo(updatedData);

      setOpenModal(false);
    } catch (error) {
      console.log(postData);
      console.error("Chyba při upravě uživatele:", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

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
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
          <Button variant="outlined" onClick={() => setOpenModal(true)}>
            Editovat údaje
          </Button>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              Editovat údaje
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Jméno"
              name="name"
              value={editInfo.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Příjmení"
              name="surname"
              value={editInfo.surname}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Uložit změny
              </Button>
            </Box>
            <IconButton
              aria-label="close"
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};

export default UserInfo;