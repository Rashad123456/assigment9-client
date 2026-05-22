import { Link } from 'react-router-dom';
import { FaTrophy, FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => (
  <footer className="bg-primary-800 dark:bg-gray-950 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FaTrophy className="text-accent-400 text-2xl" />
            <span className="font-display text-3xl text-white tracking-wider">SportNest</span>
          </div>
          <p className="text-primary-100 text-sm leading-relaxed max-w-sm">
            Your go-to platform for booking premium sports facilities across Bangladesh. Football, badminton, swimming, tennis and more.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: <FaFacebook />, href: '#' },
              { icon: <FaXTwitter />, href: '#' },
              { icon: <FaInstagram />, href: '#' },
              { icon: <FaYoutube />, href: '#' },
            ].map((s, i) => (
              <a key={i} href={s.href} className="w-9 h-9 rounded-full border border-primary-600 flex items-center justify-center text-primary-100 hover:bg-primary-600 hover:text-white transition text-sm">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

     
        <div>
          <h5 className="font-semibold text-sm uppercase tracking-widest text-accent-400 mb-4">Quick Links</h5>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/facilities', label: 'All Facilities' },
              { to: '/add-facility', label: 'Add Facility' },
              { to: '/my-bookings', label: 'My Bookings' },
            ].map(link => (
              <li key={link.to}><Link to={link.to} className="text-primary-100 text-sm hover:text-accent-400 transition">{link.label}</Link></li>
            ))}
          </ul>
        </div>

      
        <div>
          <h5 className="font-semibold text-sm uppercase tracking-widest text-accent-400 mb-4">Contact Us</h5>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-primary-100 text-sm"><FaEnvelope className="text-accent-400" /> hello@sportnest.com</li>
            <li className="flex items-center gap-2 text-primary-100 text-sm"><FaPhone className="text-accent-400" /> +880 1700-000000</li>
            <li className="flex items-center gap-2 text-primary-100 text-sm"><FaMapMarkerAlt className="text-accent-400" /> Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-primary-200 text-xs">© {new Date().getFullYear()} SportNest. All rights reserved.</p>
        <p className="text-primary-200 text-xs">Built with ❤️ using MERN Stack</p>
      </div>
    </div>
  </footer>
);

export default Footer;