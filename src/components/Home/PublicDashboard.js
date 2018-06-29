import React from "react";
import FeedQSO from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'

class PublicDashboard extends React.Component {

    render() {

        return (

            <Grid>
                {(navigator.maxTouchPoints === 0) && <Grid.Row columns={3} only='computer'>

                    <Grid.Column width={3} only="computer">
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                    <Grid.Column computer={10} tablet={5}>

                        < FeedQSO/>

                    </Grid.Column>

                    <Grid.Column width={3} only="computer">
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                </Grid.Row>
}
                {(navigator.maxTouchPoints > 0) && <Grid.Row columns={1} only='mobile tablet'>
                    <Grid.Column>

                        < FeedQSO/>

                    </Grid.Column>

                </Grid.Row>
}
            </Grid>

        );
    }
}

export default(PublicDashboard);