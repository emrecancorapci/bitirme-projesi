import { useState } from 'react';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useChartControllerStore } from '@/stores/chart-controller-store';

import ChartTooltip from './chart-tooltip';

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
    timeAxis: new Date(data.time).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    temp: data.temp.toFixed(1),
    hum: data.hum.toFixed(1),
    amt: data.amt.toFixed(0),
  }))
  .sort((a, b) => a.time.localeCompare(b.time));

const initialState = {
  chartMarigin: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 20,
  },
  xAxisDomain: ['dataMin', 'dataMax'],
  yAxisDomain: [20, 40],
};

export default function Chart() {
  const visibleValues = useChartControllerStore((state) => state.visibleValues);

  const [chartState, setChartState] = useState(initialState);

  return (
    <ResponsiveContainer>
      <LineChart width={1200} height={600} data={formattedData} margin={chartState.chartMarigin}>
        <CartesianGrid fill="#111" opacity={0.2} />
        <XAxis domain={chartState.xAxisDomain} dataKey="timeAxis">
          <Label value="Time" position="insideBottom" offset={-10} />
        </XAxis>
        <YAxis domain={chartState.yAxisDomain} />
        <Tooltip content={<ChartTooltip />} />
        <Legend verticalAlign="top" height={42} />

        <Line
          type="monotone"
          hide={!visibleValues.has('hum')}
          dataKey="hum"
          name="Humidity"
          stroke="#8884d8"
          strokeWidth={2}
          unit="%"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('temp')}
          dataKey="temp"
          name="Temperature"
          stroke="#82ca9d"
          strokeWidth={2}
          unit="°C"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
