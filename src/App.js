import './App.css';

import React from "react";
import Webcam from "react-webcam";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const videoConstraints = {
    facingMode: { exact: "environment" },
    width: 2340,
    height: 1080
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );

  return (
    <Container className="App">
      <Webcam
        className="stream"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <Row>
        <Col className="top-button-container-1">
          <Row className="top-button-container-2">
            <button className="small-button">
              <i class="bi bi-gear-fill"></i>
            </button>
          </Row>
          <Row className="top-button-container-2">
            <button className="small-button">
              <i class="bi bi-person-fill"></i>
            </button>
          </Row>
        </Col>
      </Row>
      <Row className="bottom-button-container-1">
        <button className="capture-button" onClick={capture}>
          <i className="bi bi-person-bounding-box"></i>
        </button>
      </Row>
    </Container>
  );
}

export default App;
