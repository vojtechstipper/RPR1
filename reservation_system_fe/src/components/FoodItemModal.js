import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Textarea from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import { getProductById } from '../services/apiService';

const FoodItemModal = ({open,onClose,itemId}) => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [multiSelectValue, setMultiSelectValue] = useState([]);
    const [product, setProduct] = useState(null);
  
    const handleTextFieldChange = (e) => setTextFieldValue(e.target.value);
    const handleSelectChange = (e) => setSelectValue(e.target.value);
    const handleMultiSelectChange = (e) => setMultiSelectValue(e.target.value);





    useEffect(() => {
      async function fetchProduct() {
        if(itemId!=null)
        {
          console.log("fetching product wtih id " + itemId);
          try {
            const response = await getProductById(itemId);
            setProduct(response);
          } catch (error) {
            console.error("Chyba při načítání produktů:", error);
          }
        }
      }
  
      fetchProduct();
  }, []);


    const [alergeny, setAlergeny] = useState([
        { id: 1, nazev: 'Gluten' },
        { id: 2, nazev: 'Laktóza' },
        { id: 3, nazev: 'Ořechy' }
      ]);

      const [kategorie, setKatetorie] = useState([
        { id: 1, nazev: 'Speciality' },
        { id: 2, nazev: 'Čaje' },
        { id: 3, nazev: 'Limonády' }
      ]);

  
    return (
      <div>
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
              top: "50%",
              left: "50%",
              transform: "translate(+100%, +50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <TextField
              label="Název"
              value={textFieldValue}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
            />
            <Textarea minRows={3} placeholder="Popis produktu"></Textarea>
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-label">Select Dropdown</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={selectValue}
                onChange={handleSelectChange}
              >
                {kategorie.map((item) => (
                  <MenuItem value={item.id}>{item.nazev}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="multi-select-label">Alergeny</InputLabel>
              <Select
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={multiSelectValue}
                onChange={handleMultiSelectChange}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
              >
                {alergeny.map((item) => (
                  <MenuItem value={item.id}>{item.nazev}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="success">
              Potvrdit
            </Button>
            <Button variant="contained" color="error">
              Zrušit
            </Button>
          </Box>
        </Modal>
      </div>
    );
  };
  
  export default FoodItemModal;