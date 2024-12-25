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

  const [bgOpacity] = useState(0.86);

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
    if (points < 10000) {
      setMessageVisible(true); // Показываем сообщение, если очков недостаточно
    } else {
      window.open('https://pump.fun/coin/3py8ozzSYBxdfsmYeUNPyHx6MjvukZVbV2pFVHeN9TCt', '_blank');
    }
  };

  return (
    <div
      className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium"
      style={{
        position: 'relative', // Для псевдо-элемента
        backgroundImage: 'url(/images/background.png)', // Замените на путь к вашей картинке
        backgroundSize: 'cover', // Покрыть весь экран
        backgroundPosition: 'center', // Центрировать изображение
      }}
    >
      {/* Снег */}
      <Snowfall
        color="#ffffff" // Цвет снежинок
        snowflakeCount={100} // Количество снежинок
        style={{ zIndex: 50 }} // Расположение снежинок выше фона
      />
      
      {/* Псевдо-элемент для затемнения фона */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`, // Полупрозрачный черный фон с динамической прозрачностью
          zIndex: 0, // Убираем из содержимого
        }}
      />
      
      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            {/* Можно добавить контент в будущем */}
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
                <div className="text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 2025</span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div
                className="py-4 rounded-2xl flex justify-around shadow-xl"
                style={{
                  background: "linear-gradient(to right, #4caf50, #ffeb3b, #ff5722)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(55, 72, 149, 0.36)",
                  transform: 'translateY(-10px)',
                  width: '100%', // Применение процента для ширины
                  height: '80px', // Фиксированная высота
                }}
              >
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={handlePumpfunClick}
                  style={{
                    opacity: points >= 10000 ? 1 : 0.5,
                    cursor: points >= 10000 ? 'pointer' : 'not-allowed',
                    position: 'relative',
                    minWidth: '80px',
                    minHeight: '80px',
                  }}
                  title={points < 10000 ? 'Collect 10,000 candies to see the link to Pumpfun' : ''}
                >
                  <img src={bear} width={24} height={24} alt="Pumpfun" />
                  <span className="text-white" style={{ fontSize: '12px' }}>
                    Pumpfun
                  </span>
                </button>
                {messageVisible && (
                  <div className="absolute text-xs text-white font-semibold" style={{ top: '-35px' }}>
                    Collect 10,000 candies to activate the pump.fun link!
                  </div>
                )}
                <div className="h-[48px] w-[2px] bg-[#ffeb3b]"></div>
                
                <div className="h-[48px] w-[2px] bg-[#ffeb3b]"></div>
                <button
  className="flex flex-col items-center gap-1"
  style={{ minWidth: '80px', minHeight: '80px' }}
  onClick={() => window.open('https://x.com/NewYearCash', '_blank')} // Открываем ссылку при клике
>
  <img src={rocket} width={24} height={24} alt="Twitter" />
  <span className="text-white" style={{ fontSize: '12px' }}>
    twitter(x)
  </span>
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
          />
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
