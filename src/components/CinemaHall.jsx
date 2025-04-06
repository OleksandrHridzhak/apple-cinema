import React from 'react';

const CinemaHall = () => {
  const [selectedSeats, setSelectedSeats] = React.useState([]);

  const generateSeatMap = () => {
    const seatMap = {};
    const rows = ['1', '2', '3', '4', '5', '6'];
    const takenSeats = ['23', '34', '45', '51', '64'];

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

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId) => {
    if (!seatMap[seatId]) return 'empty';
    if (selectedSeats.includes(seatId)) return 'selected';
    return seatMap[seatId].status;
  };

  const getSeatStyles = (status) => {
    switch (status) {
      case 'taken':
        return 'bg-white border-2 border-blue-300 shadow-inner';
      case 'selected':
        return 'bg-blue-500 ring-2 ring-blue-600 shadow-md';
      case 'available':
        return 'bg-blue-200 hover:bg-blue-300 border border-blue-400 cursor-pointer transition-all duration-200';
      case 'empty':
      default:
        return 'opacity-0';
    }
  };
  

  return (
    <div className="overflow-x-auto px-4 py-10 bg-white min-h-screen text-blue-800">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-24 mb-10 text-center">
          <svg
            viewBox="0 0 500 100"
            className="w-full h-full relative z-10"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 100 Q 250 0 500 100"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="6"
            />
          </svg>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                text-2xl font-semibold text-blue-600 drop-shadow">
            ЕКРАН
          </span>
        </div>

        <div className="min-w-max">
          {rows.map(row => (
            <div key={row} className="flex items-center mb-2">
              <div className="w-6 text-center text-blue-600">{row}</div>
              <div className="flex space-x-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <div
                      key={seatId}
                      className={`w-7 h-9 rounded ${getSeatStyles(status)}`}
                      onClick={() => toggleSeat(seatId)}
                    ></div>
                  );
                })}
              </div>
              <div className="w-6 text-center text-blue-600">{row}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-6 flex-wrap text-sm text-blue-700">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-sm" />
            <span>Вільні</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-800 rounded-sm" />
            <span>Зайняті</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] rounded-sm" />
            <span>Обрані</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;
