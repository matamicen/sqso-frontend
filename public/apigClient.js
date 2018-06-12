/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.contentReportedPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var contentReportedPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/content-reported').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(contentReportedPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.contentReportedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var contentReportedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/content-reported').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(contentReportedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraEndpointPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body', 'Authorization'], ['body']);
        
        var qraEndpointPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-endpoint').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraEndpointPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraEndpointOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraEndpointOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-endpoint').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraEndpointOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraFollowerPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qraFollowerPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-follower').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraFollowerPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraFollowerDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qraFollowerDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-follower').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraFollowerDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraFollowerOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraFollowerOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-follower').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraFollowerOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraGetDataPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraGetDataPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-get-data').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraGetDataPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraGetDataOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraGetDataOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-get-data').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraGetDataOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraGetProfilePicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qraGetProfilePicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-get-profile-pic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraGetProfilePicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraGetProfilePicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraGetProfilePicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-get-profile-pic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraGetProfilePicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraInfoPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var qraInfoPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraInfoPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraInfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraInfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraInfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraListGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['qra'], ['body']);
        
        var qraListGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['qra']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraListGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraListPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['qra'], ['body']);
        
        var qraListPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['qra']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraListPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraListOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraListOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraListOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraQsoFeedPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraQsoFeedPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-qso-feed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraQsoFeedPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraQsoFeedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraQsoFeedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-qso-feed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraQsoFeedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraSetProfilePicPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qraSetProfilePicPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-set-profile-pic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraSetProfilePicPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qraSetProfilePicOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qraSetProfilePicOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qra-set-profile-pic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qraSetProfilePicOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoCommentPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsoCommentPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-comment').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoCommentPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoCommentDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsoCommentDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-comment').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoCommentDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoCommentOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoCommentOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-comment').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoCommentOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoDetailPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var qsoDetailPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-detail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoDetailPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoDetailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoDetailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-detail').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoDetailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoGetUserFeedGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body', 'Authorization'], ['body']);
        
        var qsoGetUserFeedGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-get-user-feed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoGetUserFeedGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoGetUserFeedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoGetUserFeedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-get-user-feed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoGetUserFeedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoLikePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsoLikePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-like').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoLikePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoLikeDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsoLikeDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-like').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoLikeDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoLikeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoLikeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-like').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoLikeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoMetadataGetPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoMetadataGetPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-metadata-get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoMetadataGetPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoMetadataGetOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoMetadataGetOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-metadata-get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoMetadataGetOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoPublicListGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoPublicListGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-public-list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoPublicListGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoPublicListOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoPublicListOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qso-public-list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoPublicListOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoeditPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qsoeditPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoedit').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoeditPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoeditOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoeditOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoedit').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoeditOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsomediaaddPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qsomediaaddPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qsomediaadd').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsomediaaddPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsomediaaddDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsomediaaddDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/qsomediaadd').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsomediaaddDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsomediaaddOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsomediaaddOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qsomediaadd').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsomediaaddOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsonewPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qsonewPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qsonew').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsonewPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsonewDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var qsonewDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/qsonew').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsonewDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsonewOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsonewOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qsonew').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsonewOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoqraaddPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qsoqraaddPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoqraadd').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoqraaddPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoqraaddOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoqraaddOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoqraadd').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoqraaddOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoqradelPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var qsoqradelPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoqradel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoqradelPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.qsoqradelOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var qsoqradelOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/qsoqradel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(qsoqradelOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userInfoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var userInfoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user-info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userInfoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userInfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userInfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user-info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userInfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
