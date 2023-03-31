import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Tab from '../components/Tab';
import { useQuery } from '@apollo/client';
import {
  GET_PRODUCTS_BY_USER_ID,
  GET_BOUGHT_PRODUCTS_BY_USER_ID,
  GET_SOLD_PRODUCTS_BY_USER_ID,
  GET_LENT_PRODUCTS_BY_USER_ID,
  GET_BORROWED_PRODUCTS_BY_USER_ID,
} from '../queries/productQueries';
import {Link} from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function MyProducts() {
  const [tab, setTab] = useState('Posted By Me');
  const [query, setQuery] = useState(GET_PRODUCTS_BY_USER_ID);
  const [products, setProducts] = useState([]);

  const userId = JSON.parse(localStorage.getItem('userId'));

  const { loading, error, data } = useQuery(query, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (tab === 'Posted By Me') setQuery(GET_PRODUCTS_BY_USER_ID);
    if (tab === 'Bought') setQuery(GET_BOUGHT_PRODUCTS_BY_USER_ID);
    if (tab === 'Sold') setQuery(GET_SOLD_PRODUCTS_BY_USER_ID);
    if (tab === 'Borrowed') setQuery(GET_BORROWED_PRODUCTS_BY_USER_ID);
    if (tab === 'Lent') setQuery(GET_LENT_PRODUCTS_BY_USER_ID);
  }, [tab]);

  useEffect(() => {
    if (data) {
      if (data.productsByUserId) setProducts(data.productsByUserId);
      if (data.boughtProductsByUserId) setProducts(data.boughtProductsByUserId);
      if (data.soldProductsByUserId) setProducts(data.soldProductsByUserId);
      if (data.lentProductsByUserId) setProducts(data.lentProductsByUserId);
      if (data.borrowedProductsByUserId)
        setProducts(data.borrowedProductsByUserId);
    }
  }, [data, tab]);

  return (
    <>
      {/* tabs */}
      <Box
        sx={{
          background: '#ebebeb',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tab label='Posted By Me' tab={tab} setTab={setTab} />
        <Tab label='Bought' tab={tab} setTab={setTab} />
        <Tab label='Sold' tab={tab} setTab={setTab} />
        <Tab label='Borrowed' tab={tab} setTab={setTab} />
        <Tab label='Lent' tab={tab} setTab={setTab} />
      </Box>

      {/* products */}
      {loading ? (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : null}

      {error ? <p>Error</p> : null}

      <Box sx={{ width: '50%', mx: 'auto', py: 2 }}>
        {!loading && !error && data && products.length > 0
          ? products.map(product =>
              tab !== 'Posted By Me' && product.productDetails ? (
                <ProductCard
                  key={product.productDetails.id}
                  product={product.productDetails}
                />
              ) : (
                <ProductCard key={product.id} product={product} ownProduct />
              )
            )
          : null}
        {!loading && !error && data && products.length === 0 ? (
          <Box sx={{display: "flex", justifyContent : "center", flexDirection: "column", alignItems: "center"}}>
            <Typography variant='h5' sx={{ textAlign: 'center' ,display:"block"}}>
            {' '}
            Nothing to show{' '}
          </Typography>
          <Link 
            style={{color: "inherit" , textDecoration: "none", display: "block"}}
            to = {tab === "Posted By Me" || tab === "Sold" || tab === "Lent" ? "/createProduct" : "/"}>
            <Box sx={{background: "#1976d2", borderRadius: "8px", p:1, mt: 1}}>
              <Typography variant="h5" sx={{color: "white"}}>
              {tab === "Posted By Me" || tab === "Sold" || tab === "Lent" ? "Add a product" : "Explore products"}
              </Typography>
              </Box>
          </Link>
            </Box>
        ) : null}
      </Box>
    </>
  );
}
