import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useChartControllerStore } from '@/stores/chart-controller-store';

const now = Date.now();

const mockData = [
  {
    time: now,
    temp: 24.2,
    hum: 34.5,
    amt: 2400,
  },
  {
    time: now - 5 * 60_000,
    temp: 24.4,
    hum: 34.8,
    amt: 2210,
  },
  {
    time: now - 2 * 5 * 60_000,
    temp: 24.1,
    hum: 34.9,
    amt: 2290,
  },
  {
    time: now - 3 * 5 * 60_000,
    temp: 24,
    hum: 34.9,
    amt: 2000,
  },
  {
    time: now - 4 * 5 * 60_000,
    temp: 23.9,
    hum: 34.7,
    amt: 2181,
  },
  {
    time: now - 5 * 5 * 60_000,
    temp: 23.9,
    hum: 34.8,
    amt: 2500,
  },
  {
    time: now - 6 * 5 * 60_000,
    temp: 24.2,
    hum: 34.5,
    amt: 2100,
  },
];

const formattedData = mockData
  .map((data) => ({
    time: new Date(data.time).toUTCString(),
    timeAxis: new Date(data.time).toLocaleTimeString(),
    temp: data.temp.toFixed(1),
    hum: data.hum.toFixed(1),
    amt: data.amt.toFixed(0),
  }))
  .sort((a, b) => a.time.localeCompare(b.time));

const initialState = {
  humidtyStyle: {
    r: 8,
  },
  chartMarigin: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
  yAxisDomain: ['dataMin-5', 'dataMax+5'],
  xAxisDomain: ['dataMin', 'dataMax'],
};

export default function Chart() {
  const { isHumidityVisible, isTemperatureVisible } = useChartControllerStore((state) => ({
    isHumidityVisible: state.isHumidityVisible,
    isTemperatureVisible: state.isTemperatureVisible,
  }));

  const [chartState, setChartState] = useState(initialState);

  return (
    <ResponsiveContainer>
      <LineChart width={1200} height={600} data={formattedData} margin={chartState.chartMarigin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis domain={chartState.xAxisDomain} dataKey="timeAxis" label="Time" />
        <YAxis domain={chartState.yAxisDomain} label="Sensor Values" />
        <Tooltip />
        <Legend />
        {isHumidityVisible && (
          <Line type="monotone" dataKey="hum" name="Humidity" stroke="#8884d8" activeDot={chartState.humidtyStyle} />
        )}
        {isTemperatureVisible && <Line type="monotone" dataKey="temp" name="Temperature" stroke="#82ca9d" />}
      </LineChart>
    </ResponsiveContainer>
  );
}
