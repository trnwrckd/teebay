import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const REGISTER = gql`
  mutation Register(
    $firstName: String
    $lastName: String
    $address: String
    $email: String
    $phone: String
    $password: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      email: $email
      phone: $phone
      password: $password
    ) {
      id
    }
  }
`;

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required'),
  address: yup.string('Enter your address').required('Address is required'),
  phone: yup
    .string('Enter your phone number')
    .required('Phone number is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Field must not be empty'),
});

export default function Register({ setUser }) {
  const [register, { loading, error }] = useMutation(REGISTER);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const togglePasswordVisibility = field => {
    if (field === 'confirm') {
      setShowConfirmPass(!showConfirmPass);
    } else {
      setShowPass(!showPass);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      register({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          phone: values.phone,
          email: values.email,
          password: values.password,
        },
        onCompleted: ({ createUser }) => {
          setUser(createUser.id);
          navigate('/home');
        },
      });
    },
  });

  return (
    <>
      <Box sx={{ width: '50%', mx: 'auto' }}>
        <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
          {' '}
          Register
        </Typography>
        <Box sx={{ px: 3, py: 5, border: '1px solid lightgrey' }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='firstName'
                  name='firstName'
                  label='First Name'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='lastName'
                  name='lastName'
                  label='Last Name'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='address'
                  name='address'
                  label='Address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='email'
                  name='email'
                  label='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='phone'
                  name='phone'
                  label='Phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type={showPass ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => togglePasswordVisibility('password')}
                          onMouseDown={() =>
                            togglePasswordVisibility('password')
                          }
                        >
                          {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  id='confirmPassword'
                  name='confirmPassword'
                  label='Confirm Password'
                  type={showConfirmPass ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirm')}
                          onMouseDown={() =>
                            togglePasswordVisibility('confirm')
                          }
                        >
                          {showConfirmPass ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </Box>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
      {loading && <p>Loading</p>}
      {error && <p>Incorrect Credentials</p>}
    </>
  );
}
