import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const saved = JSON.parse(localStorage.getItem(key));

  const [value, setValue] = useState(saved ?? initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
