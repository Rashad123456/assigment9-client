import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import FacilityCard from '../components/FacilityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch } from 'react-icons/fi';

const TYPES = ['All', 'Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Volleyball', 'Cricket'];

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || 'all';

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (activeType !== 'all') params.type = activeType;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/facilities`, { params });
      setFacilities(res.data);
    } catch {
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFacilities(); }, [activeType]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFacilities();
  };

  return (
    <div className="bg-black min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Our Facilities</h1>
          <p className="text-gray-400">Discover premium venues for your next sports adventure</p>
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
            <input
              className="w-full bg-gray-900 border border-gray-800 rounded-full py-4 pl-12 pr-6 outline-none focus:border-indigo-500 transition"
              placeholder="Search facilities by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setSearchParams({ type: t.toLowerCase() })}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeType === t.toLowerCase()
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >{t}</button>
          ))}
        </div>

        {/* Grid Section */}
        {loading ? <LoadingSpinner /> : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {facilities?.map(f => (
                <motion.div 
                  key={f._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <FacilityCard facility={f} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllFacilities;