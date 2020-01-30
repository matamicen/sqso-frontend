const config = {
  Auth: {
    identityPoolId: "us-east-1:12d39a08-c5cc-4f39-9720-077fe9014e4c",
    region: "us-east-1",
    userPoolId: "us-east-1_erR0uZ9sN",
    userPoolWebClientId: "6l8llkcn0ht6b69k3jkm1lsl7n",
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
    bucket: "sqsomodel-sqsobucket-svq3sw60lcdj", //REQUIRED -  Amazon S3 bucket
    region: "us-east-1", //OPTIONAL -  Amazon service region
    identityPoolId: "us-east-1:12d39a08-c5cc-4f39-9720-077fe9014e4c"
  },
  Analytics: {
    // OPTIONAL -  Amazon Pinpoint App ID
    disabled: true,
    // OPTIONAL -  Amazon service region
    region: "us-east-1"
  }
};
export default config;
