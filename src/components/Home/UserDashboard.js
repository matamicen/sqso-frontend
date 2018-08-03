import React from "react";
import NewsFeed from "../Feed/NewsFeedContainer";

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'

class UserDashboard extends React.PureComponent {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        

        return (

            <Grid>
                {(navigator.maxTouchPoints === 0) && <Grid.Row columns={3} only='computer'>
                    <Grid.Column width={3} only="computer">
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                    <Grid.Column computer={10} tablet={5}>

                        < NewsFeed/>

                    </Grid.Column>

                    <Grid.Column width={3} only="computer">
                        <Advertisement unit='wide skyscraper' test='Wide Skyscraper' centered/>
                    </Grid.Column>

                </Grid.Row>
}
                {(navigator.maxTouchPoints > 0) && <Grid.Row columns={1} only='mobile tablet'>
                    <Grid.Column>

                        < NewsFeed/>

                    </Grid.Column>
                </Grid.Row>
}
            </Grid>

        );
    }
}

export default(UserDashboard);
