import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { productSchema } from '../validators';
import { useMutation } from '@apollo/client';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../queries/productQueries';
import { UPDATE_PRODUCT } from '../mutations/productMutations';
import ProductForm from '../components/ProductForm'

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  //queries and mutations
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const [updateProduct, { loading: updating, error: updateError }] =
    useMutation(UPDATE_PRODUCT, {
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID, variables: { id } },
        { query: GET_ALL_PRODUCTS },
      ],
    });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      categories: [],
      price: '',
      rentPrice: '',
      rentDuration: '',
      enableReinitialize: true,
    },
    validationSchema: productSchema,
    onSubmit: values => {
      updateProduct({
        variables: {
          id: id,
          title: values.title,
          categories: values.categories,
          description: values.description,
          price: values.price,
          rentPrice: values.rentPrice,
          rentDuration: values.rentDuration,
        },
        onCompleted: () => {
          navigate(`/product/${id}`);
        },
      });
    },
  });

  useEffect(() => {
    if (data && data.product) {
      formik.setValues({
        title: data.product.title,
        description: data.product.description,
        categories: data.product.categories,
        price: data.product.price,
        rentPrice: data.product.rentPrice,
        rentDuration: data.product.rentDuration,
      });
    }
  }, [data]);

  if (loading)
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  if (error){
      return (<Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <p>Something went wrong</p>
      </Box>)
  }  

  if (!loading && !error) {
    return (
      <ProductForm formik = {formik} loading = {updating} error = {updateError}/>
    );
  }
}
