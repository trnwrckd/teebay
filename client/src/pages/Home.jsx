import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../queries/productQueries';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center', mb: 3 }}>
        All Products
      </Typography>
      <div>
        {loading ? <p>Loading</p> : null}
        {error ? <p>Error</p> : null}
        {!loading && !error && data
          ? data.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          : null}
      </div>
    </>
  );
}
