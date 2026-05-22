import { useEffect, useState } from 'react';
import axiosSecure from '../utils/axiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiCalendar, FiClock, FiMapPin, FiXCircle } from 'react-icons/fi';

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmed: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300',
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axiosSecure.get('/api/bookings/my');
      setBookings(res.data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e24b4a',
      cancelButtonColor: '#1D9E75',
      confirmButtonText: 'Yes, Cancel It',
      cancelButtonText: 'Keep It',
    });
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/api/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Dashboard</p>
        <h1 className="section-title">My Bookings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{bookings?.length} total booking{bookings?.length !== 1 ? 's' : ''}</p>
      </div>

      {bookings?.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-lg font-medium">No bookings yet!</p>
          <p className="text-sm mt-1">Book a facility to get started.</p>
          <a href="/facilities" className="btn-primary inline-flex mt-4">Browse Facilities</a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings?.map(b => (
            <div key={b._id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{b.facility_name}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize whitespace-nowrap ${statusColors[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><FiCalendar className="text-primary-400" /> {b.booking_date}</span>
                  <span className="flex items-center gap-1"><FiClock className="text-primary-400" /> {b.time_slot}</span>
                  <span className="flex items-center gap-1 font-semibold text-primary-400">৳{b.total_price}</span>
                </div>
              </div>
              {b.status !== 'cancelled' && (
                <button onClick={() => handleCancel(b._id)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-full transition whitespace-nowrap">
                  <FiXCircle /> Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;