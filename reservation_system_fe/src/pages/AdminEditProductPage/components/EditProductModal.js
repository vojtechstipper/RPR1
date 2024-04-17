import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Button, CardMedia, Checkbox, Grid, ListItemText, OutlinedInput} from "@mui/material";
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
import {toast} from "react-toastify";

const EditProductModal = ({open, onClose, itemId}) => {
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
    const handleProductTypeChanged = (e) => setProductType(e.target.value);

    const handleAllergensChanged = (e) => {
        const { target: { value }, } = e;
        const selectedIds = productAllergensSelected.map(alergen => alergen.id);
        const newSelectedAlergens = value.filter(id => !selectedIds.includes(id)).map(id => {
            const foundAlergen = allergens.find(alergen => alergen.id === id);
            return foundAlergen ? { id: foundAlergen.id, name: foundAlergen.name } : null;
        }).filter(Boolean);
        setProductAllergensSelected([...productAllergensSelected, ...newSelectedAlergens]);
    }


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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const handleExitClicked = () => {
        itemId = "";
        setProductUpdate(product)
        onClose();
    };


    const handleImageUploaded = async (e) => {
        const formData = new FormData();
        formData.append("formFile", e.target.files[0]);

        try {
            const res = await uploadImage(formData);
            if (res != null) {
                setImageId(res);

            }
            // Handle the response (e.g., update state or display a success message)
        } catch (ex) {
            console.log(ex);
            // Handle any errors
        }
    };

    const handleSaveClicked = async () => {

        if (!productName || !productPriceValue || !productPriceName) {
            console.error("Název, cena a název ceny musí být vyplněny.");
            toast.error("Název, cena a název ceny musí být vyplněny.");
            itemId = null
            return;
        }

        if (isNaN(productPriceValue) || parseFloat(productPriceValue) <= 0) {
            console.error("Cena musí být kladné číslo.");
            toast.error("Cena musí být kladné číslo.");
            itemId = null;
            return;
        }

        const allergenIds = productAllergensSelected.map(alergen => alergen.id);


        const jsonData = {
            id: itemId,
            name: productName,
            description: productDescription,
            productTypeId: productType,
            allergensIds: allergenIds,
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
        } finally {
            itemId = null
            onClose();
            setProduct(null);
        }
    };

    const setProductUpdate = (product) => {
        if (product === null) {
            setProduct(null);
            setProductName("");
            setProductPriceValue("");
            setProductPriceName("");
            setProductDescription("");
            setProductType("");
            setImageId("");
            setProductAllergensSelected([]);
        } else {
            setProduct(product);
            setProductName(product.name);
            setProductPriceValue(product.priceLevel.price);
            setProductPriceName(product.priceLevel.name);
            setProductDescription(product.description);
            setProductType(product.productTypeId);
            setImageId(product.imageId);
            setProductAllergensSelected(product.allergensIds.map(id => {
                const allergen = allergens.find(item => item.id === id);
                return allergen ? allergen : { id: id, name: 'N/A' }; // Pokud alergen s daným ID existuje, vrátí ho, jinak vytvoří objekt s ID a name jako 'N/A'
            }));
        }
    }

    console.log(productAllergensSelected);


    useEffect(() => {
        async function fetchProduct() {
            const responseAllergensDropdown = await getAllergensDropdown();
            setAllergens(responseAllergensDropdown);
            const responseProductTypesDropdown = await getProductTypesDropdown();
            setProductTypes(responseProductTypesDropdown);

            if (itemId != null) {
                try {
                    const response = await getProductById(itemId);
                    setProductUpdate(response);
                } catch (error) {
                    console.error("Chyba při načítání produktu:", error);
                }
            } else {
                setProductUpdate(null);
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
                    borderRadius: "12px"
                }}
            >
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Název"
                                value={productName}
                                onChange={handleProductNameChanged}
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                multiline
                                fullWidth
                                label="Popis"
                                rows={3}
                                value={productDescription}
                                onChange={handleProductDescriptionChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Druh produktu</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                label="Druh produktu"
                                value={productType}
                                onChange={handleProductTypeChanged}
                            >
                                {productTypes.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{width: 335}}>
                            <InputLabel id="demo-multiple-checkbox-label">Alergeny</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={Array.isArray(productAllergensSelected) ? productAllergensSelected.map(allergen => allergen.name) : []}
                                onChange={handleAllergensChanged}
                                input={<OutlinedInput label="Alergeny"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {allergens.map((allergen) => (
                                    <MenuItem key={allergen.id} value={allergen.id}>
                                        <Checkbox checked={productAllergensSelected ? productAllergensSelected.some(selected => selected.id === allergen.id) : false}/>
                                        <ListItemText primary={allergen.name}/>
                                    </MenuItem>
                                ))}
                            </Select>



                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Cena"
                                type="number"
                                value={productPriceValue}
                                onChange={handleProductPriceValueChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Název ceny"
                                value={productPriceName}
                                onChange={handleProductPriceNameChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item></Grid>
                </Grid>
                <Grid container spacing={5} marginBottom={1} alignItems="center" justifyContent="space-between">
                    <Grid item xs={6}>
                        <CardMedia
                            component="img"
                            sx={{width: 160, height: 100}}
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
                            startIcon={<CloudUploadIcon/>}
                            onChange={handleImageUploaded}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file"/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
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

export default EditProductModal;


