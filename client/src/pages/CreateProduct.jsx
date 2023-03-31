import React from 'react';
import ProductForm from '../components/ProductForm'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { productSchema } from '../validators';
import { useMutation } from '@apollo/client';
import { GET_ALL_PRODUCTS , GET_PRODUCTS_BY_USER_ID} from '../queries/productQueries';
import { CREATE_PRODUCT} from '../mutations/productMutations';

export default function CreateProduct() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [createProduct, { loading: creating, error: createError }] =
    useMutation(CREATE_PRODUCT, {
      refetchQueries: [
        { query: GET_ALL_PRODUCTS },
        { query: GET_PRODUCTS_BY_USER_ID, variables:{id: userId} },
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
      createProduct({
        variables: {
          title: values.title,
          categories: values.categories,
          description: values.description,
          price: values.price,
          rentPrice: values.rentPrice,
          rentDuration: values.rentDuration,
          viewCount : 0,
          postedBy: userId
        },
        onCompleted: () => {
          navigate(`/myProducts`);
        },
      });
    },
  });
  
  return (
      <ProductForm formik = {formik} loading = {creating} error = {createError} editMode={false}/>

  );
}
