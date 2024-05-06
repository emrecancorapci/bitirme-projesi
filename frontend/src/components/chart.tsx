import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const now = Date.now();

const data = [
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

const config = {
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
};

export default function Chart() {
  const formattedData = data
    .map((d) => ({
      time: new Date(d.time).toUTCString(),
      timeAxis: new Date(d.time).toLocaleTimeString(),
      temp: d.temp.toFixed(1),
      hum: d.hum.toFixed(1),
      amt: d.amt.toFixed(0),
    }))
    .sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="h-[600px] w-full">
      <LineChart width={1200} height={600} data={formattedData} margin={config.chartMarigin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeAxis" label="Time" />
        <YAxis domain={config.yAxisDomain} label="Sensor Values" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={config.humidtyStyle} />
        <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}