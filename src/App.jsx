import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllFacilities from './pages/AllFacilities';
import FacilityDetails from './pages/FacilityDetails';
import MyBookings from './pages/MyBookings';
import AddFacility from './pages/AddFacility';
import ManageFacilities from './pages/ManageFacilities';
import EditFacility from './pages/EditFacility';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('sportnest-dark');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sportnest-dark', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', fontSize: '14px' } }} />
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/facilities" element={<AllFacilities />} />
                <Route path="/facility/:id" element={<PrivateRoute><FacilityDetails /></PrivateRoute>} />
                <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
                <Route path="/add-facility" element={<PrivateRoute><AddFacility /></PrivateRoute>} />
                <Route path="/manage-facilities" element={<PrivateRoute><ManageFacilities /></PrivateRoute>} />
                <Route path="/edit-facility/:id" element={<PrivateRoute><EditFacility /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
