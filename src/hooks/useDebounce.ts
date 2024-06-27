import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "../utils/debounce";

interface DebounceProps {
  callback?: () => unknown | void;
  value?: unknown;
  delay?: number;
}

export const useDebounce = ({
  callback,
  value,
  delay = 1000,
}: DebounceProps) => {
  const result = {};

  const callbackRef = useRef(callback);

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      callbackRef.current?.();
    };

    return debounce(func, delay);
  }, [delay]);

  value !== Object.assign(result, { debouncedValue });
  callback !== undefined && Object.assign(result, { debouncedCallback });

  return result as {
    debouncedValue?: unknown;
    debouncedCallback?: () => unknown | void;
  };
};
