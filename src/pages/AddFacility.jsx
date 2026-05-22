import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosSecure from '../utils/axiosSecure';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AddFacility = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const facility_type = form.facility_type.value;
    const location = form.location.value;
    const price_per_hour = parseFloat(form.price_per_hour.value);
    const image = form.image.value; 

    const newFacility = {
      name,
      facility_type,
      location,
      price_per_hour,
      image,
      owner_email: user?.email,
      booking_count: 0
    };

    try {
      const res = await axiosSecure.post('/api/facilities', newFacility);
      if (res.data.insertedId) {
        toast.success('Facility added successfully! 🎉');
        form.reset();
        // নেভিগেশন পাথ ঠিক করে '/manage-facilities' করা হলো
        navigate('/manage-facilities'); 
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add facility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary-400">Add New Facility</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Facility Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-primary-500 text-white" placeholder="e.g. Dhaka Arena" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Facility Type</label>
              <select name="facility_type" required className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-primary-500 text-white">
                <option value="football">Football</option>
                <option value="badminton">Badminton</option>
                <option value="swimming">Swimming</option>
                <option value="cricket">Cricket</option>
                <option value="tennis">Tennis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input type="text" name="location" required className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-primary-500 text-white" placeholder="e.g. Dhanmondi, Dhaka" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price Per Hour (৳)</label>
              <input type="number" name="price_per_hour" required className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-primary-500 text-white" placeholder="e.g. 1000" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL (ImgBB)</label>
            <input type="url" name="image" required className="w-full px-4 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-primary-500 text-white" placeholder="https://i.ibb.co/..." />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex justify-center items-center mt-4">
            {loading ? 'Adding Facility...' : 'Add Facility'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacility;