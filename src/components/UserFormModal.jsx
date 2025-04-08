import React from 'react';

const UserFormModal = ({ userData, handleInputChange, errors, setShowUserForm, handleBookingSubmit}) => {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Введіть ваші дані</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Ім'я*</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Телефон*</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowUserForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Скасувати
          </button>
          <button
            onClick={handleBookingSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;