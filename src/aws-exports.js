const config = {
  Auth: {
    identityPoolId: 'us-east-1:2cf52faa-ca6d-41a5-9bd0-70d7a57f025a',
    region: 'us-east-1',
    userPoolId: 'us-east-1_4pxrtcUkJ',
    userPoolWebClientId: '3sj7e62qn4fcm9q5bee4q4vl2',
    mandatorySignIn: false,
    aws_mandatory_sign_in: 'enable',
    bucket: 'sqso'
  },

  API: {
    endpoints: [
      {
        name: 'superqso',
        endpoint: 'https://api.zxcvbnmasd.com',
        region: 'us-east-1'
      }
    ]
  },
  Storage: {
    bucket: 'sqsovpcrds-sqsobucket-7mm5nfwuu0ws', // REQUIRED -  Amazon S3 bucket
    region: 'us-east-1', // OPTIONAL -  Amazon service region
    identityPoolId: 'us-east-1:2cf52faa-ca6d-41a5-9bd0-70d7a57f025a'
  },
  Analytics: {
    // OPTIONAL -  Amazon Pinpoint App ID
    disabled: true,
    // OPTIONAL -  Amazon service region
    region: 'us-east-1'
  }
}
export default config
