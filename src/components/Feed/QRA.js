import React from "react";

import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import {Link} from 'react-router-dom'
import PopupToFollow from '../PopupToFollow'

export default class QRA extends React.Component {
    render() {

        return (
            
                <PopupToFollow qra={this.props.qra}
                           trigger={<Link to={"/" + this.props.qra}>
                
                           <div style={{
                               display: 'grid',
                               justifyItems: 'center'
                           }}>
                               <div
                                   style={{
                                   justifySelf: 'center',
                                   width: '60px',
                                   height: '60px'
                               }}>
                                   <Image
                                      size='medium'
                                       src={this.props.avatarpic}
                                       circular/>
                               </div>
                               <div
                                   style={{
                                   justifySelf: 'center'
                               }}>
                                   {this.props.qra}</div>
       
                           </div>
                       
                   </Link>}/>       
            

        )
    }
}