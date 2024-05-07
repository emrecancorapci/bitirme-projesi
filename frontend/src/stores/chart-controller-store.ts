import { create } from 'zustand';

interface ChartControllerState {
  isHumidityVisible: boolean;
  isTemperatureVisible: boolean;
  setIsHumidityVisible: (isVisible: boolean) => void;
  setIsTemperatureVisible: (isVisible: boolean) => void;
}

export const useChartControllerStore = create<ChartControllerState>(function chartControllerStore(set) {
  return {
    isHumidityVisible: true,
    isTemperatureVisible: true,
    setIsHumidityVisible: (isVisible: boolean) => set({ isHumidityVisible: isVisible }),
    setIsTemperatureVisible: (isVisible: boolean) => set({ isTemperatureVisible: isVisible }),
  };
});
