import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosSecure from '../utils/axiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

const SPORT_TYPES = ['Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Volleyball', 'Cricket', 'Table Tennis'];
const DEFAULT_SLOTS = ['06:00 AM - 08:00 AM', '08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM', '08:00 PM - 10:00 PM'];

const EditFacility = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slots, setSlots] = useState([]);
  const [customSlot, setCustomSlot] = useState('');
  const [form, setForm] = useState({ name: '', facility_type: '', image: '', location: '', price_per_hour: '', capacity: '', description: '' });

  useEffect(() => {
    axiosSecure.get(`/api/facilities/${id}`)
      .then(res => {
        const f = res.data;
        setForm({ name: f.name || '', facility_type: f.facility_type || '', image: f.image || '', location: f.location || '', price_per_hour: f.price_per_hour || '', capacity: f.capacity || '', description: f.description || '' });
        setSlots(f.available_slots || []);
      })
      .catch(() => navigate('/manage-facilities'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const toggleSlot = (slot) => setSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  const addCustomSlot = () => { if (customSlot && !slots.includes(customSlot)) { setSlots(s => [...s, customSlot]); setCustomSlot(''); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosSecure.put(`/api/facilities/${id}`, { ...form, price_per_hour: Number(form.price_per_hour), capacity: Number(form.capacity), available_slots: slots });
      toast.success('Facility updated!');
      navigate('/manage-facilities');
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Owner Panel</p>
        <h1 className="section-title">Edit Facility</h1>
      </div>
      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facility Name</label>
              <input name="name" className="input-field" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sport Type</label>
              <select name="facility_type" className="input-field" value={form.facility_type} onChange={handleChange} required>
                {SPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
            <input name="image" className="input-field" value={form.image} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <input name="location" className="input-field" value={form.location} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Per Hour (৳)</label>
              <input name="price_per_hour" type="number" className="input-field" value={form.price_per_hour} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
              <input name="capacity" type="number" className="input-field" value={form.capacity} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Slots</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {DEFAULT_SLOTS.map(slot => (
                <button type="button" key={slot} onClick={() => toggleSlot(slot)} className={`text-xs px-3 py-1.5 rounded-full border transition ${slots.includes(slot) ? 'bg-primary-400 text-white border-primary-400' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-400'}`}>
                  {slot}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="input-field text-sm" placeholder="Custom slot" value={customSlot} onChange={e => setCustomSlot(e.target.value)} />
              <button type="button" onClick={addCustomSlot} className="btn-outline px-3 text-sm flex items-center gap-1"><FiPlus /></button>
            </div>
            {slots.filter(s => !DEFAULT_SLOTS.includes(s)).map(s => (
              <span key={s} className="inline-flex items-center gap-1 bg-primary-50 dark:bg-gray-700 text-primary-600 text-xs px-3 py-1 rounded-full border border-primary-100 mt-2 mr-2">
                {s} <button type="button" onClick={() => setSlots(p => p.filter(x => x !== s))}><FiX /></button>
              </span>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea name="description" className="input-field resize-none" rows={4} value={form.description} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            {saving && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFacility;