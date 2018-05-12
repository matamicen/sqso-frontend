import React from "react";
import QRA from "./QRA";



export default class QRAs extends React.Component {

    render() {
        return (
            <div>            
  
               {this
                    .props
                    .qras
                    .map((qra, i) => <QRA key={i} 
                                          profilepic={qra.profilepic}
                                          qra={qra.qra}/>)}
            </div>
        );
    }
}