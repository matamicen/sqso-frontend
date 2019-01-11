import React from "react";

import Item from 'semantic-ui-react/dist/commonjs/views/Item'
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';

import FeedOptionsMenu from "./FeedOptionsMenu";

class QSOCommentItem extends React.Component {
    state = {
        comment: null
    }
     
    render() {
        var date = new Date(this.props.comment.datetime);
        var timestamp = "";

        if (this.props.comment.datetime) {
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/
            // Date/toLocaleString
            // if (now.getMonth() !== commentDate.getMonth()) {
            //     month = commentDate.toLocaleString('en-us', {month: "long"});
            //     timestamp = commentDate.getDate() + " of " + month;
            // }

            // if (now.getYear() !== commentDate.getYear()) {
            //     year = commentDate.getYear();
            //     timestamp = timestamp + " of " + year;
            // }
            // if (timestamp) 
            //     timestamp = timestamp + ' at ';
            timestamp = date.toLocaleDateString("EN-US",{month:"short"}) + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + date.getUTCHours() + ':' + date.getMinutes();

        }
        
        
        return (
            
            <Comment>
                <Comment.Content>
                    <Item.Extra>
                    <div
                            style={{
                            float: 'right'
                        }}>
                    <FeedOptionsMenu  comment_owner={this.props.comment.qra} idqso={this.props.comment.idqso} idcomment={this.props.comment.idqsos_comments} optionsCaller="FeedComment"/>                                    
                        </div>
                    </Item.Extra>
                    < Comment.Author >
                        <Link to={"/" + this.props.comment.qra}>{this
                                .props
                                .comment
                                .qra
                                .toUpperCase()}</Link>
                    </Comment.Author>
                    <Comment.Metadata>
                        <span>{timestamp}
                        </span >
                    </Comment.Metadata>
                    < Comment.Text >
                        {this.props.comment.comment
}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}

const mapStateToProps = (state) => ({token: state.default.userData.token,  currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(QSOCommentItem);
