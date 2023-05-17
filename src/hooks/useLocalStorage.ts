import { useCallback, useEffect, useState } from 'react';

const updateStorage = (key, value) => {
  if (window?.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const retrieveFromStorage = (key) => {
  if (window?.localStorage) {
    const val = window.localStorage.getItem(key);

    // FIXME
    if (val && val !== 'undefined') {
      return JSON.parse(val);
    }
  }

  return null;
};

export const useLocalStorageState = (key) => {
  const [state, setState] = useState(() => {
    const val = retrieveFromStorage(key);

    if (val !== null) {
      return val;
    }

    return null;
  });

  useEffect(() => {
    function handleStorageEvent(e) {
      if (e.key === key) {
        setState(JSON.parse(e.newValue));
      }
    }

    window?.addEventListener('storage', handleStorageEvent);

    return () => {
      window?.removeEventListener('storage', handleStorageEvent);
    };
  }, [key]);

  const handleStateUpdate = useCallback(
    (newState) => {
      setState((oldState) => {
        let future = newState;
        if (typeof newState === 'function') {
          future = newState(oldState);
        }

        updateStorage(key, future);
        return future;
      });
    },
    [key],
  );

  const removeState = useCallback(() => {
    window?.localStorage.removeItem(key);
    setState(null);
  }, [key]);

  return [state, handleStateUpdate, removeState];
};
