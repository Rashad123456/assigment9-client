import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosSecure from '../utils/axiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiEdit2, FiTrash2, FiMapPin, FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext'; 

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 

  const fetchFacilities = async () => {
    if (!user?.email) return; 
    
    try {
      setLoading(true);
      // ব্যাকএন্ডের রিকোয়ারমেন্ট অনুযায়ী ইমেইল কুয়েরি প্যারামিটার (?email=...) যোগ করা হলো
      const res = await axiosSecure.get(`/api/facilities/my/facilities?email=${user.email}`);
      setFacilities(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchFacilities();
    } else {
      setLoading(false); 
    }
  }, [user]);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete "${name}"?`,
      text: 'All bookings for this facility will also be affected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e24b4a',
      cancelButtonColor: '#1D9E75',
      confirmButtonText: 'Delete',
    });
    if (!result.isConfirmed) return;
    try {
      await axiosSecure.delete(`/api/facilities/${id}`);
      toast.success('Facility deleted');
      fetchFacilities();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-black min-h-screen">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Owner Panel</p>
          <h1 className="section-title text-white">Manage My Facilities</h1>
        </div>
        <Link to="/add-facility" className="btn-primary flex items-center gap-1 text-sm">
          <FiPlus /> Add New
        </Link>
      </div>

      {facilities?.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🏟️</p>
          <p className="text-lg font-medium">No facilities yet.</p>
          <Link to="/add-facility" className="btn-primary inline-flex mt-4">Add First Facility</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {facilities?.map(f => (
            <div key={f._id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-900 border border-gray-800">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-lg">{f.name}</h3>
                  <span className="text-xs bg-primary-900 text-primary-300 px-2.5 py-0.5 rounded-full capitalize">{f.facility_type}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><FiMapPin className="text-primary-400" />{f.location}</span>
                  <span className="text-primary-400 font-semibold">৳{f.price_per_hour}/hr</span>
                  <span>{f.booking_count || 0} bookings</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/edit-facility/${f._id}`} className="btn-outline text-sm flex items-center gap-1 px-4 py-2 text-white border-gray-600 hover:bg-gray-800">
                  <FiEdit2 /> Edit
                </Link>
                <button onClick={() => handleDelete(f._id, f.name)} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 border border-red-900 hover:bg-red-900/30 px-4 py-2 rounded-full transition">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFacilities;