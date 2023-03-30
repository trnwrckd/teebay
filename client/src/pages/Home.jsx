import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../queries/productQueries';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading</p>;
  else if (error) return <p>Something went wrong</p>;
  else if (!loading && !error && data) {
    return (
      <>
        <Typography variant='h2' sx={{ textAlign: 'center' }}>
          All Products
        </Typography>
        <div>
          {data.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }
}
