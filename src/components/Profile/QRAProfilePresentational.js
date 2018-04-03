import React from "react";
import QRAProfileFollowers from './QRAProfileFollowers'
import QRAProfileFollowing from './QRAProfileFollowing'
import QRAProfileQsos from './QRAProfileQsos'
import QRAProfileBio from './QRAProfileBio'
import QRAProfileInfo from './QRAProfileInfo'
import {Helmet} from 'react-helmet'
import {
    Button,
    Grid,
    Header,
    Image,
    Segment,
    Tab
} from 'semantic-ui-react'

const QRAProfile = (props) => {
    const panes = [
        {
            menuItem: 'QSOs',
            render: () => <Tab.Pane><QRAProfileQsos qsos={props.qra.qsos}/></Tab.Pane>
        }, {
            menuItem: 'Biography',
            render: () => <Tab.Pane><QRAProfileBio qraInfo={props.qraInfo}/></Tab.Pane>
        }, {
            menuItem: 'Information',
            render: () => <Tab.Pane><QRAProfileInfo qraInfo={props.qraInfo}/></Tab.Pane>
        }, {
            menuItem: 'Following',
            render: () => <Tab.Pane><QRAProfileFollowing following={props.qra.following}/></Tab.Pane>
        }, {
            menuItem: 'Followers',
            render: () => <Tab.Pane><QRAProfileFollowers followers={props.qra.followers}/></Tab.Pane>
            //       },       {           menuItem: 'Awards',           render: () =>
            // <Tab.Pane><QRAProfileFollowers/></Tab.Pane>
        }

    ];

    let buttonText;

    if (props.followed) {
        buttonText = "Unfollow";
    } else {
        buttonText = "Follow";
    }
    return (
        <div>
            <Helmet
                title={props.qraInfo.qra}
                meta={[
                {
                    name: 'author',
                    content: "SuperQSO.com"
                }, {
                    name: 'twitter:site',
                    content: "SuperQSO.com"
                }, {
                    name: 'twitter:creator',
                    content: "SuperQSO.com"
                }, {
                    name: 'twitter:title',
                    content: props.qraInfo.qra
                }, {
                    name: 'twitter:image',
                    content: props.qraInfo.profilepic
                }, {
                    name: 'og:title',
                    content: props.qraInfo.qra
                }, {
                    name: 'og:site_name',
                    content: "SuperQSO.com"
                }, {
                    name: 'og:type',
                    content: "website"
                }, {
                    name: 'og:url',
                    content: "http://superqso.com/" + props.qraInfo.qra
                }, {
                    name: 'og:description',
                    content: props.qraInfo.qra
                }, {
                    name: 'og:image',
                    content: props.qraInfo.profilepic
                }, {
                    name: 'og:site_name',
                    content: "SuperQSO.com"
                }, {
                    name: 'viewport',
                    content: 'width=device-width, maximum-scale=1'
                }, {
                    name: 'apple-itunes-app',
                    content: 'app-id=1125423676'
                }
            ]}/> {props.qraInfo
                ? <div>
                        <Segment>
                            <Grid columns={4}>
                                <Grid.Column>

                                    {props.qraInfo.profilepic && <Image src={props.qraInfo.profilepic} centered size='small' circular/>
}
                                </Grid.Column>
                                <Grid.Column floated="left">
                                    <Header as='h1' icon textAlign='center'>
                                        <Header.Content>
                                            {props.qraInfo.qra}
                                        </Header.Content>
                                    </Header>
                                    {(props.isAuthenticated && props.qraInfo.qra !== props.currentQRA) && <Button positive={!props.followed} onClick={() => props.onClick()}>
                                        {buttonText}
                                    </ Button>
}
                                    <Header as='h2' icon textAlign='center'>
                                        <Header.Content>
                                            {props.qraInfo.firstname && props.qraInfo.firstname + " "
}
                                            {props.qraInfo.lastname && props.qraInfo.lastname
}
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
};

export default QRAProfile;