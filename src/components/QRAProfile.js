import React from "react";
import QRAProfileFollowers from './QRAProfileFollowers'
import QRAProfileFollowing from './QRAProfileFollowing'
import QRAProfilePictures from './QRAProfilePictures'
import QRAProfileBio from './QRAProfileBio'
import QRAProfileInfo from './QRAProfileInfo'
import {Grid, Header, Image, Segment, Tab} from 'semantic-ui-react'

const panes = [
    {
        menuItem: 'Biography',
        render: () => <Tab.Pane><QRAProfileBio/></Tab.Pane>
    },
    {
        menuItem: 'Information',
        render: () => <Tab.Pane><QRAProfileInfo/></Tab.Pane>
    },
    {
        menuItem: 'QSOs',
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
    },
    {
        menuItem: 'Pictures',
        render: () => <Tab.Pane><QRAProfilePictures/></Tab.Pane>
    },
    {
        menuItem: 'Following',
        render: () => <Tab.Pane><QRAProfileFollowing/></Tab.Pane>
    },
    {
        menuItem: 'Followers',
        render: () => <Tab.Pane><QRAProfileFollowers/></Tab.Pane>
    }

];
const QRAProfile = (props) => (
        <div>
            {props.qraInfo ?
                <div>
                    <Segment>
                        <Grid columns={4}>
                            <Grid.Column>
                                {props.qraInfo.profilepic ?
                                    <Image
                                        src={props.qraInfo.profilepic}
                                        centered size='small' shape='circular'/>
                                    : ""
                                }
                            </Grid.Column>
                            <Grid.Column floated="left">
                                <Header as='h1' icon textAlign='center'>
                                    <Header.Content>
                                        {props.qraInfo.qra}
                                    </Header.Content>
                                </Header>

                                <Header as='h2' icon textAlign='center'>
                                    <Header.Content>
                                        {props.qraInfo.firstname ? props.qraInfo.firstame + " " : ""}
                                        {props.qraInfo.lastname ? props.qraInfo.lastname : ""}
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid>

                    </Segment>


                    <Segment raised>
                        < Tab panes={panes}/>

                    </Segment>
                </div>
                : "QRA Not Found"
            }

        </div>

    )
;

export default QRAProfile;