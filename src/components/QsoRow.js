import React from 'react';
import {QRAs} from './QRAs'
import {Audio} from './Audio'
export class QsoRow extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(props) {
        let media = null;
        if (this.props.qso.media.length > 0 ) {
            media = <Audio media = {props.qso.media} />;
        }
        return (
                    <tr>
                        <td>
                            <table><tbody>
                                < QRAs
                                       qras = {this.props.qso.qras}
                                       qra_owner = {this.props.qso.profilepic}
                                />
                                {media}
                            </tbody></table>
                        </td>
                    </tr>
        )
        }
}