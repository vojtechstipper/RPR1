import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button, CardMedia, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getProductById,
  getAllergensDropdown,
  editProduct,
  getProductTypesDropdown,
  addProduct,
  uploadImage,
} from "../../../services/apiService";
import "react-toastify/dist/ReactToastify.css";

const FoodItemModal = ({ open, onClose, itemId }) => {
  const [productName, setProductName] = useState("");
  const [productPriceValue, setProductPriceValue] = useState("");
  const [productPriceName, setProductPriceName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [imageId, setImageId] = useState("");
  const [productAllergensSelected, setProductAllergensSelected] = useState([]);
  const [product, setProduct] = useState(null);
  const [allergens, setAllergens] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const handleProductNameChanged = (e) => setProductName(e.target.value);
  const handleProductPriceValueChanged = (e) =>
    setProductPriceValue(e.target.value);
  const handleProductPriceNameChanged = (e) =>
    setProductPriceName(e.target.value);
  const handleProdutTypeChanged = (e) => setProductType(e.target.value);
  const handleAllergensChanged = (e) =>
    setProductAllergensSelected(e.target.value);
  const handleProductDescriptionChanged = (e) =>
    setProductDescription(e.target.value);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleExitClicked = () => {
    itemId = null;
    onClose();
  };

  const handleSaveClicked = async () => {
    const jsonData = {
      id: itemId,
      name: productName,
      description: productDescription,
      productTypeId: productType,
      allergensIds: productAllergensSelected,
      imageId: imageId,
      priceLevel: {
        name: productPriceName,
        price: parseInt(productPriceValue),
      },
    };
    try {
      if (itemId != null) {
        await editProduct(jsonData);
      } else {
        await addProduct(jsonData);
      }
    } catch (error) {
      console.error("Chyba při vkládání produktu:", error);
    }
    itemId=null;
    onClose();
  };

  const handleImageUploaded = async (e) => {
    const formData = new FormData();
    formData.append("formFile", e.target.files[0]);

    try {
      const res = await uploadImage(formData);
      if (res != null) 
      {
        setImageId(res);

      }
      // Handle the response (e.g., update state or display a success message)
    } catch (ex) {
      console.log(ex);
      // Handle any errors
    }
  };

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
      else{
        setProduct(null);
        setProductDescription("");
        setProductName("");
        setProductType("");
        setProductPriceName("");
        setProductPriceValue("");
        setProductAllergensSelected([]);
      }
    }

    fetchProduct();
  }, [itemId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          required
          label="Název"
          value={productName}
          onChange={handleProductNameChanged}
          fullWidth
          margin="normal"
        />
        <TextField
          multiline
          fullWidth
          label="Popis"
          rows={3}
          value={productDescription}
          onChange={handleProductDescriptionChanged}
        ></TextField>
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
          fullWidth
          required
          label="Cena"
          type="number"
          value={productPriceValue}
          onChange={handleProductPriceValueChanged}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Název ceny"
          value={productPriceName}
          onChange={handleProductPriceNameChanged}
          margin="normal"
        />
        <Grid container spacing={12} marginBottom={1}>
        <Grid item  xs={6}>
        <CardMedia
          component="img"
          sx={{ width: 160, height: 100 }}
          image={`https://localhost:7038/${product?.imageId ?? ""}`} //uložit do configu jako baseUrl
          alt="Foto produktu"
        />
        </Grid>
         <Grid item xs={6}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleImageUploaded}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
         </Grid>
        </Grid>
        <Grid container spacing={12} >
          <Grid item xs>
            <Button
              variant="contained"
              color="error"
              onClick={handleExitClicked}
            >
              Zrušit
            </Button>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveClicked}
            >
              Potvrdit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default FoodItemModal;
