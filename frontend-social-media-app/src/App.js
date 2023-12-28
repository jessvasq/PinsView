import { Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const navigate = useNavigate();

  //important! UseEffect to check if user is logged in or not, if not, redirect to login page
  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    if (User) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);



  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;

