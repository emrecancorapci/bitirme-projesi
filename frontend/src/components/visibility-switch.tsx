import { useCallback } from 'react';

import { Switch } from './ui/switch';

export default function VisibilitySwitch({
  isVisible,
  setVisible,
  label,
}: {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  label: string;
}) {
  const toggleVisibility = useCallback(() => setVisible(!isVisible), [isVisible, setVisible]);

  return (
    <div className="flex flex-row items-center gap-4">
      <Switch checked={isVisible} onCheckedChange={toggleVisibility} />
      <p className="font-semibold">{label}</p>
    </div>
  );
}
