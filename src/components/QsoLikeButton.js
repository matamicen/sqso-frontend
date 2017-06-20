import React from 'react';
import ThumbsOff from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsOn from 'react-icons/lib/fa/thumbs-up';
import {  Button  } from 'react-bootstrap';


export  class QsoLikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            liked: !this.state.liked
        });
    }

    render() {
        const label = this.state.liked ? <ThumbsOn/> : <ThumbsOff/>
        return (
            <div className="customContainer">
                <Button type="button" bsStyle="success" block onClick={this.handleClick} >
                    {label}
                </Button>
            </div>
        );
    }
}