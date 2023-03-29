import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

export default function Login({ setUser }) {
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'trnwrckd@gmail.com',
      password: '123456',
    },
    validationSchema: validationSchema,
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
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
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
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Submit
          </Button>
        </form>
      </div>
      {loading && <p>Loading</p>}
      {error && <p>Incorrect Credentials</p>}
    </>
  );
}
