import { useEffect, useRef, useState } from "react";

type UseDebounceOptions = {
  delay?: number;
  leading?: boolean;
};

export function useDebounce<T>(
  value: T,
  { delay = 300, leading = false }: UseDebounceOptions = {}
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingRef = useRef(true);

  useEffect(() => {
    if (leading && leadingRef.current) {
      setDebouncedValue(value);
      leadingRef.current = false;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, leading]);

  // Reset leadingRef when value changes
  useEffect(() => {
    if (!leading) return;
    leadingRef.current = true;
  }, [value, leading]);

  return debouncedValue;
}
