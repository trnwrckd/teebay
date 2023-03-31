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
  CircularProgress,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../mutations/productMutations';
import { getRentDurationInString } from '../utils/getRentDurationInString';
import { GET_PRODUCTS_BY_USER_ID } from '../queries/productQueries';

export default function ProductCard({ product, ownProduct = false , onHomePage = false}) {
  const {
    id,
    title,
    categories,
    description,
    price,
    rentPrice,
    rentDuration,
    purchaseInfo,
    rentInfo,
    viewCount,
    createdAt,
  } = product;

  const deleteBtn = useRef(null);
  const deleteModal = useRef(null);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteProductFromDB, { loading, error }] = useMutation(DELETE_PRODUCT, {
    variables: { id },
    update(cache, { data: { deleteProduct } }) {
      const { productsByUserId } = cache.readQuery({
        query: GET_PRODUCTS_BY_USER_ID,
        variables : {
          id: userId
        }
      });
      cache.writeQuery({
        query: GET_PRODUCTS_BY_USER_ID,
        variables : {
          id: userId
        },
        data: {
          productsByUserId: productsByUserId.filter(product =>{ 
            return product.id !== deleteProduct.id
          }),
        },
      });
    },
    onCompleted: () => {
      setDeleteModalOpen(false)
    }
  });

    return (
      <Link
        to={!ownProduct ? `/product/${id}` : `/editProduct/${id}`}
        //  Link > Button caused event bubbling when clicked on button
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
        <Box sx={{ p: 3, my: 2, border: '1px solid darkslategrey' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4' sx={{mb:1}}>{title}</Typography>
            {/* ownProduct prop comes from My Products > Posted By Me */}
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
            {/* onHomePage is used to show product status */}
            {onHomePage && (purchaseInfo || rentInfo) ? (
              <Box sx={{ p:1 ,backgroundColor:"crimson",borderRadius : "5px" }}>
                <Typography variant="body1" sx={{fontSize: ".875rem", color: "white", fontWeight:600}}>
                  {purchaseInfo ? "Sold" : "On Rent"}
                </Typography>
              </Box>
            ) : null}
            {/* Delete Modal */}
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
                <Button
                  onClick={() => setDeleteModalOpen(false)}
                  variant='contained'
                  color='primary'
                  autoFocus
                >
                  Go back
                </Button>
                <Button
                  onClick={() => deleteProductFromDB()}
                  variant='contained'
                  color='error'
                  sx={{ minWidth: '90px' }}
                >
                  {loading ? <CircularProgress size='1.5em' /> : 'Delete'}
                </Button>
                {error ? (
                  <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                    <p>Something went wrong</p>
                  </Box>
                ) : null}
              </DialogActions>
            </Dialog>
          </Box>
          <Typography variant='body1' sx={{mb:1}}>
            Categories: {categories ? categories.join(', ') : 'None'}
          </Typography>
          <Typography variant='body1' sx={{mb:1}}>{`Price: $${price} | Rent: $${rentPrice} ${getRentDurationInString(
            rentDuration
          )}`}</Typography>
          <Typography variant='body1' sx={{mb:1}}>
            {description && description.length > 100 ? (
              <>
                ${description.substr(0, 100)}
                <span style={{ color: '#1976d2' }}>{" ... More Details"}</span>
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
        </Box>
      </Link>
    );
}
