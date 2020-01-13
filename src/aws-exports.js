const config = {
  Auth: {
    identityPoolId: "us-east-1:cbba13fc-63e7-4330-9745-556ad581ba09",
    region: "us-east-1",
    userPoolId: "us-east-1_M8pRiiHkO",
    userPoolWebClientId: "4o6uv13cvoqn9c73sl7o292l10",
    mandatorySignIn: false,
    aws_mandatory_sign_in: "enable",
    bucket: "sqso"
  },
  API: {
    endpoints: [
      {
        name: "superqso",
        endpoint: "https://6z40ag879f.execute-api.us-east-1.amazonaws.com/Prod",
        region: "us-east-1"
      }
    ]
  },
  Storage: {
    bucket: "s5-sqsoBucket-ipqc702etdrl", //REQUIRED -  Amazon S3 bucket
    region: "us-east-1", //OPTIONAL -  Amazon service region
    identityPoolId: "us-east-1:cbba13fc-63e7-4330-9745-556ad581ba09"
  },
  Analytics: {
    // OPTIONAL -  Amazon Pinpoint App ID
    disabled: true,
    // OPTIONAL -  Amazon service region
    region: "us-east-1"
  }
};
export default config;
