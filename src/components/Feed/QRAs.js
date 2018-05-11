import React from "react";
import {QRA} from "./QRA";
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'
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