
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProduct } from '../../../services/apiService';


// ----------------------------------------------------------------------

export default function UserTableRow({
                                         id,
                                         name,
                                         productType,
                                         price,
                                         handleClick,
                                         setItemId,
                                         fetchProduct
                                     }) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };


    const handleEditItem = () => {
        handleClick()
        handleCloseMenu()
        setItemId(id)
        console.log("idecko " + id);
    }

    const handleDeleteItem = async () => {
        handleCloseMenu();
        try {
            await deleteProduct(id);
            console.log("Deleting product with id: " + id);
            fetchProduct(); // Znovu načíst uživatele po smazání
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Produkt nenalezen");
            } else {
                console.error("Chyba při mazání produktu:", error);
            }
        }
    };


    return (
        <>
            <TableRow hover tabIndex={-1}>

                <TableCell>
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </TableCell>

                <TableCell >{productType}</TableCell>

                <TableCell align="center">{price}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={() => handleEditItem()}>
                    <EditIcon  />
                    Upravit
                </MenuItem>

                <MenuItem onClick={() => handleDeleteItem()} sx={{ color: 'error.main' }}>
                    <DeleteIcon />
                    Smazat
                </MenuItem>
            </Popover>
        </>
    );
}

UserTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
