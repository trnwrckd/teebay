import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { productSchema } from '../validators';
import { useMutation } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../queries/productQueries';
import { UPDATE_PRODUCT } from '../mutations/productMutations';

const productCategories = [
  'Electronics',
  'Furniture',
  'Home Appliances',
  'Sporting Goods',
  'Outdoor',
  'Toys',
];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);
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

  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;

  if (!loading && !error && data) {
    return (
      <Box sx={{ width: '50%', mx: 'auto' }}>
        <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
          {' '}
          Edit Product
        </Typography>
        <Box sx={{ px: 3, py: 5, border: '1px solid lightgrey' }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='title'
                  name='title'
                  label='Title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              {data.product.categories ? (
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    options={productCategories}
                    getOptionLabel={option => option}
                    defaultValue={data.product.categories}
                    onChange={(event, newValue) => {
                      formik.setFieldValue(
                        'categories',
                        newValue.map(option => option.value || option)
                      );
                    }}
                    id='categories'
                    name='categories'
                    filterSelectedOptions
                    renderInput={params => (
                      <TextField {...params} label='Product Categories' />
                    )}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  maxRows={10}
                  id='description'
                  name='description'
                  label='Description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type='number'
                  sx={{ mb: 2 }}
                  fullWidth
                  id='price'
                  name='price'
                  label='Price'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type='number'
                  sx={{ mb: 2 }}
                  fullWidth
                  id='rentPrice'
                  name='rentPrice'
                  label='Rent Price'
                  value={formik.values.rentPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rentPrice && Boolean(formik.errors.rentPrice)
                  }
                  helperText={
                    formik.touched.rentPrice && formik.errors.rentPrice
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Rent Duration
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='rentDuration'
                    name='rentDuration'
                    value={formik.values.rentDuration}
                    label='Rent Duration'
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'hour'}>Per Hour</MenuItem>
                    <MenuItem value={'day'}> Per Day</MenuItem>
                    <MenuItem value={'month'}>Per Month</MenuItem>
                    <MenuItem value={'year'}>Per Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    );
  }
}
