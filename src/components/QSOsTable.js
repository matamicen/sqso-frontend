import React from 'react';
import {QsoRow} from './QsoRow'
import {Grid} from 'react-bootstrap'



export class QSOsTable extends React.Component{
    constructor(){
        super();
        this.state = {
            qsos : []
        };

    }
    componentDidMount() {
       // this.setState( qsos : {this.props.qsos});

     //   qsos2 = this.props.publicQsos;
     //   console.log(this.props.publicQsos);
     //       var qsos2 = [];
     //    qsos2.push({
     //        "idqsos": 430,
     //        "idqra_owner": 146,
     //        "mode": "CW",
     //        "band": "20m",
     //        "datetime": "2017-06-16T18:18:29.000Z",
     //        "state": null,
     //        "type": "QSO",
     //        "location": {
     //            "x": 0,
     //            "y": 0
     //        },
     //        "qra": "LU7ACH",
     //        "profilepic": "https://s3.amazonaws.com/sqso/us-east-1:c493c976-5f0f-4e24-bd6b-a39c60c13323/profile/profile.jpg",
     //        "qras": [
     //            {
     //                "idqras": 144,
     //                "qra": "LU8AJ",
     //                "idcognito": null,
     //                "profilepic": "https://s3-us-west-2.amazonaws.com/matamicenbucket/messi.jpg"
     //            },
     //            {
     //                "idqras": 144,
     //                "qra": "LU8AJ",
     //                "idcognito": null,
     //                "profilepic": "https://s3-us-west-2.amazonaws.com/matamicenbucket/messi.jpg"
     //            }
     //        ],
     //        "media": [
     //            {"url" : "http://www.samisite.com/sound/cropShadesofGrayMonkees.mp3",
     //             "type" : "audio"}]
     //
     //    })
     //    qsos2.push({
     //        "idqsos": 430,
     //        "idqra_owner": 146,
     //        "mode": "CW",
     //        "band": "20m",
     //        "datetime": "2017-06-16T18:18:29.000Z",
     //        "state": null,
     //        "type": "QSO",
     //        "location": {
     //            "x": 0,
     //            "y": 0
     //        },
     //        "qra": "LU7ACH",
     //        "profilepic": "https://s3.amazonaws.com/sqso/us-east-1:c493c976-5f0f-4e24-bd6b-a39c60c13323/profile/profile.jpg",
     //        "qras": [
     //            {
     //                "idqras": 144,
     //                "qra": "LU8AJ",
     //                "idcognito": null,
     //                "profilepic": "https://s3-us-west-2.amazonaws.com/matamicenbucket/messi.jpg"
     //            },
     //            {
     //                "idqras": 144,
     //                "qra": "LU8AJ",
     //                "idcognito": null,
     //                "profilepic": "https://s3-us-west-2.amazonaws.com/matamicenbucket/messi.jpg"
     //            }
     //        ],
     //        "media": [
     //            {"url" : "http://www.samisite.com/sound/cropShadesofGrayMonkees.mp3",
     //             "type" : "audio"},
     //            {"url" : "http://www.samisite.com/sound/cropShadesofGrayMonkees.mp3",
     //             "type" : "audio"},
     //            {"url" : "http://www.initcoms.com/blog/wp-content/uploads/2017/01/como-vender-en-amazon-0.jpg",
     //             "type" : "image"}]
     //    })
  //      this.setState({ qsos: qsos2 })

    }

    componentWillUnmount() {

    }
    render() {
        //var qsos2: this.props.qsos;
        //this.setState( qsos = qsos2);
        let qsos = null;
        if (this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>
                <QsoRow key={i} qso={qso}/>
            )
        }

        return (
            <div className="QSOsTable">
                <Grid fluid={true}>
                { qsos }
                </Grid>
            </div>
        );
    }
}