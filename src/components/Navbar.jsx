import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaTrophy, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition hover:text-primary-400 ${isActive ? 'text-primary-400' : 'text-gray-600 dark:text-gray-300'}`} end>Home</NavLink>
      <NavLink to="/facilities" className={({ isActive }) => `text-sm font-medium transition hover:text-primary-400 ${isActive ? 'text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>All Facilities</NavLink>
      {user && <>
        <NavLink to="/my-bookings" className={({ isActive }) => `text-sm font-medium transition hover:text-primary-400 ${isActive ? 'text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>My Bookings</NavLink>
        <NavLink to="/add-facility" className={({ isActive }) => `text-sm font-medium transition hover:text-primary-400 ${isActive ? 'text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>Add Facility</NavLink>
        <NavLink to="/manage-facilities" className={({ isActive }) => `text-sm font-medium transition hover:text-primary-400 ${isActive ? 'text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>Manage</NavLink>
      </>}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaTrophy className="text-primary-400 text-2xl" />
          <span className="font-display text-2xl text-primary-400 tracking-wider">SportNest</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="text-gray-500 hover:text-primary-400 transition text-lg p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
                <img src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.png'} alt={user.displayName} className="w-9 h-9 rounded-full object-cover border-2 border-primary-400" title={user.displayName} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50" onMouseLeave={() => setDropdownOpen(false)}>
                  <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 font-medium">{user.displayName}</p>
                  <hr className="border-gray-100 dark:border-gray-700 my-1" />
                  <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">My Bookings</Link>
                  <Link to="/add-facility" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Add Facility</Link>
                  <Link to="/manage-facilities" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Manage My Facilities</Link>
                  <hr className="border-gray-100 dark:border-gray-700 my-1" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Login</Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4 flex flex-col gap-3 pt-3">
          {navLinks}
          <hr className="border-gray-100 dark:border-gray-700" />
          {user ? (
            <button onClick={handleLogout} className="text-sm text-red-500 text-left">Logout</button>
          ) : (
            <Link to="/login" className="btn-primary text-center text-sm">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;