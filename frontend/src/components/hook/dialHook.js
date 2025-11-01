import { useState } from 'react';

const useDialHook = () => {
  const [dialOpen, setDialOpen] = useState(false);

  return {
    dialOpen,
    setDialOpen,
    generateActions,
  };
}

const generateActions = (actionsArray) => {
  return actionsArray.map(([icon, name, onClick]) => ({
    icon,
    name,
    onClick
  }));
};

export default useDialHook;