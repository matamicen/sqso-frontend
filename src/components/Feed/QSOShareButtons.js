import React from "react";
import {WhatsappShareButton, FacebookShareButton, TwitterShareButton} from 'react-share';
import {Icon, Dropdown} from "semantic-ui-react";
const QSOShareButtons = ({idqso}) => {
    return (
        <Dropdown upward text='Share' icon='share alternate' floating labeled className='icon'>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <WhatsappShareButton
                        title='CheckOut this QSO'
                        url={window.location.origin + '/qso/' + idqso}>
                        <Icon name='whatsapp'/>
                        WhatsApp
                    </WhatsappShareButton>
                </Dropdown.Item>
                <Dropdown.Item>                  
                    <FacebookShareButton
                        quote="CheckOut this QSO"
                        url={window.location.origin + '/qso/' + idqso}>
                        <Icon name='facebook'/>
                        Facebook
                    </FacebookShareButton>
                </Dropdown.Item>
                <Dropdown.Item>
                    <TwitterShareButton
                        title="CheckOut this QSO"
                        url={window.location.origin + '/qso/' + idqso}>

                        <Icon name='twitter'/>
                        Twitter

                    </TwitterShareButton>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default QSOShareButtons;