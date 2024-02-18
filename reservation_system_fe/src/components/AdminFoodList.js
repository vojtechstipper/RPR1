import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProduct, getProductsList } from '../services/apiService';
import FoodItemModal from './FoodItemModal';

import Box from '@mui/material/Box';

const FoodList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [selectValue, setSelectValue] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  
  useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await getProductsList();
            setItems(response);
        } catch (error) {
            console.error('Chyba při načítání produktů:', error);
        }
    }

    fetchProducts();
}, []);

  const handleAddItem = () => {
    setEditModalOpen(true);
  };

  const handleEditItem = (index) => {
    setEditItemIndex(index);
    setEditModalOpen(true);
  };

  const handleCancelEdit = () => {
    // Cancel the edit
    console.log("Cancel Edit called");
    setEditItemIndex(null);
    setNewItem('');
    setEditModalOpen(false);
  };

  const handleDeleteItem = async (index) => {
    await deleteProduct(index);
    // const updatedItems = [...items];
    // updatedItems.splice(index, 1);
    // setItems(updatedItems);
  };

  return (    
    <div>
      <Box
        sx={{
          backgroundColor: "#d3d3d3",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "2000px",
          minWidth: "700px",
          margin: "auto",
          width: "95%",
          borderRadius: "12px"
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Přidat produktu
        </Button>
        <List sx={{width:"90%"}}>
          {items.map((item, index) => (
            <ListItem sx={{ backgroundColor: "white", margin:"10px" }} key={index}>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditItem(item.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box> 


      <FoodItemModal open={isEditModalOpen} onClose={handleCancelEdit} itemId={editItemIndex}/>

    </div>
  );
};

export default FoodList;