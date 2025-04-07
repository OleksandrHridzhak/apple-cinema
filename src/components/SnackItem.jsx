import React from 'react';

const SnackItem = ({ icon, name, price, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center justify-between p-2 md:p-3 lg:p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center flex-1 min-w-0">
        <img 
          src={icon} 
          alt={name} 
          className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0"
        />
        <div className="ml-2 sm:ml-3 min-w-0">
          <div className="text-blue-800 font-medium text-xs xs:text-sm sm:text-base truncate">
            {name}
          </div>
          <div className="text-blue-500 text-xs xs:text-sm">
            {price} UAH
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1 xs:space-x-2 ml-2">
        <button
          onClick={onDecrement}
          className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-xs xs:text-sm sm:text-base transition-colors"
          aria-label={`Зменшити кількість ${name}`}
        >
          -
        </button>
        <span className="w-4 xs:w-5 sm:w-6 text-center text-xs xs:text-sm sm:text-base">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-xs xs:text-sm sm:text-base transition-colors"
          aria-label={`Збільшити кількість ${name}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SnackItem;