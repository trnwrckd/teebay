import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center ',
        backgroundColor: '#ebebeb',
      }}
    >
      <p>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography variant='h4'>TeeBay</Typography>
        </Link>
      </p>
      <Box>
        <Link to='/login' style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button variant='outlined' sx={{ color: 'black' }}>
            Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
