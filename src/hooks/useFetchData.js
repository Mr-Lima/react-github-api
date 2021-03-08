import { useEffect, useState } from 'react';

const useFetchData = (apiRequest, ...args) => {
  const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setIsError(false);
      // setIsLoading(true);

      try {
        const result = await apiRequest(...args);

        if (!ignore) setData(result);
      } catch (error) {
        setIsError(true);
      }

      // if (!ignore) setIsLoading(false);
    };

    fetchData();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRequest, ...args]);
  return [data, isError];
};

export default useFetchData;
