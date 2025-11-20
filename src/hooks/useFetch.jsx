import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!url) return;

    const fecthData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        const json = await response.json();

        if(!response.ok){
          throw new Error(json.messagge || "API error");
        }

        setData(json);

      } catch (e) {
        setError(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
