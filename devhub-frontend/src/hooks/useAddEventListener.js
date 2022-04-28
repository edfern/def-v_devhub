import { useEffect } from 'react';

export const useEventListner = (action) => {
  useEffect(() => {
    document.addEventListener('mousedown', action);
    return () => {
      document.removeEventListener('mousedown', action);
    };
  }, [action]);
};
