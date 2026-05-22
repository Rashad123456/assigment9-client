import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosSecure from '../utils/axiosSecure';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FiMapPin, FiUsers, FiDollarSign, FiCalendar, FiClock } from 'react-icons/fi';

const sportEmojis = { football:'⚽', badminton:'🏸', swimming:'🏊', tennis:'🎾', basketball:'🏀', volleyball:'🏐', cricket:'🏏' };

const FacilityDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [form, setForm] = useState({ booking_date: '', time_slot: '', hours: 1 });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/facilities/${id}`)
      .then(res => setFacility(res.data))
      .catch(() => navigate('/facilities'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!facility) return null;

  const totalPrice = form.hours * facility.price_per_hour;
  const type = facility.facility_type?.toLowerCase();
  const emoji = sportEmojis[type] || '🏟️';

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!form.booking_date || !form.time_slot) { toast.error('Please fill all fields'); return; }
    setBookingLoading(true);
    try {
      await axiosSecure.post('/api/bookings', {
        facility_id: facility._id,
        facility_name: facility.name,
        ...form,
        hours: Number(form.hours),
        total_price: totalPrice,
      });
      toast.success('Booking confirmed! 🎉');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="card overflow-hidden mb-6">
            <div className="h-56 bg-primary-50 dark:bg-gray-700 flex items-center justify-center text-8xl relative">
              {facility.image ? (
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
              ) : <span>{emoji}</span>}
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {facility.facility_type}
              </span>
            </div>
            <div className="p-6">
              <h1 className="font-display text-4xl text-gray-900 dark:text-white mb-2">{facility.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1"><FiMapPin /> {facility.location}</span>
                <span className="flex items-center gap-1"><FiUsers /> Capacity: {facility.capacity}</span>
                <span className="flex items-center gap-1"><FiDollarSign /> ৳{facility.price_per_hour}/hr</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{facility.description}</p>
              {facility.available_slots?.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Available Time Slots</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.available_slots.map(slot => (
                      <span key={slot} className="text-xs bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-300 px-3 py-1 rounded-full border border-primary-100 dark:border-gray-600">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-20">
            <h2 className="font-display text-2xl text-gray-900 dark:text-white mb-5">Book This Facility</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facility Name</label>
                <input className="input-field bg-gray-50 dark:bg-gray-700" value={facility.name} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                <input className="input-field bg-gray-50 dark:bg-gray-700" value={user?.email || ''} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><FiCalendar /> Booking Date</label>
                <input type="date" className="input-field" min={new Date().toISOString().split('T')[0]} value={form.booking_date} onChange={e => setForm(f => ({ ...f, booking_date: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><FiClock /> Time Slot</label>
                <select className="input-field" value={form.time_slot} onChange={e => setForm(f => ({ ...f, time_slot: e.target.value }))} required>
                  <option value="">Select a time slot</option>
                  {(facility.available_slots || ['06:00 AM - 08:00 AM', '08:00 AM - 10:00 AM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM']).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hours</label>
                <input type="number" className="input-field" min="1" max="8" value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} />
              </div>
              <div className="bg-primary-50 dark:bg-gray-700 rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Total Price</span>
                <span className="font-display text-2xl text-primary-400">৳{totalPrice}</span>
              </div>
              <button type="submit" disabled={bookingLoading} className="btn-primary w-full justify-center flex items-center gap-2">
                {bookingLoading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span> : null}
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;