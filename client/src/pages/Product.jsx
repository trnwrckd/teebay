import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID, GET_ALL_PRODUCTS } from '../queries/productQueries';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useMutation } from '@apollo/client';
import { PURCHASE_PRODUCT, RENT_PRODUCT } from '../mutations/productMutations';
import { getRentDurationInString } from '../utils/getRentDurationInString';
import dayjs from 'dayjs';

export default function Product() {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);

  const [purchaseProduct, { loading: purchasing, error: purchaseError }] =
    useMutation(PURCHASE_PRODUCT, {
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID, variables: { id } },
        { query: GET_ALL_PRODUCTS },
      ],
    });
  const [rentProduct, { loading: renting, error: rentError }] = useMutation(
    RENT_PRODUCT,
    {
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID, variables: { id } },
        { query: GET_ALL_PRODUCTS },
      ],
    }
  );

  if (loading)
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
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
      rentPrice,
      rentDuration,
      postedByUser,
    } = data.product;

    return (
      <>
        <Box sx={{ p: 2, mx: 'auto', width: '50%' , border: "1px solid darkslategray"}}>
          <Typography variant='body1' sx={{ mb: 1 , textAlign:"right"}}>
            {`Posted By - ${postedByUser.firstName} ${postedByUser.lastName}`}
          </Typography>
          <Typography variant='h4' sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            Categories: {categories ? categories.join(', ') : 'None'}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            {`Price: $${price} | Rent: $${rentPrice} ${getRentDurationInString(
              rentDuration
            )}`}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            {description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body1'>
              Date Posted:{' '}
              {new Date(createdAt || new Date())
                .toISOString()
                .replace(/T.*/, '')
                .split('-')
                .reverse()
                .join('-')}{' '}
            </Typography>
            <Typography variant='body1'>{viewCount} views</Typography>
          </Box>
          {/* show status if not available */}
          {
            (purchaseInfo || rentInfo) && postedByUser.id !== userId  ? (
              <Box sx={{mt: 2, ml : "auto", width: "100px", p:1 ,backgroundColor:"crimson",borderRadius : "5px" }}>
                <Typography variant="body1" sx={{textAlign:"center", fontSize: ".875rem", color: "white", fontWeight:600}}>
                  {purchaseInfo ? "Sold" : "On Rent"}
                </Typography>
              </Box>
            ) : null
          }
          {/* show buttons if available */}
          {!purchaseInfo && !rentInfo && postedByUser.id !== userId ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                <Button
                  variant='contained'
                  color='success'
                  onClick={() => setBuyModalOpen(true)}
                >
                  Buy
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant='contained'
                  color='error'
                  onClick={() => setRentModalOpen(true)}
                >
                  Rent
                </Button>
              </Box>
              {/* buy modal */}
              <Dialog
                open={buyModalOpen}
                onClose={() => setBuyModalOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  Are you sure you want to buy this product?
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => setBuyModalOpen(false)}
                    variant='contained'
                    color='error'
                  >
                    No
                  </Button>
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ minWidth: '90px' }}
                    onClick={() =>
                      purchaseProduct({
                        variables: {
                          productId: id,
                          productOwner: postedByUser.id,
                          boughtBy: userId,
                        },
                        onCompleted: () => {
                          setBuyModalOpen(false);
                        },
                      })
                    }
                    autoFocus
                  >
                    {purchasing ? <CircularProgress size='1.5em' /> : 'Yes'}
                  </Button>
                  {purchaseError ? (
                    <p style={{ textAlign: 'center' }}>Something went wrong</p>
                  ) : null}
                </DialogActions>
              </Dialog>
              {/* rent modal */}
              <Dialog
                open={rentModalOpen}
                onClose={() => setRentModalOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                sx={{ py: 3, px: 2 }}
              >
                <DialogTitle id='alert-dialog-title'>Rental Period</DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id='alert-dialog-description'
                    sx={{ pt: 2 }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label='From'
                        defaultValue={dayjs(new Date())}
                        sx={{ mr: 2 }}
                      />
                      <DatePicker label='To' />
                    </LocalizationProvider>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setRentModalOpen(false)}
                    variant='contained'
                    color='error'
                  >
                    Go Back
                  </Button>
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ minWidth: '90px' }}
                    onClick={() =>
                      rentProduct({
                        variables: {
                          productId: id,
                          productOwner: postedByUser.id,
                          borrowedBy: userId,
                        },
                        onCompleted: () => {
                          setRentModalOpen(false);
                        },
                      })
                    }
                    autoFocus
                  >
                    {renting ? (
                      <CircularProgress size='1.5em' />
                    ) : (
                      'Confirm Rent'
                    )}
                  </Button>
                  {rentError ? (
                    <p style={{ textAlign: 'center' }}>Something went wrong</p>
                  ) : null}
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </Box>
      </>
    );
  }
}
