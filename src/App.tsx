import { useEffect, useState } from 'react';
import './index.css';
import { bear, coin, highVoltage, notcoin, rocket } from './images';
import Snowfall from 'react-snowfall'; // Импортируем библиотеку

const App = () => {
  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [energy, setEnergy] = useState<number>(2025);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [messageVisible, setMessageVisible] = useState(false); // Новое состояние для видимости сообщения
  const pointsToAdd = 12;
  const energyToReduce = 12;

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 2025));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePumpfunClick = () => {
    if (points < 50000) {
      setMessageVisible(true); // Показываем сообщение, если очков недостаточно
    } else {
      window.open('https://pump.fun/board', '_blank');
    }
  };

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      {/* Снег */}
      <Snowfall
        color="#ffffff" // Цвет снежинок
        snowflakeCount={100} // Количество снежинок
        style={{ zIndex: 50 }} // Расположение снежинок выше фона
      />

      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className=" text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 2025</span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div
                className="w-full py-4 rounded-2xl flex justify-around shadow-xl"
                style={{
                  background: "linear-gradient(to right, #4caf50, #ffeb3b, #ff5722)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(55, 72, 149, 0.36)",
                  transform: 'translateY(-10px)'
                }}
              >
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={handlePumpfunClick} // Обработчик клика для кнопки Pumpfun
                  style={{
                    opacity: points >= 50000 ? 1 : 0.5,
                    cursor: points >= 50000 ? 'pointer' : 'not-allowed',
                    position: 'relative'
                  }}
                  title={points < 50000 ? 'Наберите 50000 конфет, чтобы увидеть ссылку на Pumpfun' : ''}
                >
                  <img src={bear} width={24} height={24} alt="Pumpfun" />
                  <span className="text-white text-base font-bold">Pumpfun</span>
                </button>
                {messageVisible && (
                  <div className="absolute text-xs text-white font-semibold" style={{ top: '-25px' }}>
                    Наберите 50000 конфет, чтобы активировать!
                  </div>
                )}
                <div className="h-[48px] w-[2px] bg-[#ffeb3b]"></div>
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={() => {}} // Ничего не делаем при клике на Telegram
                >
                  <img src={coin} width={24} height={24} alt="Telegram" />
                  <span className="text-white text-base font-bold">Telegram</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#ffeb3b]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="Twitter" />
                  <span className="text-white text-base font-bold">twitter(x)</span>
                </button>
              </div>
            </div>
          </div>
          <div
            className="relative h-6 w-full rounded-full overflow-hidden shadow-lg border-2 border-[#FF0000]"
            style={{
              width: `${(energy / 2025) * 100}%`,
              background: "repeating-linear-gradient(45deg, #FF0000, #FF0000 10px, #FFFFFF 10px, #FFFFFF 20px)"
            }}
          ></div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={notcoin} width={256} height={256} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
