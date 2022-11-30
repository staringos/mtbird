import { useState, useEffect } from 'react';

const useHotKey = () => {
  const [shiftKey, setShiftKey] = useState(false);

  const handleHotKey = (event: string) => () => {
    if (event === 'keyup') return setShiftKey(false);
    if (event === 'keydown') return setShiftKey(true);
  };

  useEffect(() => {
    window.addEventListener('keyup', handleHotKey('keyup'), false);
    window.addEventListener('keydown', handleHotKey('keydown'), false);

    return () => {
      window.removeEventListener('keyup', handleHotKey('keyup'), false);
      window.removeEventListener('keydown', handleHotKey('keydown'), false);
    };
  }, []);

  return shiftKey;
};

export default useHotKey;
