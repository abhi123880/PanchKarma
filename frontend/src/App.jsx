import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RemedyDetail from './pages/RemedyDetail'; 
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        setCurrentUser(null);
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onSearch={setSearchQuery}
      />
      <main className="min-h-[80vh]">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery} 
                onSelectRemedy={() => {}} 
              />
            }
          />
          <Route path="/remedy/:id" element={<RemedyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/sign-in" element={<SignIn setCurrentUser={setCurrentUser} />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};
export default App;