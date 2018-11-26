import React, {Fragment} from "react";

import QRAProfileFollowing from './QRAProfileFollowing'
import QRAProfileQsos from './QRAProfileQsos'
import QRAProfileBio from './QRAProfileBio'

import QRAProfileHeader from './QRAProfileHeader'

import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import AppNavigation from '../Home/AppNavigation'
import "../../styles/style.css";

const QRAProfile = (props) => {
    
    return (
        <div className='profile-container'>

            <Dimmer active={props.active} page>
                <Loader>Loading</Loader>
            </Dimmer>

            <div className='site-header'>
                <AppNavigation/>
            </div>

            {!props.active && <Fragment>
                <div className='profile-main'>
                    <QRAProfileHeader
                        qraInfo={props.qraInfo}
                        isAuthenticated={props.isAuthenticated}
                        followed={props.followed}
                        onClick={props.onClick}
                        currentQRA={props.currentQRA}/>
                    <div className='profile-buttons'>
                        <Segment>

                            <Button.Group widths='3'>
                                <Button onClick={()=>props.handleTabClick(1)}>QSO's</Button>
                                <Button onClick={()=>props.handleTabClick(2)}>Info</Button>
                                <Button onClick={()=>props.handleTabClick(3)}>Following</Button>
                            </Button.Group>

                        </Segment>
                    </div>
                    <div className='profile-detail'>
                    <Segment>
                    {{
                            1: <QRAProfileQsos qsos={props.qra.qsos}/>,
                            2: <QRAProfileBio qraInfo={props.qraInfo}/>,
                            3: <QRAProfileFollowing following={props.qra.following} />,
                        }[props.tab]}
                        </Segment>
                    </div>
                </div>
            </Fragment>
        } 
            < div className = 'site-right' > 
                <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/> 
            </div>
        </div >);
    };
   
    export default QRAProfile;