import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';

const sportEmojis = {
  football: '⚽', badminton: '🏸', swimming: '🏊', tennis: '🎾',
  basketball: '🏀', volleyball: '🏐', cricket: '🏏', default: '🏟️'
};

const sportBg = {
  football: 'bg-green-50', badminton: 'bg-blue-50', swimming: 'bg-cyan-50',
  tennis: 'bg-yellow-50', basketball: 'bg-orange-50', volleyball: 'bg-purple-50',
  cricket: 'bg-amber-50', default: 'bg-gray-50'
};

const FacilityCard = ({ facility }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const type = facility.facility_type?.toLowerCase() || 'default';
  const emoji = sportEmojis[type] || sportEmojis.default;
  const bg = sportBg[type] || sportBg.default;

  const handleBook = () => {
    if (!user) { navigate('/login'); return; }
    navigate(`/facility/${facility._id}`);
  };

  return (
    <div className="card overflow-hidden hover:-translate-y-1 transition-all duration-200 hover:shadow-md group">
      {/* Image / Emoji Area */}
      <div className={`relative h-40 flex items-center justify-center ${bg} dark:bg-gray-700`}>
        {facility.image ? (
          <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold text-primary-600 px-2.5 py-1 rounded-full capitalize">
          {facility.facility_type}
        </span>
        {facility.booking_count > 10 && (
          <span className="absolute top-3 right-3 bg-accent-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 truncate">{facility.name}</h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <FiMapPin className="text-xs" />
          <span>{facility.location}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1"><FiUsers /> Cap: {facility.capacity}</span>
          <span className="flex items-center gap-1"><FiClock /> {facility.available_slots?.[0] || 'Multiple slots'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-400 font-bold text-lg">৳{facility.price_per_hour}</span>
            <span className="text-gray-400 text-xs"> /hr</span>
          </div>
          <button onClick={handleBook} className="btn-primary text-xs px-4 py-2">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
