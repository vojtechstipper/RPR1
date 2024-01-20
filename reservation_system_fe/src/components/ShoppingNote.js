import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Divider } from "@mui/material";
import Box from "@mui/material/Box";

const ShoppingNote = ({ onTimeChange }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [orderNote, setOrderNote] = useState("");

  const handleNoteChanged = (e) => setOrderNote(e.target.value);


  // Funkce pro získání aktuálního času
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Funkce pro aktualizaci aktuálního času
  function updateCurrentTime() {
    const currentTime = getCurrentTime();
    setCurrentTime(currentTime);
    onTimeChange(currentTime);
  }



  
  // useEffect pro aktualizaci aktuálního času po načtení komponenty
  // TODO: Dostupné časy načítat z BE!
  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentTime();
    }, 1000 * 60); // Aktualizovat každou minutu

    return () => clearInterval(interval);
  }, []); // Prázdné pole zajišťuje, že useEffect bude proveden pouze jednou po načtení komponenty

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        padding: "10px",
        borderRadius: "3px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{ padding: "5px" }}>Poznámka</h3>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Neslouží pro úpravu objednávky"
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            value={orderNote}
            onChange={handleNoteChanged}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container xs={12} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="body1">Objednat na:</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  label="Čas"
                  variant="outlined"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={currentTime}
                  onChange={updateCurrentTime}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingNote;
