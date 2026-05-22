import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaSwimmer, FaTableTennis } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/facilities`)
      .then(res => {
        if(Array.isArray(res.data)){
           setFacilities(res.data.slice(0, 6)); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching facilities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* 1. Banner Section */}
      <section className="relative bg-primary-900 dark:bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop" 
            alt="Sports Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-accent-400">SportNest</span>
          </h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-300 mb-10">
            Your premium destination to book the best sports facilities. Football, tennis, swimming, and more—reserve your spot today!
          </p>
          <Link 
            to="/facilities" 
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg"
          >
            Explore Facilities
          </Link>
        </div>
      </section>

      {/* 2. Featured Facilities Section (Dynamic) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Facilities</h2>
          <p className="text-gray-600 dark:text-gray-400">Book our most popular venues before they get fully reserved!</p>
        </div>
        
        {loading ? (
          <div className="text-center text-primary-500 font-bold text-xl my-10">
            <span className="animate-pulse">Loading amazing facilities...</span>
          </div>
        ) : facilities?.length === 0 ? (
          <div className="text-center text-gray-500 my-10">
            No facilities found. Please add some from the Owner Panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities?.map((facility) => (
              <div key={facility._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 dark:border-gray-700">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex justify-center items-center overflow-hidden">
                  {facility.image ? (
                    <img src={facility.image} alt={facility.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{facility.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 capitalize">Location: {facility.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-500 font-bold text-lg">৳{facility.price_per_hour} <span className="text-sm font-normal text-gray-500">/ hr</span></span>
                    <Link to={`/facility/${facility._id}`} className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg transition">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
           <Link to="/facilities" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">View All Facilities &rarr;</Link>
        </div>
      </section>

      {/* 3. Extra Section 1: How It Works */}
      <section className="bg-white dark:bg-gray-950 py-16 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Find a Venue</h3>
              <p className="text-gray-600 dark:text-gray-400">Search for your favorite sports facility based on location and type.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Choose Time</h3>
              <p className="text-gray-600 dark:text-gray-400">Select an available time slot that matches your schedule perfectly.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Book & Play</h3>
              <p className="text-gray-600 dark:text-gray-400">Confirm your booking online and enjoy your game without any hassle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Extra Section 2: Popular Sports */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Popular Sports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
            <FaFutbol className="text-5xl text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white">Football Turfs</h3>
          </div>
          <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
            <FaSwimmer className="text-5xl text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white">Swimming Pools</h3>
          </div>
          <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
            <FaTableTennis className="text-5xl text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white">Tennis Courts</h3>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;