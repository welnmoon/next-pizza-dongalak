import { useEffect } from "react";

export const useDebounce = (callback: () => void, deps: any[], delay = 300) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler); // очистка при новом вызове
  }, [...deps, delay]);
};
