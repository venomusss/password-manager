import React from 'react';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/firebase'; 

import AuthRoute from './components/AuthRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';

initializeApp(firebaseConfig); 
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<AuthRoute><HomePage/></AuthRoute>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
