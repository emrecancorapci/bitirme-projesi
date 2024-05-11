import Chart from '@/components/chart';
import ChartController from '@/components/chart-controller';

export default function Home() {
  return (
    <div className="grid h-full grid-cols-5 gap-4 px-4 py-8">
      <div className="col-span-5 h-full lg:col-span-4">
        <Chart />
      </div>
      <div className="col-span-5 flex flex-col gap-4 lg:col-span-1">
        <h2 className="text-4xl font-bold text-foreground">Chart Settings</h2>
        <div className="grow rounded-lg border border-border bg-background shadow-sm">
          <ChartController />
        </div>
      </div>
    </div>
  );
}
