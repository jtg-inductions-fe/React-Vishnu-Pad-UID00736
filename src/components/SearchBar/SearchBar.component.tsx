import { useState } from 'react';

import toast from 'react-hot-toast';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, IconButton, InputBase, Paper } from '@mui/material';

import { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({
    placeholder = 'Search...',
    fullWidth = true,
}: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue.trim()) {
            toast('Coming soon in future updates! ', {
                icon: '👀',
            });
            setSearchValue('');
        }
    };

    return (
        <Box
            component='form'
            onSubmit={handleSearchSubmit}
            sx={{ width: fullWidth ? '100%' : 'auto', maxWidth: 600 }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                    },
                    '&:focus-within': {
                        borderColor: 'primary.main',
                        boxShadow: 2,
                    },
                }}
            >
                <InputBase
                    sx={{ ml: 3, flex: 1, py: 1.5 }}
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleInputChange}
                    inputProps={{ 'aria-label': placeholder }}
                />
                <IconButton
                    type='submit'
                    sx={{ p: 3, mr: 0.5, color: 'primary.main' }}
                    aria-label='search'
                >
                    <SearchRoundedIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};
