import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-red-600">404 - Page Not Found</h2>
        <p className="mt-4 text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
