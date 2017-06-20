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
        fetch(urlGetPublicList)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                console.log(result)
                this.setState({ publicQsos :  result });
            })

    }
    render() {
        return (
            <div className="PublicDashboard">
                < QSOsTable qsos = {this.state.publicQsos}/>
            </div>
        );
    }
}