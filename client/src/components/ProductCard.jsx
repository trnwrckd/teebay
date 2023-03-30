import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../mutations/productMutations';

export default function ProductCard({ product, ownProduct = false }) {
  const {
    id,
    title,
    categories,
    description,
    price,
    viewCount,
    purchaseInfo,
    rentInfo,
    createdAt,
  } = product;

  const deleteBtn = useRef(null);
  const deleteModal = useRef(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteProduct, { loading, error, data }] = useMutation(
    DELETE_PRODUCT,
    {
      variables: { id },
    }
  );

  if ((!purchaseInfo && !rentInfo) || ownProduct) {
    return (
      <Link
        to={!ownProduct ? `/product/${id}` : `/editProduct/${id}`}
        onClick={e => {
          if (deleteBtn.current && deleteBtn.current.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
          } else if (
            deleteModal &&
            deleteModal.current &&
            deleteModal.current.contains(e.target)
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box sx={{ p: 3, border: '1px solid lightgrey' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4'>{title}</Typography>
            {ownProduct ? (
              <IconButton
                ref={deleteBtn}
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              >
                <BsFillTrashFill style={{ fontSize: '1.2em' }} />
              </IconButton>
            ) : null}
            <Dialog
              ref={deleteModal}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                Are you sure you want to delete this product?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  This action is irreversible.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteModalOpen(false)} autoFocus>
                  Go back
                </Button>
                <Button onClick={() => deleteProduct()}>Delete</Button>
              </DialogActions>
            </Dialog>
          </Box>
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
        </Box>
      </Link>
    );
  }
  return;
}
