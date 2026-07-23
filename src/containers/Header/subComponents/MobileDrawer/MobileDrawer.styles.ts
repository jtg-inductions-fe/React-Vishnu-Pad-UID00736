import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: '25rem',
        top: '5.5rem',
        height: 'calc(100% - 64px)',
    },
});
