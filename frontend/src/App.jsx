import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-green-600 p-4 text-white'>
      <h1 className='text-xl font-bold mb-2'>Fetched Data:</h1>
      <pre>{data ? JSON.stringify(data.message, null, 2) : 'Loading...'}</pre>
    </div>
  );
};

export default App;
