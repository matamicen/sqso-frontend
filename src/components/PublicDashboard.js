import React from 'react';
import {QSOsTable} from './QSOsTable'
export class PublicDashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            publicQsos: []
        };
    }
    componentDidMount() {
        var that = this;
        var apigClient = window.apigClientFactory.newClient({
            // accessKey: creds.accessKeyId,
            // secretKey: creds.secretAccessKey,
            // sessionToken: creds.sessionToken
        });
        var params = {};
        var body = {};
        var additionalParams = {};


        apigClient.qsoPublicListGet(params, body, additionalParams)
            .then(function (result) {
                console.log("qsoPublicListGet success");
                that.setState({ publicQsos :  result.data });

            }).catch(function (error) {
            console.log("error");
            console.error(error);
        });

    }
    render() {
        return (
            <div className="PublicDashboard">
                < QSOsTable qsos = {this.state.publicQsos}/>
            </div>
        );
    }
}