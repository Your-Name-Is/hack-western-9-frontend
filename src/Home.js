import React from "react";
import Webcam from "react-webcam";
import Connection from "./Connection";
import { recognizeFace } from "./facialRecognition";
import { Container, Row } from "react-bootstrap";

function Home() {
  let data = null;

  const videoConstraints = {
    // facingMode: { exact: "environment" },
    width: 2340,
    height: 1080
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      recognizeFace(imageSrc, data);
    },
    [webcamRef, data]
  );

  if (data == null) {
    return (
      <Container className="App">
        <Webcam
          className="stream"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />

        <Row className="top-button-container-1">
          <button className="small-button">
            <i className="bi bi-gear-fill"></i>
          </button>
        </Row>
        <Row className="bottom-button-container-1">
          <button className="capture-button" onClick={capture}>
            <i className="bi bi-person-bounding-box"></i>
          </button>
        </Row>
      </Container>
    );
  } else {
    <Container>
      <Connection />
    </Container>
  }
}

export default Home;
