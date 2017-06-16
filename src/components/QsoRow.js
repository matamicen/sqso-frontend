import React from 'react';
import {QRAs} from './QRAs'
import {AudioList} from './AudioList'
import {Image} from './Image'
export class QsoRow extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render() {

        let image = null;
        console.log("media" + this.props.qso.media);
        let picList = this.props.qso.media.filter( (media) => media.type === "image" );
        console.log("PICS" + picList);
        if (picList.length > 0){
            image = <Image img = {picList[0].url} />;
        }


        let audioList = this.props.qso.media.filter( (media) => media.type === 'audio' );

        let audio = null;
        if (audioList.length > 0 ) {
            audio = <AudioList mediaList = {audioList} />;
        }



        return (
                    <tr>
                        <td>
                            <table><tbody>
                                < QRAs
                                       qras = {this.props.qso.qras}
                                       qra_owner = {this.props.qso.profilepic}
                                />
                                {image}
                                {audio}
                            </tbody></table>
                        </td>
                    </tr>
        )
        }
}