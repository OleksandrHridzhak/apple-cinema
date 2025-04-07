import React from 'react';

const CinemaHall = ({ selectedSeats, onSeatSelect, takenSeats }) => {
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
    const baseStyles = 'rounded transition-all duration-150';
    switch (status) {
      case 'taken':
        return `${baseStyles} bg-white border border-blue-300 shadow-inner`;
      case 'selected':
        return `${baseStyles} bg-blue-500 ring-1 ring-blue-600 shadow-md`;
      case 'available':
        return `${baseStyles} bg-blue-200 hover:bg-blue-300 border border-blue-400 cursor-pointer`;
      case 'empty':
      default:
        return 'opacity-0';
    }
  };
  
  return (
    <div className="overflow-x-auto px-2 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-8 bg-white text-blue-800">
      <div className="max-w-4xl mx-auto">
        
        <div className="relative h-10 sm:h-14 md:h-20 lg:h-24 xl:h-28 mb-3 sm:mb-5 md:mb-7 lg:mb-10 text-center">
          <svg
            viewBox="0 0 500 100"
            className="w-full h-full relative z-10"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 100 Q 250 0 500 100"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              className="sm:stroke-[3px] md:stroke-[4px] lg:stroke-[5px]"
            />
          </svg>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 
                font-semibold text-blue-600 drop-shadow">
            ЕКРАН
          </span>
        </div>


        <div className="min-w-max justify-center flex flex-col items-center">
          {rows.map(row => (
            <div key={row} className="flex items-center mb-1 sm:mb-1.5 md:mb-2 lg:mb-3">
              <div className="w-4 sm:w-5 md:w-6 lg:w-7 text-center 
                    text-xs sm:text-sm md:text-base lg:text-lg text-blue-600">
                {row}
              </div>
              <div className="flex space-x-0.5 sm:space-x-1 md:space-x-1.5 lg:space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <button
                      key={seatId}
                      className={`${getSeatStyles(status)} 
                        w-4 h-5 xs:w-5 xs:h-6 sm:w-6 sm:h-7 
                        md:w-7 md:h-8 lg:w-8 lg:h-10 xl:w-9 xl:h-11`}
                      onClick={() => toggleSeat(seatId)}
                      disabled={status === 'taken'}
                      aria-label={`Місце ${seatId}, ${status === 'taken' ? 'зайняте' : status === 'selected' ? 'обране' : 'вільне'}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 flex justify-center 
              gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-200 border border-blue-400 rounded-sm" />
            <span>Вільні</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-white border border-blue-300 shadow-inner rounded-sm" />
            <span>Зайняті</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-500 ring-1 ring-blue-600 shadow-md rounded-sm" />
            <span>Обрані</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;