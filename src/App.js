import './App.css';

import React from "react";
import Webcam from "react-webcam";

function App() {
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };
  
  return (
    <div className="App">
      <Webcam videoConstraints={videoConstraints} />
    </div>
  );
}

export default App;
