import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const sportEmojis = {
  football: '⚽', badminton: '🏸', swimming: '🏊', tennis: '🎾',
  basketball: '🏀', volleyball: '🏐', cricket: '🏏', default: '🏟️'
};

const FacilityCard = ({ facility }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const type = facility.facility_type?.toLowerCase() || 'default';
  const emoji = sportEmojis[type] || sportEmojis.default;

  const handleBook = () => {
    if (!user) { navigate('/login'); return; }
    navigate(`/facility/${facility._id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300"
    >
      {/* Image / Emoji Area */}
      <div className="relative h-56 flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {facility.image ? (
          <img src={facility.image} alt={facility.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
        ) : (
          <span className="text-7xl">{emoji}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        
        <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full capitalize border border-white/20">
          {facility.facility_type}
        </span>
        
        {facility.booking_count > 10 && (
          <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            Popular
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-3 truncate">{facility.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <FiMapPin className="text-indigo-500" />
          <span>{facility.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl">
          <span className="flex items-center gap-1.5"><FiUsers className="text-indigo-500" /> {facility.capacity} pax</span>
          <span className="flex items-center gap-1.5"><FiClock className="text-indigo-500" /> {facility.available_slots?.[0] || 'Flexible'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">৳{facility.price_per_hour}</span>
            <span className="text-gray-400 text-sm ml-1">/hr</span>
          </div>
          <button 
            onClick={handleBook} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/30"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityCard;