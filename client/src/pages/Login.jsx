import React , {useState} from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../mutations/userMutations';
import { loginSchema } from '../validators/index';

export default function Login({ setUser }) {
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      login({
        variables: { email: values.email, password: values.password },
        onCompleted: ({ login }) => {
          setUser(login.id);
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
          Log In
        </Typography>
        <Box sx={{ px: 3, py: 5, border: '1px solid lightgrey' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mb: 4 }}
              fullWidth
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 4 }}
              fullWidth
              id='password'
              name='password'
              label='Password'
              type={showPass ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPass(!showPass)}
                          onMouseDown={() =>
                            setShowPass(!showPass)
                          }
                        >
                          {showPass ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </Box>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link to='/register' style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
      {loading && (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <p style={{ color: 'crimson' }}>Incorrect Credentials</p>
        </Box>
      )}
    </>
  );
}
