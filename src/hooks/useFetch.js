import { useState, useEffect } from 'react'

export function useFetch(fetchFn, initialValue, customErrorMsg) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || customErrorMsg });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn, customErrorMsg]);

  return { fetchedData, setFetchedData, isFetching, error }
}
