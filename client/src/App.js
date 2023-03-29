import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Router>
        <Header />
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
            <Route path='/login' element={<Login />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
