import React from 'react';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/firebase'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

initializeApp(firebaseConfig); 
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRoute><HomePage/></AuthRoute>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
