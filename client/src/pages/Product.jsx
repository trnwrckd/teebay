import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../queries/productQueries';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useMutation } from '@apollo/client';
import { PURCHASE_PRODUCT, RENT_PRODUCT } from '../mutations/productMutations';

export default function Product() {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);

  const [purchaseProduct] = useMutation(PURCHASE_PRODUCT);
  const [rentProduct] = useMutation(RENT_PRODUCT);

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

    return (
      <>
        <Box>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='body1'>
            Categories: {categories ? categories.join(', ') : 'None'}
          </Typography>
          <Typography variant='body1'>Price: ${price}</Typography>
          <Typography variant='body1'>{description}</Typography>
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
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='primary' onClick={() => setBuyModalOpen(true)}>
                  Buy
                </Button>
                <Button
                  variant='secondary'
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
                  <Button onClick={() => setBuyModalOpen(false)}>No</Button>
                  <Button
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
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              {/* rent modal */}
              <Dialog
                open={rentModalOpen}
                onClose={() => setRentModalOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  Are you sure you want to buy this product?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    This action is irreversible.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setRentModalOpen(false)}>
                    Go Back
                  </Button>
                  <Button
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
                    Confirm Rent
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </Box>
      </>
    );
  }
}
