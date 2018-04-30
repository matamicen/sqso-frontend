import React from "react";
import  Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

export class QSOCommentItem extends React.Component {
    constructor() {
        super();
        this.state = {
            comment: null,

        };
    }

    componentDidMount() {


        if (this.props.comment) {


        }
    }


    render() {
        var now = new Date();
        var year;
        var month;
        var commentDate = new Date(this.props.comment.datetime);
        var timestamp = "";

        if (this.props.comment.datetime) {
            //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
            if (now.getMonth() !== commentDate.getMonth()) {
                month = commentDate.toLocaleString('en-us', {month: "long"});
                timestamp = commentDate.getDate() + " of " + month;
            }

            if (now.getYear() !== commentDate.getYear()) {
                year = commentDate.getYear();
                timestamp = timestamp + " of " + year;
            }
            if (timestamp) timestamp = timestamp + ' at ';

            timestamp = timestamp + commentDate.getHours() + ":" + commentDate.getMinutes();
        }

        return (
            <Comment>

                <Comment.Content>
                    <Item.Extra>
                        <Button icon floated='right' size='mini'>
                            <Icon name='close' />
                        </Button>
                    </Item.Extra>
                    <Comment.Author><Link
                        to={"/" + this.props.comment.qra}>{this.props.comment.qra.toUpperCase()}</Link></Comment.Author>
                    <Comment.Metadata>
                        <span>{timestamp} </span>
                    </Comment.Metadata>
                    <Comment.Text>{this.props.comment.comment}</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QSOCommentItem);
