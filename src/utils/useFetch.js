import {useEffect, useState} from 'react';
import mockData from '../mockData/MOCK_DATA.json'

const useFetch = (url, options= {}, cleanupFunction= undefined) => {
  const [ response, setResponse ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchData = async (url, options = {}) => {
    setIsLoading(true);

    try {
      setResponse(mockData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData(url, options);

    if (cleanupFunction) return () => cleanupFunction();
  }, [ cleanupFunction, options, url ]);

  return { response, error, isLoading }
};

export default useFetch;
