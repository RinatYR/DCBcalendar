import { useEffect, useRef } from "react";

/** Save new value and return previous */
export const usePrevState = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
