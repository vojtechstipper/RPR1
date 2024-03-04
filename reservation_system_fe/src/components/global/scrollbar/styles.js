import SimpleBar from 'simplebar-react';

import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled('div')(() => ({
    flexGrow: 0,
    height: '100%',
    overflow: 'hidden',
}));

export const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[100], 0.48),
        },
        '&.simplebar-visible:before': {
            opacity: 1,
        },
    },
    '& .simplebar-mask': {
        zIndex: 'inherit',
    },
    '& .simplebar-placeholder': { // Targeting the placeholder div within SimpleBar content
        display: 'none' // Hide the element
    },
}));