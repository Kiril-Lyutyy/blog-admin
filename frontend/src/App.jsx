import React, { useEffect, useState } from 'react';

const App = () => {
  const [greeting, setGreeting] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getGreeting = async () => {
      try {
        setIsFetching(true);
        const response = await fetch('http://localhost:4000/api/greeting');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGreeting(data.greeting);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsFetching(false);
      }
    };

    getGreeting();
  }, []);

  const renderGreeting = () => {
    if (greeting !== '') {
      return <p>{greeting}</p>;
    }

    return 'Something went wrong...';
  };

  return (
    <>
      <h1>Docker compose HW</h1>
      {isFetching ? 'Loading...' : renderGreeting()}
    </>
  );
};

export default App;
