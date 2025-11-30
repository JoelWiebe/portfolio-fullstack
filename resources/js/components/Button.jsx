import React from 'react';

export default function Button({ children, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}