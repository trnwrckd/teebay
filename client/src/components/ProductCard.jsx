import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ProductCard({ product }) {
  const { id, title, categories, description, price, viewCount, createdAt } =
    product;
  return (
    <Box sx={{ p: 3, border: '1px solid lightgrey' }}>
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='body1'>
        Categories: {categories ? categories.join(', ') : 'None'}
      </Typography>
      <Typography variant='body1'>Price: ${price}</Typography>
      <Typography variant='body1'>
        {description.length > 100 ? (
          <>
            ${description.substr(0, 100)}
            <span style={{ color: 'lightBlue' }}>... More Details</span>
          </>
        ) : (
          description
        )}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='body1'>Date Posted: {createdAt} </Typography>
        <Typography variant='body1'>{viewCount} views</Typography>
      </Box>
    </Box>
  );
}
