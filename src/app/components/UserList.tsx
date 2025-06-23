'use client';
import { useSelector, useDispatch } from 'react-redux';

import { 
  fetchRandomUser, 
  fetchMultipleUsers, 
  fetchUsersByNationality,
  clearUsers,
  removeUser
} from '../store/userSlice'
import UserCard from './UserCard';
import { useState } from 'react';
import { AppDispatch, RootState } from '../store';

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [userCount, setUserCount] = useState(5);
  const [nationality, setNationality] = useState('US');

  const handleFetchRandomUser = () => {
    dispatch(fetchRandomUser());
  };

  const handleFetchMultipleUsers = () => {
    dispatch(fetchMultipleUsers(userCount));
  };

  const handleFetchByNationality = () => {
    dispatch(fetchUsersByNationality({ nationality, count: userCount }));
  };

  const handleClearUsers = () => {
    dispatch(clearUsers());
  };

  const handleRemoveUser = (uuid: string) => {
    dispatch(removeUser(uuid));
  };

  const nationalities = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'JP', name: 'Japan' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Random User Generator
      </h1>

      {/* Control Panel */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Users
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={userCount}
              onChange={(e) => setUserCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality
            </label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              {nationalities.map((nat) => (
                <option key={nat.code} value={nat.code}>
                  {nat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleFetchRandomUser}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors"
          >
            {loading ? 'Loading...' : 'Fetch Random User'}
          </button>
          
          <button
            onClick={handleFetchMultipleUsers}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-md transition-colors"
          >
            {loading ? 'Loading...' : `Fetch ${userCount} Users`}
          </button>
          
          <button
            onClick={handleFetchByNationality}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-md transition-colors"
          >
            {loading ? 'Loading...' : `Fetch ${nationality} Users`}
          </button>
          
          <button
            onClick={handleClearUsers}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-md transition-colors"
          >
            Clear All Users
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Users Grid */}
      {users.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.login.uuid}
              user={user}
              onRemove={handleRemoveUser}
            />
          ))}
        </div>
      )}

      {/* No Users State */}
      {users.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No users loaded. Click one of the buttons above to fetch users.
          </p>
        </div>
      )}
    </div>
  );
}