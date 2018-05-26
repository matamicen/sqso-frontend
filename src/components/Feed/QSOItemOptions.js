import React from "react";

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import QRCode from "qrcode.react";
const QSOItemOptions = ({idqso, currentQRA, qso_owner}) => {
    console.log(currentQRA, qso_owner)
    return (
        <Dropdown icon='ellipsis vertical' button className='icon' pointing="right">
            <Dropdown.Menu>

                <Modal
                    size='tiny'
                    closeIcon
                    trigger={< Dropdown.Item icon = 'qrcode' text = 'Show QR Code' />}>
                    <Modal.Header>QR Code</Modal.Header>
                    <Modal.Content>
                        <Grid centered>
                            <Segment raised>
                                <QRCode value={window.location.origin + '/qso/' + {idqso}}/>
                            </Segment>
                        </Grid>
                    </Modal.Content>
                </Modal>

               { currentQRA === qso_owner && <Dropdown.Item icon='delete' text='Delete QSO'/>} 
    { currentQRA && currentQRA !== qso_owner && <Dropdown.Item icon='warning' text='Abuse'/> }
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default QSOItemOptions;