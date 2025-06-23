'use client';

import Image from 'next/image';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onRemove?: (uuid: string) => void;
}

export default function UserCard({ user, onRemove }: UserCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {user.name.title} {user.name.first} {user.name.last}
          </h3>
          <p className="text-gray-600 capitalize">{user.gender}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Email:</span>
          <span className="ml-2 text-gray-600">{user.email}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="ml-2 text-gray-600">{user.phone}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Cell:</span>
          <span className="ml-2 text-gray-600">{user.cell}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Address:</span>
          <span className="ml-2 text-gray-600">
            {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country} {user.location.postcode}
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Date of Birth:</span>
          <span className="ml-2 text-gray-600">
            {formatDate(user.dob.date)} (Age: {user.dob.age})
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Registered:</span>
          <span className="ml-2 text-gray-600">
            {formatDate(user.registered.date)}
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Nationality:</span>
          <span className="ml-2 text-gray-600">{user.nat}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Username:</span>
          <span className="ml-2 text-gray-600">{user.login.username}</span>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(user.login.uuid)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Remove User
        </button>
      )}
    </div>
  );
}