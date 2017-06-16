import React from 'react';
import {QsoRow} from './QsoRow'



export class QSOsTable extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render() {
        let qsos = null;
        if (this.props.qsos.length > 0) {
            qsos = this.props.qsos.map((qso, i) =>
                <QsoRow key={i} qso={qso}/>
            )
        }

        return (
            <div className="QSOsTable">
                <table><tbody>
                { qsos }
                </tbody></table>
            </div>
        );
    }
}