import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { createChart } from 'lightweight-charts';
import Header from '../../Components/Header';

import styles from './Dashboard.module.css';


const StockChart = ({ symbol="AAPL" }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const intervalRef = useRef();
  const buttonsContainerRef = useRef();
  let lastBarTime = null;


      useEffect(() => {
          // Agregar la clase al body al montar el componente
          document.body.classList.add(styles["dashboard-page"]);
  
          // Remover la clase al body al desmontar el componente
          return () => {
              document.body.classList.remove(styles["dashboard-page"]);
          };
      }, []);

      const [assets, setAssets] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selectedSymbol, setSelectedSymbol] = useState('');

      useEffect(() => {
        const fetchAssets = async () => {
          try {
            const response = await axios.get('http://localhost:8080/AccionesElBosque/api/alpaca/activos');
            setAssets(response.data);
          } catch (err) {
            console.error('Error al obtener activos:', err);
            setError('No se pudieron cargar los activos.');
          } finally {
            setIsLoading(false);
          }
        };

        fetchAssets();
      }, []);




  useEffect(() => {
    // Crear gráfico
    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#121212' },
        textColor: '#ccc',
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      }
    });

    // Crear serie tipo candlestick
    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

const fetchInitialData = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/AccionesElBosque/api/alpaca/barsMinute/${symbol}`);
    const bars = res.data.bars.map(bar => ({
      time: Math.floor(new Date(bar.t).getTime() / 1000),
      open: bar.o,
      high: bar.h,
      low: bar.l,
      close: bar.c,
    }));

    seriesRef.current.setData(bars);
    chartRef.current.timeScale().scrollToRealTime();

    lastBarTime = bars[bars.length - 1].time;

    // Inicia polling cada 2 segundos
    intervalRef.current = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/AccionesElBosque/api/alpaca/barsMinute/${symbol}`);
        const latestBars = response.data.bars.map(bar => ({
          time: Math.floor(new Date(bar.t).getTime() / 1000),
          open: bar.o,
          high: bar.h,
          low: bar.l,
          close: bar.c,
        }));

        const lastBar = latestBars[latestBars.length - 1];

        if (lastBar.time === lastBarTime) {
          // La vela actual se sigue formando: actualizarla
          seriesRef.current.update(lastBar);
        } else if (lastBar.time > lastBarTime) {
          // Nueva vela: añadirla
          seriesRef.current.update(lastBar);
          lastBarTime = lastBar.time;
        }

        chartRef.current.timeScale().scrollToRealTime();

      } catch (err) {
        console.error('Error al actualizar en tiempo real:', err);
      }
    }, 2000); // cada 2 segundos para mayor fluidez
  } catch (err) {
    console.error('Error inicial al cargar datos:', err);
  }
};

  fetchInitialData();

  

  return () => {
    clearInterval(intervalRef.current);
    chartRef.current.remove();
  };
}, [symbol]);

return (
  <div className={styles['dashboard-page']}>
    <Header />
    <div className={styles['chart-container']}>
      <div className={styles['chart-title']}>{symbol} Live Candlestick Chart</div>
      <div
        ref={chartContainerRef}
        style={{
          width: '1335px',
          height: '400px',
        }}
      />
    </div>

    <div className={styles.wrapper}>
      <div>
        <div className={styles.poda}>
          <div className={styles.glow} />
          <div className={styles.darkBorderBg} />
          <div className={styles.darkBorderBg} />
          <div className={styles.darkBorderBg} />
          <div className={styles.white} />
          <div className={styles.border} />
          <div className={styles.main}>
            <input placeholder="Search..." type="text" name="text" className={styles.input} />
            <div className={styles.inputMask} />
            <div className={styles.pinkMask} />
            <div className={styles.filterBorder} />
            <div className={styles.filterIcon}>
              <svg style={{ transform: 'translate(861px, -41px)' }} preserveAspectRatio="none" height={27} width={27} viewBox="4.8 4.56 14.832 15.408" fill="none">
                <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#d6d6e6" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.searchIcon}>
              <svg style={{ transform: 'translate(20px, -70px)' }} xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none" className="feather feather-search">
                <circle stroke="url(#search)" r={8} cy={11} cx={11} />
                <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
                <defs>
                  <linearGradient gradientTransform="rotate(50)" id="search">
                    <stop stopColor="#f8e7f8" offset="0%" />
                    <stop stopColor="#b6a9b7" offset="50%" />
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor="#b6a9b7" offset="0%" />
                    <stop stopColor="#837484" offset="50%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

        <div className={styles['assets-container']}>
          <h2 className={styles['assets-title']}>Lista de Activos</h2>
          {isLoading ? (
            <div className={styles['loading-text']}>Cargando activos...</div>
          ) : error ? (
            <div className={styles['error-text']}>{error}</div>
          ) : (
            <table className={styles['assets-table']}>
              <thead>
                <tr>
                  <th>Símbolo</th>
                  <th>Nombre</th>
                  <th>Último Precio</th>
                  <th>Cambio</th>
                  <th>% Cambio</th>
                  <th>Volumen</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => {
                  const isPositive = asset.change >= 0;
                  const isSelected = asset.symbol === selectedSymbol;
                  return (
                    <tr
                      key={index}
                      className={`${isSelected ? styles['selected-row'] : ''}`}
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{asset.symbol}</td>
                      <td>{asset.name}</td>
                      <td>${asset.lastPrice.toFixed(2)}</td>
                      <td style={{ color: isPositive ? 'limegreen' : 'red' }}>
                        {isPositive ? '+' : ''}{asset.change.toFixed(2)}
                      </td>
                      <td style={{ color: isPositive ? 'limegreen' : 'red' }}>
                        {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </td>
                      <td>{asset.volume.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>



    </div>

  </div>
);

};

export default StockChart;
