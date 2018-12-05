import React from "react";
import QRA from "./QRA";

import "../../styles/style.css";

export default class QRAs extends React.Component {

    render() {
        return (
            <div className='feed-item-qras'>
                {this
                    .props
                    .qras
                    .map((qra, i) => <div className='feed-item-qras-qra' key={i} >
                        <QRA key={i} avatarpic={qra.avatarpic} qra={qra.qra}/>
                    </div>)}                
            </div>
        );
    }
}