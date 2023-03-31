import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import MyProducts from './pages/MyProducts';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';
import CreateProduct from './pages/CreateProduct';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useState, useEffect } from 'react';

function App() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(userFromLocalStorage);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          productsByUserId: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: cache,
  });

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(user));
  }, [user]);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header user={user} setUser={setUser} />
          <Box sx={{ px: 4, py: 2 }}>
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRoute user={user}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/home'
                element={
                  <ProtectedRoute user={user}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/product/:id'
                element={
                  <ProtectedRoute user={user}>
                    <Product />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/createProduct'
                element={
                  <ProtectedRoute user={user}>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/editproduct/:id'
                element={
                  <ProtectedRoute user={user}>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/myproducts'
                element={
                  <ProtectedRoute user={user}>
                    <MyProducts />
                  </ProtectedRoute>
                }
              />
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route
                path='/register'
                element={<Register setUser={setUser} />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Box>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
