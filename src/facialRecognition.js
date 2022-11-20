import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {path} from "path";
import {fs} from "fs";

const AWS = require('aws-sdk');

async function recognizeFace(imageSrc, data) {
  uploadSource(imageSrc);
  compare(data);
}

async function uploadSource(imageSrc) {
  const file = imageSrc;
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: "hackwestern9",
    Name: "source.jpg",
    Key: path.basename(file),
    Body: fileStream,
  };

  try {
    const data = await S3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}

//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

function compare(data) {
  const bucket = 'hackwestern9';
  const targets = ['andrea.jpg', 'henry.jpg', 'rhea.jpg', 'victoria.jpg'];
  
  const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  AWS.config.update({region:'us-east-1'});
  console.log(config);

  const client = new AWS.Rekognition();

  targets.forEach((target) => {
    const params = {
      SourceImage: {
        S3Object: {
          Bucket: bucket,
          Name: 'source.jpg'
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: bucket,
          Name: target
          },
        },
      SimilarityThreshold: 70
    }
    client.compareFaces(params, function(err, response) {
      if (err) {
        console.log(err, err.stack);
      } else {
        response.FaceMatches.forEach(data => {
          let similarity = data.Similarity;
          if (similarity > 85) {
            switch (target) {
              case 'andrea.jpg':
                data = db[0];
                return;
              case 'henry.jpg':
                data = db[1];
                return;
              case 'rhea.jpg':
                data = db[2];
                return;
              case 'victoria.jpg':
                data = db[3];
                return;
              default:
                return;
            }
          }
        });
      }
    });
  });
}

const db = [
  {
    firstname: "Andréa",
    lastname: "Jackson",
    interest: "Ryan Reynolds",
    position: "Schulich Leader",
    picture: "https://i.imgur.com/zqH919A.jpg"
  },
  {
    firstname: "Henry",
    lastname: "Chen",
    interest: "JA Central Ontario",
    position: "Business Student",
    picture: "https://i.imgur.com/zWYFcFs.jpg"
  },
  {
    firstname: "Rhea",
    lastname: "Mangat",
    interest: "Western AI",
    position: "Student",
    picture: "https://i.imgur.com/hLWVB66.jpg"
  },
  {
    firstname: "Victoria",
    lastname: "Da Rosa",
    interest: "Bill Gates",
    position: "Computer Engineering Student",
    picture: "https://i.imgur.com/4xNpeL4.jpg"
  }
];

export default recognizeFace;
