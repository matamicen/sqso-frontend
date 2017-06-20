import React from 'react';
import {QRAs} from './QRAs'
import {AudioList} from './AudioList'
import {Image} from './Image'
import {QsoLikeButton} from './QsoLikeButton'
import {Row, Col} from 'react-bootstrap'
export class QsoRow extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render() {

        let image = null;

        let picList = this.props.qso.media.filter( (media) => media.type === "image" );

        if (picList.length > 0){
            image = <Image img = {picList[0].url} />;
        }


        let audioList = this.props.qso.media.filter( (media) => media.type === 'audio' );

        let audio = null;
        if (audioList.length > 0 ) {
            audio = <AudioList mediaList = {audioList} />;
        }



        return (
                    <Row>
                       <Col  md={12}>
                           < QRAs
                                       qras = {this.props.qso.qras}
                                       qra_owner = {this.props.qso.profilepic}
                           />

                           <Row><Col >
                                {image}
                           </Col></Row>
                           <Row><Col>
                                {audio}
                           </Col></Row>
                           <Row><Col md={2}>
                                <QsoLikeButton />
                           </Col></Row>
                       </Col>
                    </Row>
        )
        }
}