import React from "react";
import {QRA} from "./QRA";
export class QRAs extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
            <div>
                You started a QSO with
                {this.props.qras.map((qra, i) =>
                    <QRA key={i} qra={qra}/>
                )}
            </div>
        );
    }
}