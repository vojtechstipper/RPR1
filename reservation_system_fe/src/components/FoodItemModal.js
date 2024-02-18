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
import {
  getProductById,
  getAllergensDropdown,
  editProduct,
  getProductTypesDropdown,
} from "../services/apiService";

const FoodItemModal = ({open,onClose,itemId}) => {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [textFieldPriceValue, setTextFieldPriceValue] = useState('');
    const [textFieldPriceNameValue, setTextFieldPriceNameValue] = useState('');
    const [textDescriptoion, setTextDescription] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [multiSelectValue, setMultiSelectValue] = useState([]);
    const [product, setProduct] = useState(null);
    const [alergeny, setAlergeny] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const handleTextFieldChange = (e) => setTextFieldValue(e.target.value);
    const handleTextFieldPriceChange = (e) => setTextFieldPriceValue(e.target.value);
    const handleTextFieldPriceNameChange = (e) => setTextFieldPriceNameValue(e.target.value);
    const handleSelectChange = (e) => setSelectValue(e.target.value);
    const handleMultiSelectChange = (e) => setMultiSelectValue(e.target.value);
    const handleTextDescriptionChanged = (e) => setTextDescription(e.target.value);

    const handleExitClicked =  () => {
      itemId = null;
      onClose();
    }

    const handleSaveClicked = async () => {
      console.log("clicked");
      const jsonData = {
        id: itemId,
        name: textFieldValue,
        productTypeId: selectValue,
        allergensIds: multiSelectValue,
        priceLevels: [
          {
            name: textFieldPriceNameValue,
            price: parseInt(textFieldPriceValue),
          },
        ],
      };
      try{
        const response = await editProduct(jsonData);
      }
      catch(error)
      {
        console.error("Chyba při editaci produktu:", error);
      }
    }


    useEffect(() => {
      async function fetchProduct() {     
        if (itemId != null) {         
          try {
            const response = await getProductById(itemId);
            setProduct(response);
            const responseAllergensDropdown = await getAllergensDropdown();
            setAlergeny(responseAllergensDropdown);
            const responseProductTypesDropdown = await getProductTypesDropdown();
            setProductTypes(responseProductTypesDropdown);
            setTextDescription(response.description);
            setTextFieldValue(response.name);
            setSelectValue(response.productTypeId);
            setTextFieldPriceNameValue(response.priceLevel.name)
            setTextFieldPriceValue(response.priceLevel.price)
          } catch (error) {
            console.error("Chyba při načítání produktu:", error);
          }
        }
      }
  
      fetchProduct();
  }, [itemId]);


    return (
      <div>
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
              top: "0%",
              left: "0%",
              transform: "translate(+100%, +10%)",
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
            <Textarea fullwidth minRows={3} value={textDescriptoion} onChange={handleTextDescriptionChanged}></Textarea>
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-label">Select Dropdown</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={selectValue}
                onChange={handleSelectChange}
              >
                {productTypes.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
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
               
                //selected.join(", ")
              
              >
                {alergeny.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Cena"
              type="number"
              value={textFieldPriceValue}
              onChange={handleTextFieldPriceChange}
              
              margin="normal"
            />
              <TextField
              label="Název ceny"
              value={textFieldPriceNameValue}
              onChange={handleTextFieldPriceNameChange}
              
              margin="normal"
            />
            <div>

            <Button variant="contained" color="success" onClick={handleSaveClicked}>
              Potvrdit
            </Button>
            <Button variant="contained" color="error" onClick={handleExitClicked}>
              Zrušit
            </Button>

            </div>
          </Box>
        </Modal>
      </div>
    );
  };
  
  export default FoodItemModal;