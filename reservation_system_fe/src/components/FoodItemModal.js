import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Textarea from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import {
  getProductById,
  getAllergensDropdown,
  editProduct,
  getProductTypesDropdown,
  addProduct,
} from "../services/apiService";

const FoodItemModal = ({open,onClose,itemId}) => {
    const [productName, setProductName] = useState('');
    const [productPriceValue, setProductPriceValue] = useState('');
    const [productPriceName, setProductPriceName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [productAllergensSelected, setProductAllergensSelected] = useState([]);
    const [product, setProduct] = useState(null);
    const [allergens, setAllergens] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const handleProductNameChanged = (e) => setProductName(e.target.value);
    const handleProductPriceValueChanged = (e) => setProductPriceValue(e.target.value);
    const handleProductPriceNameChanged = (e) => setProductPriceName(e.target.value);
    const handleProdutTypeChanged = (e) => setProductType(e.target.value);
    const handleAllergensChanged = (e) => setProductAllergensSelected(e.target.value);
    const handleProductDescriptionChanged = (e) => setProductDescription(e.target.value);

    const handleExitClicked =  () => {
      itemId = null;
      onClose();
    }

    const handleSaveClicked = async () => {
      const jsonData = {
        id: itemId,
        name: productName,
        description: productDescription,
        productTypeId: productType,
        allergensIds: productAllergensSelected,
        priceLevel: 
          {
            name: productPriceName,
            price: parseInt(productPriceValue),
          }        
      };
      try {
            if (itemId != null) {
              await editProduct(jsonData);
            } else {
              await addProduct(jsonData);
            }
          }
     catch (error) {
       console.error("Chyba při vkládání produktu:", error);
     }
}


    useEffect(() => {
      async function fetchProduct() {     
        const responseAllergensDropdown = await getAllergensDropdown();
        setAllergens(responseAllergensDropdown);
        const responseProductTypesDropdown = await getProductTypesDropdown();
        setProductTypes(responseProductTypesDropdown);
        if (itemId != null) {
          try {
            const response = await getProductById(itemId);
            setProduct(response);
            setProductDescription(response.description);
            setProductName(response.name);
            setProductType(response.productTypeId);
            setProductPriceName(response.priceLevel.name);
            setProductPriceValue(response.priceLevel.price);
            setProductAllergensSelected(response.allergensIds);
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
              value={productName}
              onChange={handleProductNameChanged}
              fullWidth
              margin="normal"
            />
            <Textarea fullwidth minRows={3} value={productDescription} onChange={handleProductDescriptionChanged}></Textarea>
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-label">Druh produktu</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={productType}
                onChange={handleProdutTypeChanged}
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
                value={productAllergensSelected}
                onChange={handleAllergensChanged}              
              >
                {allergens.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Cena"
              type="number"
              value={productPriceValue}
              onChange={handleProductPriceValueChanged}              
              margin="normal"
            />
              <TextField
              label="Název ceny"
              value={productPriceName}
              onChange={handleProductPriceNameChanged}              
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