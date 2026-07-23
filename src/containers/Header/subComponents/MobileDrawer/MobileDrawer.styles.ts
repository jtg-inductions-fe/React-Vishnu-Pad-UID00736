import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: theme.spacing(60),
        height: 'calc(100% - 2)',
    },
}));
