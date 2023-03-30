import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const registerSchema = yup.object({
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

const productSchema = yup.object({
  title: yup
    .string('Enter product title')
    .required('Product title is required'),
  description: yup
    .string('Enter product description')
    .required('Product Description is required'),
  categories: yup
    .array(yup.string().required())
    .min(1, 'Product category is required'),
  price: yup.string('Enter product price').required('Price is required'),
  rentPrice: yup.string('Enter rent price').required('Rent price is required'),
  rentDuration: yup
    .string('Enter rent duration')
    .required('Rent duration is required'),
});

export { loginSchema, registerSchema, productSchema };
