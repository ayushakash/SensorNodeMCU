import logo from './logo.svg';
import './App.css';
import Graph from './Component/Graph';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [chartData, setChartData] = useState({
    // ...chart data
  });
  return (
      
      <Graph />

  );
}

export default App;
