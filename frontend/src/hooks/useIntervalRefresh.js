import { useEffect } from "react";

export const useIntervalRefresh = (callback, delay = 12000) => {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);

    return () => clearInterval(id);
  }, [callback, delay]);
};
