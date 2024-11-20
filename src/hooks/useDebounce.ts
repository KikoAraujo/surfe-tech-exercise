import { useState, useEffect } from "react";

export const useDebounce = (
  value: { id: number; field: "title" | "text"; value: string } | null,
  delay: number
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value === null) {
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
