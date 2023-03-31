import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { GET_ALL_PRODUCTS } from '../queries/productQueries';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  return (
    <>
      <Typography variant='h4' sx={{ textAlign: 'center', mb: 3 }}>
        All Products
      </Typography>
      <div>
        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : null}

        {error ? <p>Error</p> : null}

        <Box sx={{ width: '50%', mx: 'auto', py: 2 }}>
          {!loading && !error && data.products.length > 0
            ? data.products.map(product => (
                <ProductCard key={product.id} product={product} onHomePage/>
              ))
            : null}
        </Box>
      </div>
    </>
  );
}
