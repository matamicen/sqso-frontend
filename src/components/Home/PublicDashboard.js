import React from "react";
import FeedQSO from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'

class PublicDashboard extends React.Component {

    render() {

        return (
           <div >
            <Grid centered>
                {(navigator.maxTouchPoints === 0) && <Grid.Row  >

                    <Grid.Column style={{ "minWidth": '180px'}}>
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                    </Grid.Column>

                    <Grid.Column  style={{ "minWidth": '700px'}}>

                        < FeedQSO/>

                    </Grid.Column>

                    <Grid.Column  style={{ "minWidth": '180px'}}>
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' />
                    </Grid.Column>

                </Grid.Row>
}
                {(navigator.maxTouchPoints > 0) && <Grid.Row columns={1} >
                    <Grid.Column>

                        < FeedQSO/>

                    </Grid.Column>

                </Grid.Row>
}
            </Grid>            
            </div>
        );
    }
}

export default(PublicDashboard);