import React from 'react';

const SnackItem = ({icon, name, price, quantity, onIncrement, onDecrement}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-6 h-6 sm:w-8 sm:h-8" />
        <div className="ml-2 sm:ml-3">
          <div className="text-blue-800 font-medium text-sm sm:text-base">{name}</div>
          <div className="text-blue-500 text-xs sm:text-sm">{price} UAH</div>
        </div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
      <button
        onClick={onDecrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-sm sm:text-base"
      >
        -
      </button>
      <span className="w-4 sm:w-6 text-center text-sm sm:text-base">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-sm sm:text-base"
      >
        +
      </button>
    </div>
    </div>
  );
};

export default SnackItem;