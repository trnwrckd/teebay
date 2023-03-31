import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function Header({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center ',
        backgroundColor: '#ebebeb',
      }}
    >
      <div>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography variant='h4'>TeeBay</Typography>
        </Link>
      </div>
      <Box>
        {!user ? (
          <Link
            to='/login'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button variant='contained' color='primary'>
              Log In
            </Button>
          </Link>
        ) : (
          <>
            <Link
              to='/myproducts'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Button variant='contained' color='success'>
                My Products
              </Button>
            </Link>
            <Link
              to='/createProduct'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Button sx={{ ml: 2 }} variant='contained' color='primary'>
                Create Product
              </Button>
            </Link>
            <Button
              sx={{ ml: 2 }}
              variant='contained'
              color='error'
              onClick={handleLogout}
            >
              Log out
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
