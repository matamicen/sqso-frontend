const config = {
  Auth: {
    identityPoolId: "us-east-1:8dcfb2b7-1957-4331-8b4b-42d50577ca56",
    region: "us-east-1",
    userPoolId: "us-east-1_Gk5yMffLo",
    userPoolWebClientId: "73ee1164avq7a0ec5srthdjtni",
    mandatorySignIn: false,
    aws_mandatory_sign_in: "enable",
    bucket: "sqso"
  },
  API: {
    endpoints: [
      {
        name: "superqso",
        endpoint: "https://v0sa0f73z1.execute-api.us-east-1.amazonaws.com/Prod",
        region: "us-east-1"
      }
    ]
  },
  Storage: {
    bucket: "sqsovpc-sqsobucket-ng5i255pq30h", //REQUIRED -  Amazon S3 bucket
    region: "us-east-1", //OPTIONAL -  Amazon service region
    identityPoolId: "us-east-1:8dcfb2b7-1957-4331-8b4b-42d50577ca56"
  },
  Analytics: {
    // OPTIONAL -  Amazon Pinpoint App ID
    disabled: true,
    // OPTIONAL -  Amazon service region
    region: "us-east-1"
  }
};
export default config;
