
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './history.css';
export const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server's API endpoint
    axios.get('http://localhost:6005/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <center><h2>View your communication History</h2></center>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.to}</td>
              
              <td>{item.subject}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





