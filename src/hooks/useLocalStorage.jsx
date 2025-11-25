import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  let saved;

  try {
    saved = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.warn(`Invalid JSON in localStorage key "${key}", resetting...`);
    console.error(e);
    saved = initialValue;
  }

  const [value, setValue] = useState(saved ?? initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
