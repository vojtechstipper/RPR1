import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Divider, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { getOrderTimesDropdown } from "../../../services/apiService";

const ShoppingNote = ({ onTimeChange,onNoteChange }) => {
  const [times, setTimes] = useState([]);
  const [orderNote, setOrderNote] = useState("");
  const [time, setTime] = useState(getCurrentTime());


  useEffect(() => {
    async function fetchTimes() {
      try {
        const response = await getOrderTimesDropdown();
        setTimes(response);
        setTime(response[0].time)
      } catch (error) {
        console.error("Chyba při načítání alergenů:", error);
      }
    }

    fetchTimes();
  }, []);

  const handleNoteChanged = (e) => 
  {
    setOrderNote(e.target.value);
    onNoteChange(e.target.value);
  }
  const handleTimeChanged = (e) =>{
    setTime(e.target.value);
    onTimeChange(e.target.value);
  } 


  // Funkce pro získání aktuálního času
  function getCurrentTime() {
     const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
     const minutes = now.getMinutes().toString().padStart(2, "0");
    //tady bych jen načetl data z api
    return `${hours}:${minutes}`;
  }

  function formatTime(dateString) {
    const dateTime = new Date(dateString);

    // Extract hours and minutes
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Age"
                  onChange={handleTimeChanged}
                >
                  {times.map((timee) => (
                    <MenuItem value={timee.time}>
                      {formatTime(timee.time)}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingNote;
