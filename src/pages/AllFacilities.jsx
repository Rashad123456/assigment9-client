import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
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

  const setType = (t) => setSearchParams({ type: t.toLowerCase() });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Explore</p>
        <h1 className="section-title">All Facilities</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Find the perfect sports venue for your next game</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-10"
            placeholder="Search facilities by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary px-6">Search</button>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        {TYPES.map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeType === t.toLowerCase()
                ? 'bg-primary-400 text-white border-primary-400'
                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-400'
            }`}
          >{t}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : facilities?.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No facilities found for your search.</p>
          <p className="text-sm mt-1">Try a different keyword or sport type.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{facilities?.length} facilities found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities?.map(f => <FacilityCard key={f._id} facility={f} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default AllFacilities;