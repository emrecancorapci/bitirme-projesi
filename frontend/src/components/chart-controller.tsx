import { useCallback } from 'react';

import { useChartControllerStore } from '@/stores/chart-controller-store';

import { Button } from './ui/button';
import VisibilitySwitch from './visibility-switch';

export default function ChartController() {
  const { isHumidityVisible, isTemperatureVisible, setIsHumidityVisible, setIsTemperatureVisible } =
    useChartControllerStore();

  const setAllVisible = useCallback(() => {
    setIsHumidityVisible(true);
    setIsTemperatureVisible(true);
  }, [setIsHumidityVisible, setIsTemperatureVisible]);

  return (
    <div className="grid grid-cols-1 flex-row gap-4 p-4 font-light text-primary">
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-xl font-semibold">Visibility</h3>
        <Button
          className="h-6 w-16"
          variant={isHumidityVisible && isTemperatureVisible ? 'default' : 'outline'}
          onClick={setAllVisible}
        >
          All
        </Button>
      </div>
      <VisibilitySwitch label="Humidity" isVisible={isHumidityVisible} setVisible={setIsHumidityVisible} />
      <VisibilitySwitch label="Temperature" isVisible={isTemperatureVisible} setVisible={setIsTemperatureVisible} />
    </div>
  );
}
