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
      {user ? (
        <div>
          <Link
            to='/myproducts'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography variant='body1' sx={{ fontSize: '1.2em' }}>
              My Products
            </Typography>
          </Link>
        </div>
      ) : null}
      <Box>
        {!user ? (
          <Link
            to='/login'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button variant='outlined' sx={{ color: 'black' }}>
              Login
            </Button>
          </Link>
        ) : (
          <Button
            variant='outlined'
            sx={{ color: 'black' }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </Box>
    </Box>
  );
}
