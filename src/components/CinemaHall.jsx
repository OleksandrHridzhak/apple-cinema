import React from 'react';

const CinemaHall = ({selectedSeats, onSeatSelect, takenSeats}) => {
  const generateSeatMap = () => {
    const seatMap = {};
    const rows = ['1', '2', '3', '4', '5', '6'];

    rows.forEach(row => {
      for (let i = 1; i <= 12; i++) {
        const seatId = `${row}${i}`;
        seatMap[seatId] = {
          id: seatId,
          status: takenSeats.includes(seatId) ? 'taken' : 'available'
        };
      }
    });

    return { seatMap, rows };
  };

  const { seatMap, rows } = generateSeatMap();

  const toggleSeat = (seatId) => {
    if (seatMap[seatId].status === 'taken') return;
    
    const newSelected = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    
    onSeatSelect(newSelected);
  };

  const getSeatStatus = (seatId) => {
    if (!seatMap[seatId]) return 'empty';
    if (selectedSeats.includes(seatId)) return 'selected';
    return seatMap[seatId].status;
  };

  const getSeatStyles = (status) => {
    switch (status) {
      case 'taken':
        return 'bg-white border border-blue-300 shadow-inner';
      case 'selected':
        return 'bg-blue-500 ring-1 sm:ring-2 ring-blue-600 shadow-md';
      case 'available':
        return 'bg-blue-200 hover:bg-blue-300 border border-blue-400 cursor-pointer transition-all duration-200';
      case 'empty':
      default:
        return 'opacity-0';
    }
  };
  
  return (
    <div className="overflow-x-auto px-2 py-3 sm:px-4 sm:py-5 bg-white text-blue-800">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-12 sm:h-16 md:h-24 mb-4 sm:mb-6 md:mb-10 text-center">
          <svg
            viewBox="0 0 500 100"
            className="w-full h-full relative z-10"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 100 Q 250 0 500 100"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              className="sm:stroke-[4px] md:stroke-[6px]"
            />
          </svg>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                text-base sm:text-lg md:text-2xl font-semibold text-blue-600 drop-shadow">
            ЕКРАН
          </span>
        </div>

        <div className="min-w-max justify-center flex flex-col items-center">
          {rows.map(row => (
            <div key={row} className="flex items-center mb-1 sm:mb-2">
              <div className="w-4 sm:w-5 md:w-6 text-center text-xs sm:text-sm md:text-base text-blue-600">{row}</div>
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <div
                      key={seatId}
                      className={`w-5 h-7 sm:w-6 sm:h-8 md:w-8 md:h-10 rounded ${getSeatStyles(status)}`}
                      onClick={() => toggleSeat(seatId)}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5 flex justify-center gap-2 sm:gap-3 md:gap-6 flex-wrap text-xs sm:text-sm text-blue-700">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-300 rounded-sm" />
            <span>Вільні</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-800 rounded-sm" />
            <span>Зайняті</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-500 shadow-[0_0_6px_1px_rgba(59,130,246,0.5)] sm:shadow-[0_0_8px_1.5px_rgba(59,130,246,0.5)] md:shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] rounded-sm" />
            <span>Обрані</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;