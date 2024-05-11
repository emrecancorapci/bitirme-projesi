import { useCallback } from 'react';

import { useChartControllerStore } from '@/stores/chart-controller-store';

import Button from './ui/button';
import VisibilitySwitch from './visibility-switch';

export default function ChartController() {
  const { visibleValues, toggleVisible, setVisible } = useChartControllerStore();
  useChartControllerStore();

  const isHumidityVisible = visibleValues.has('hum');
  const isTemperatureVisible = visibleValues.has('temp');

  const toggleHumidity = useCallback(() => toggleVisible('hum'), [toggleVisible]);
  const toggleTemperature = useCallback(() => toggleVisible('temp'), [toggleVisible]);

  const setAllVisible = useCallback(() => {
    setVisible('hum', true);
    setVisible('temp', true);
  }, [setVisible]);

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
      <VisibilitySwitch label="Humidity" isVisible={isHumidityVisible} onToggle={toggleHumidity} />
      <VisibilitySwitch label="Temperature" isVisible={isTemperatureVisible} onToggle={toggleTemperature} />
    </div>
  );
}
