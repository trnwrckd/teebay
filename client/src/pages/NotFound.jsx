import React from 'react';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <BsFillExclamationDiamondFill
        style={{ color: 'crimson', fontSize: '5em' }}
      />
      <p>Nothing to see here</p>
      <Link to='/' style={{ textDecoration: 'none', fontSize: '1.5em' }}>
        Go Back
      </Link>
    </Box>
  );
}
