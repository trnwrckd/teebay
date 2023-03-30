import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../queries/productQueries';
import { Box, Typography, Button } from '@mui/material';

export default function Product() {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <p>return</p>;

  if (!loading && !error && data) {
    const {
      title,
      price,
      categories,
      description,
      createdAt,
      viewCount,
      purchaseInfo,
      rentInfo,
      postedByUser,
    } = data.product;

    console.log(postedByUser);

    return (
      <>
        <Box>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='body1'>
            Categories: {categories ? categories.join(', ') : 'None'}
          </Typography>
          <Typography variant='body1'>Price: ${price}</Typography>
          <Typography variant='body1'>
            {description && description.length > 100 ? (
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
          {!purchaseInfo && !rentInfo && postedByUser.id !== userId ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='primary'>Buy</Button>
              <Button variant='secondary'>Rent</Button>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }
}
