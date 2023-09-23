import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)console.log(data)
  const [data, setData] = useState([]);
  console.log(data)

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3000/api/getData')
        .then(res => {
          console.log(data)
          const lastValue = data[data.length - 1] ? data[data.length - 1].time
            : null;
          console.log(lastValue)
          if (!lastValue || lastValue !== res.data[0].time
          ) {
            setData(prevData => [...prevData, ...res.data]);
          }
        })
        .catch(err => {
          console.error(`Error retrieving data from API! ${err}`);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'d-flex justify-content-center'}>

      <table className={"mainTable"}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Last Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.time).toLocaleTimeString()}</td>
              <td>{item.last_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
