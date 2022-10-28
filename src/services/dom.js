import { useEffect, useCallback } from 'react';

export function useClickOutside(subject, callback) {
  const getElement = elementOrRef => {
    if (elementOrRef instanceof Element) {
      return elementOrRef;
    }

    return elementOrRef.current;
  };

  const handleClick = useCallback(
    event => {
      const element = subject && getElement(subject);

      if (element && !element.contains(event.target)) {
        callback();
      }
    },
    [callback, subject]
  );

  useEffect(
    () => {
      document.addEventListener('mousedown', handleClick);

      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    },
    [subject, callback, handleClick]
  );
}