import React from "react";
import {QsoRow} from "./QsoRow";
import {Feed} from "semantic-ui-react";

//TODO: Cambiar QSOsTable a Feed
export class QSOsTable extends React.Component {
    constructor() {
        super();
        this.state = {
            qsos: []
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
                that.setState({qsos: result.data});

            }).catch(function (error) {
            console.log("error");
            console.error(error);
        });

    }

    componentWillUnmount() {

    }

    render() {
        //var qsos2: this.props.qsos;
        //this.setState( qsos = qsos2);
        let qsos = null;
        if (this.state.qsos.length > 0) {
            qsos = this.state.qsos.map((qso, i) =>
                <QsoRow key={i} qso={qso}/>
            )
        }

        return (
            <Feed>
                { qsos }
            </Feed>
        );
    }
}