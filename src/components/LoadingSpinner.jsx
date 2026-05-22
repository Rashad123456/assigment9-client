const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-14 h-14 border-4 border-primary-100 border-t-primary-400 rounded-full animate-spin"></div>
      <p className="text-primary-600 font-semibold text-sm tracking-widest uppercase">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
