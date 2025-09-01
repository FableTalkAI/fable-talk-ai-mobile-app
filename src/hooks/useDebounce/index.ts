import { useEffect, useState } from 'react';

import { UseDebounceProps } from './types.ts';

export function useDebounce<T>({ value, delay = 500 }: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
