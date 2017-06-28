import React from 'react';
import {QSOsTable} from './QSOsTable'
const urlGetPublicList = 'https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/qas/qso-public-list';
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
                console.log("success");
                console.log(result.data);
                that.setState({ publicQsos :  result.data });

            }).catch(function (error) {
            console.log("error");
            console.error(error);
        });
        // fetch(urlGetPublicList)
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .then((result) => {
        //         console.log(result)
        //         this.setState({ publicQsos :  result });
        //     })

    }
    render() {
        return (
            <div className="PublicDashboard">
                < QSOsTable qsos = {this.state.publicQsos}/>
            </div>
        );
    }
}