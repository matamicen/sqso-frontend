import React from "react";
import {AudioList} from "../AudioList";
import {Image} from '../Image'
import {Feed, Icon, Label, Segment, Button, Item} from "semantic-ui-react";
import QSOComments from "../QSOComments";
import QSOLikeButton from "../QSOLikeButton";
import {QRAs} from "../QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';


class QSOFeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showComment: false
        };
        this.handleOnComment = this.handleOnComment.bind(this);
        this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        //   console.log("shouldComponentUpdate QSOFEEDITEM" + this.props.qsosFetched);
        return this.props.qsosFetched;
    }


    handleOnComment() {
        console.log("Comment Pressed");
        this.setState({showComment: true});
        this.recalculateRowHeight();
    }

    recalculateRowHeight() {
        console.log("recalculateRowHeight");
        this.props.recalculateRowHeight(this.props.index);
    }


    render() {
        //    console.log(this.props.qso.idqsos)
        let image = null;
        let picList = this.props.qso.media.filter((media) => media.type === "image");
        if (picList.length > 0) {
            image =

                <Image img={picList[0].url}              
                       measure={this.props.measure}/>
            ;
        }


        let audioList = this.props.qso.media.filter((media) => media.type === 'audio');

        let audio = null;
        if (audioList.length > 0) {
            audio = <AudioList mediaList={audioList}/>;
        }

        let comment = null;
        if (this.state.showComment) {
            comment = <QSOComments
                qso={this.props.qso}
                recalculateRowHeight={this.recalculateRowHeight}/>;
        }


                return (
            <Segment raised>
                <Feed.Event>
                    <Item.Extra>
                        <Button icon floated='right' size='mini'>
                            <Icon name='close'/>
                        </Button>
                    </Item.Extra>
                    <Feed.Content>
                        <Feed.Summary>
                            <QRAs profilepic={this.props.qso.profilepic} qso_owner={this.props.qso.qra}
                                  qras={this.props.qso.qras}/>
                            <Label>Mode:</Label>{this.props.qso.mode}
                            <Label>Band:</Label>{this.props.qso.band}
                            <Label>QSO: </Label>{this.props.qso.idqsos}
                        </Feed.Summary>

                        {image}

                        {audio}

                        <Feed.Meta>
                            <QSOLikeButton qso={this.props.qso}/>
                            <Feed.Like onClick={this.handleOnComment.bind(this)}>
                                < Icon name='comment outline'/>
                                Comment
                            </Feed.Like>
                        </Feed.Meta>
                        <Feed.Extra>
                            {comment}
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            </Segment>
        )
        }
}



const mapStateToProps = (state, qsos) => ({
    fetchingQSOS: state.default.FetchingQSOS,
    qsosFetched: state.default.qsosFetched,

});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(
mapStateToProps,
mapDispatchToProps, null, {
    pure: false
}
)(QSOFeedItem);

 QSOFeedItem.PropTypes = {
     qso : PropTypes.object.isRequired,
     measure: PropTypes.func.isRequired
 }