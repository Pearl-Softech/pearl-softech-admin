import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Career from './pages/Career';
import Nav from './components/Nav';
import JWTPolice from './utils/JWTPolice';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <main>
      <JWTPolice />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
