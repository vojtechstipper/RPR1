import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getProductsList } from '../services/apiService';
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
    // if (newItem.trim() !== '') {
    //   if (editItemIndex !== null) {
    //     // If editing, update the existing item
    //     const updatedItems = [...items];
    //     updatedItems[editItemIndex] = newItem;
    //     setItems(updatedItems);
    //     setEditItemIndex(null);
    //   } else {
    //     // If adding a new item, add it to the list
    //     setItems([...items, newItem]);
    //   }

    //   // Clear the input field
    //   setNewItem('');
    // }


    setEditModalOpen(true);
  };

  const handleEditItem = (index) => {
    setEditItemIndex(index);
    setEditModalOpen(true);
  };

  const handleSelectChange = (e) => setSelectValue(e.target.value);

  const handleCancelEdit = () => {
    // Cancel the edit
    console.log("Cancel Edit called");
    setEditItemIndex(null);
    setNewItem('');
    setEditModalOpen(false);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleSaveEdit = () => {
    // Save the edited item
    const updatedItems = [...items];
    updatedItems[editItemIndex] = newItem;
    setItems(updatedItems);

    // Close the modal
    setEditItemIndex(null);
    setNewItem('');
    setEditModalOpen(false);
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
                  onClick={() => handleDeleteItem(index)}
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