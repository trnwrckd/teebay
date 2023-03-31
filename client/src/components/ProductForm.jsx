import React from 'react'
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
  CircularProgress,
  MenuItem,
} from '@mui/material';
import {productCategories} from '../constants/productCategories'

export default function ProductForm({formik, loading, error, editMode = true}) {
  return (
    <Box sx={{ width: '50%', mx: 'auto' }}>
        <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
          {`${editMode ? "Edit Product" : "Create Product"}`}
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
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    options={productCategories}
                    getOptionLabel={option => option}
                    value={formik.values.categories}
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
                    <MenuItem value={'week'}> Per Week</MenuItem>
                    <MenuItem value={'month'}>Per Month</MenuItem>
                    <MenuItem value={'year'}>Per Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                sx={{ minWidth: '90px' }}
              >
                {loading ? <CircularProgress size='1.5em' /> : 'Submit'}
              </Button>
              {error ? (
                <p style={{ textAlign: 'center' }}>Something went wrong</p>
              ) : null}
            </Box>
          </form>
        </Box>
      </Box>
  )
}
