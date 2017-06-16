import React from 'react';
import {Picture} from './Picture'
import Phone from 'react-icons/lib/md/phone-forwarded'
import {QRA} from  './QRA'
export class QRAs extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return (
            <tr>
                <td>
                    <Picture img={this.props.qra_owner} h={'60'} w={'60'} />
                </td>
                <td>
                    <Phone/>
                </td>
                { this.props.qras.map((qra, i) =>
                    <QRA key={i} qra={qra}/>
                )}
            </tr>
        )
    }
}