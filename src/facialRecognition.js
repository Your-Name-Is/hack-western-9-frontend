// import * as canvas from 'canvas';
// import * as faceapi from 'face-api.js';
const { Client } = require("pg");

async function recognizeFace(imageSrc, data) {
  // const { Canvas, Image, ImageData } = canvas;
  // faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  // await faceapi.nets.ssdMobilenetv1.loadFromDisk('../public');

  const connectionString = "postgresql://rheamangat:2T_Xc-z3yfP-FagwG7LHXw@peewee-opossum-2765.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full";
  const client = new Client(connectionString);

  (async () => {
    await client.connect();
    try {
      const results = await client.query("SELECT NOW()");
      console.log(results);
    } catch (err) {
      console.error("error executing query:", err);
    } finally {
      client.end();
    }
  })();

  // const cb = (err, res) => {
  //   if (err) throw err;
  // }

  // const input = document.createElement("img");
  // input.setAttribute("src", imageSrc);

  // const faceMatcher = getFaceMatcher(input);
  // compareFaces(client);
}

// async function getFaceMatcher(referenceImage) {
//   const referenceResult = await faceapi
//     .detectSingleFace(referenceImage)
//     .withFaceLandmarks()
//     .withFaceDescriptor();

//   const matcher = new faceapi.FaceMatcher(referenceResult);
//   return matcher;
// }

// async function compareFaces(client) {
//   let bestMatchKey = null;

//   const selectStatement = "SELECT firstname, picture FROM people;";
//   const temp = await client.query(selectStatement, cb);
//   console.log(temp);
  
  // const singleResult = await faceapi
  //   .detectSingleFace(queryImage)
  //   .withFaceLandmarks()
  //   .withFaceDescriptor();

  // if (singleResult) {
  //   const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
  //   console.log(bestMatch.toString());
  // }
// }

// async function retrieveInformation(key,client, cb){
//   let temp_select = "SELECT * FROM people WHERE firstname = ";
//   let select_stmt = temp_select.concat("'",key,"';");  
  
//   await client.query(select_stmt, cb);

// }

export default recognizeFace;
