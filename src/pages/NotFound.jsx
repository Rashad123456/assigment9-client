import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => (
  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
    <div className="text-center">
      <div className="font-display text-9xl text-primary-100 dark:text-gray-800 mb-4">404</div>
      <h1 className="font-display text-4xl text-gray-900 dark:text-white mb-3">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
        Looks like this page took an out-of-bounds shot. Let's get you back in the game!
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <FiHome /> Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
