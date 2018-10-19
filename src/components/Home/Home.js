import React from 'react'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import AppNavigation from './AppNavigation'
import FeedQSO from "../Feed/NewsFeedContainer";
import "./style.css";

const Home = (props) => (
               <container>
                <header>
                    <AppNavigation/>
                </header>
                <left>
                    <Advertisement className="left" unit='wide skyscraper' test='Wide Skyscraper'/>
                </left>

                <main >
                    < FeedQSO/>
                </main>

                <right>
                    <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                </right>

            </container>

);
export default Home


