import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });

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
