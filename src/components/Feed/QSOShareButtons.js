import React from "react";
import {WhatsappShareButton, FacebookShareButton, TwitterShareButton} from 'react-share';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

const QSOShareButtons = ({idqso}) => {
    return (
        <Button icon >
            <Icon name='share alternate'/>

            <Dropdown upward >

                <Dropdown.Menu>
                    <Dropdown.Item>
                        <WhatsappShareButton
                            title='CheckOut this QSO'
                            url={window.location.origin + '/qso/' + idqso}>
                            <Icon name='whatsapp'/>
                          
                        </WhatsappShareButton>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <FacebookShareButton
                            quote="CheckOut this QSO"
                            url={window.location.origin + '/qso/' + idqso}>
                            <Icon name='facebook'/>                         
                        </FacebookShareButton>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <TwitterShareButton
                            title="CheckOut this QSO"
                            url={window.location.origin + '/qso/' + idqso}>
                            <Icon name='twitter'/>                         
                        </TwitterShareButton>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Button>
    )
};

export default QSOShareButtons;