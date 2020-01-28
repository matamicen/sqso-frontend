const config = {
  Auth: {
    identityPoolId: "us-east-1:02a2c2cf-9a51-4556-bbca-ff1e8471fbf8",
    region: "us-east-1",
    userPoolId: "us-east-1_a5Bor8IjF",
    userPoolWebClientId: "65gfp0rjjt2v77gjq0gtkcj0qn",
    mandatorySignIn: false,
    aws_mandatory_sign_in: "enable",
    bucket: "sqso"
  },
  API: {
    endpoints: [
      {
        name: "superqso",
        endpoint: "https://uhywdaa747.execute-api.us-east-1.amazonaws.com/Prod",
        region: "us-east-1"
      }
    ]
  },
  Storage: {
    bucket: "sqsosam-app-769lktetwp9u-sqsobucket-12lc7yht1xtz5", //REQUIRED -  Amazon S3 bucket
    region: "us-east-1", //OPTIONAL -  Amazon service region
    identityPoolId: "us-east-1:02a2c2cf-9a51-4556-bbca-ff1e8471fbf8"
  },
  Analytics: {
    // OPTIONAL -  Amazon Pinpoint App ID
    disabled: true,
    // OPTIONAL -  Amazon service region
    region: "us-east-1"
  }
};
export default config;
