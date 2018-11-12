import React from 'react'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import AppNavigation from './AppNavigation'
import FeedQSO from "../Feed/NewsFeedContainer";
import "../../styles/style.css";


const Home = (props) => (
    <div className='global-container'>
        <div className='site-header'>
            <AppNavigation/>
        </div>
        <div className='site-left'>
            <Advertisement className="left" unit='wide skyscraper' test='Wide Skyscraper'/>
        </div>

        <div className='site-main'>
            <FeedQSO/>
        </div>

        <div className='site-right'>
            <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
        </div>

    </div>

);
export default Home
