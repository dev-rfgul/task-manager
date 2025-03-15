import React, { useEffect, useState } from 'react';

const App = () => {
  const [data,setData]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json(); // Assuming you're expecting JSON
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-green-600'>
      {data}
    </div>
  );
}

export default App;
