// src/components/DataDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data'); // Update this URL
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Data from Spring Boot</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
