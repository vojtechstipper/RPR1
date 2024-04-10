
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
import { deleteUser } from '../../../services/apiService';


// ----------------------------------------------------------------------

export default function UserTableRow({
                                         id,
                                         firstName,
                                         secondName,
                                         email,
                                         role,
                                         isVerified,
                                         isStudent,
                                         active,
                                         handleClick,
                                         setItemId,
                                         fetchUsers
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
            await deleteUser(id);
            console.log("Deleting user with id: " + id);
            fetchUsers(); // Znovu načíst uživatele po smazání
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Uživatel nenalezen");
            } else {
                console.error("Chyba při mazání uživatele:", error);
            }
        }
    };


    return (
        <>
            <TableRow hover tabIndex={-1}>
                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2} paddingLeft={2}>
                        <Typography variant="subtitle2" noWrap>
                            {firstName + " " + secondName}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{email}</TableCell>

                <TableCell >{role}</TableCell>

                <TableCell align="center">{isVerified ? 'Ano' : 'Ne'}</TableCell>

                <TableCell align="center">{isStudent ? 'Ano' : 'Ne'}</TableCell>

                <TableCell >{active ? 'Aktivní' : 'Neaktivní'}</TableCell>

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
                    Deaktivovat
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
