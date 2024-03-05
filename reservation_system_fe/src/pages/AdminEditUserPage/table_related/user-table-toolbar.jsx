import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


// ----------------------------------------------------------------------

export default function UserTableToolbar({filterName, onFilterName}) {
    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'flex-end'

            }}
        >
            <OutlinedInput
                value={filterName}
                onChange={onFilterName}
                placeholder="Hledat uživatele..."
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
            />

        </Toolbar>
    );
}

UserTableToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};