import React from 'react';

const Dashboard = () => {
  return (
    <>
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MelodyVersa</div>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-indigo-200">Home</a></li>
          <li><a href="/artists" className="hover:text-indigo-200">Artists</a></li>
          <li><a href="/albums" className="hover:text-indigo-200">Albums</a></li>
          <li><a href="/genres" className="hover:text-indigo-200">Genres</a></li>
          <li><a href="/settings" className="hover:text-indigo-200">Settings</a></li>
        </ul>
      </div>
    </nav>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to MelodyVersa Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
          <h2 className="text-xl font-bold">Total Artists</h2>
          <p className="text-4xl mt-4">1,234</p>
        </div>
        <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">
          <h2 className="text-xl font-bold">Total Albums</h2>
          <p className="text-4xl mt-4">567</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
          <h2 className="text-xl font-bold">Total Genres</h2>
          <p className="text-4xl mt-4">89</p>
        </div>
      </div>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Latest Additions</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-gray-700">Artist: <strong>Vedan</strong></li>
          <li className="text-gray-700">Album: <strong>vedan with words</strong></li>
          <li className="text-gray-700">Genre: <strong>Rap</strong></li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
