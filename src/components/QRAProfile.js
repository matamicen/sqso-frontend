import React from "react";
import QRAProfileFollowers from './QRAProfileFollowers'
import QRAProfileFollowing from './QRAProfileFollowing'
import QRAProfilePictures from './QRAProfilePictures'
import QRAProfileBio from './QRAProfileBio'
import QRAProfileInfo from './QRAProfileInfo'
import {Header, Image, Segment, Tab} from 'semantic-ui-react'

const panes = [
    {
        menuItem: 'Biography',
        render: () => <Tab.Pane><QRAProfileBio/></Tab.Pane>,
    },
    {
        menuItem: 'Information',
        render: () => <Tab.Pane><QRAProfileInfo/></Tab.Pane>,
    },
    {
        menuItem: 'QSOs',
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    {
        menuItem: 'Pictures',
        render: () => <Tab.Pane><QRAProfilePictures/></Tab.Pane>,
    },
    {
        menuItem: 'Following',
        render: () => <Tab.Pane><QRAProfileFollowing/></Tab.Pane>,
    },
    {
        menuItem: 'Followers',
        render: () => <Tab.Pane><QRAProfileFollowers/></Tab.Pane>,
    }

];
const QRAProfile = () => (
    <div>

            <Segment clearing>
                <Image
                    src='https://s3.amazonaws.com/sqso/us-east-1:7382470b-8c80-4b59-a183-b6112ff08712/profile/profile.jpg'
                    centered size='small' shape='circular'/>


                <Header as='h1' icon textAlign='center'>
                    <Header.Content>
                        LU2ACH
                    </Header.Content>
                </Header>
                <Header as='h2' icon textAlign='center'>
                    <Header.Content>
                        Matias Micenmacher
                    </Header.Content>
                </Header>
            </Segment>


            <Segment raised>
                <Tab panes={panes}/>

            </Segment>

    </div>


);

export default QRAProfile;