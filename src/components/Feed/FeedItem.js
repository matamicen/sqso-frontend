import React from "react";
import {AudioList} from "../AudioList";
import {FeedImage} from './FeedImage'
import {
    Feed,
    Icon,
    Label,
    Dropdown,
    Segment,
    Button,
    Item
} from "semantic-ui-react";
import QSOComments from "../QSOComments";
import QSOLikeButton from "./QSOLikeButton";
import {QRAs} from "../QRAs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import PropTypes from 'prop-types';
import {WhatsappShareButton, FacebookShareButton, TwitterShareButton} from 'react-share';
class FeedItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showComment: false
        };
        this.handleOnComment = this
            .handleOnComment
            .bind(this);
        this.recalculateRowHeight = this
            .recalculateRowHeight
            .bind(this);
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
        this
            .props
            .recalculateRowHeight(this.props.index);
    }

    render() {
        //    console.log(this.props.qso.idqsos)

        let picList = this
            .props
            .qso
            .media
            .filter((media) => media.type === "image");
        let audioList = this
            .props
            .qso
            .media
            .filter((media) => media.type === 'audio');

        return (
            <Segment raised>
                <Feed.Event>
                    <Item.Extra>
                        <Button icon floated='right' size='mini'>
                            <Icon name='ellipsis vertical'/>
                        </Button>
                    </Item.Extra>
                    <Feed.Content>
                        <Feed.Summary>
                            <QRAs
                                profilepic={this.props.qso.profilepic}
                                qso_owner={this.props.qso.qra}
                                qras={this.props.qso.qras}/>
                            <Label>Mode:</Label>{this.props.qso.mode}
                            <Label>Band:</Label>{this.props.qso.band}
                            <Label>QSO:
                            </Label>{this.props.qso.idqsos}
                        </Feed.Summary>

                        {picList.length > 0 && <FeedImage img={picList} measure={this.props.measure}/>
}

                        {audioList.length > 0 && <AudioList mediaList={audioList}/>
}

                        <Feed.Meta>
                            <Button.Group attached='bottom'>
                                <Button><QSOLikeButton qso={this.props.qso}/></Button>
                                <Button>
                                    <Feed.Like
                                        onClick={this
                                        .handleOnComment
                                        .bind(this)}>
                                        < Icon name='comment outline'/>
                                        Comment
                                    </Feed.Like>
                                </Button>
                                <Button>
                                    <Dropdown text='Share' icon='share alternate' floating className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item button>
                                                <WhatsappShareButton
                                                    title='CheckOut this QSO'
                                                    url={'http://d3cevjpdxmn966.cloudfront.net/qso/' + this.props.qso.idqsos}>

                                                    <Icon name='whatsapp'/>
                                                    WhatsApp

                                                </WhatsappShareButton>
                                            </Dropdown.Item>
                                            <Dropdown.Item button>
                                                <FacebookShareButton
                                                    quote="CheckOut this QSO"
                                                    url={'http://d3cevjpdxmn966.cloudfront.net/qso/' + this.props.qso.idqsos}>

                                                    <Icon name='facebook'/>
                                                    Facebook

                                                </FacebookShareButton>
                                            </Dropdown.Item>
                                            <Dropdown.Item button>
                                                <TwitterShareButton
                                                    title="CheckOut this QSO"
                                                    url={'http://d3cevjpdxmn966.cloudfront.net/qso/' + this.props.qso.idqsos}>

                                                    <Icon name='twitter'/>
                                                    Twitter

                                                </TwitterShareButton>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Button>
                            </Button.Group>
                        </Feed.Meta>
                        <Feed.Extra>
                            {this.state.showComment && <QSOComments
                                qso={this.props.qso}
                                recalculateRowHeight={this.recalculateRowHeight}/>
}
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            </Segment>
        )
    }
}
const mapStateToProps = (state, qsos) => ({fetchingQSOS: state.default.FetchingQSOS, qsosFetched: state.default.qsosFetched});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FeedItem);
FeedItem.PropTypes = {
    qso: PropTypes.object.isRequired,
    measure: PropTypes.func.isRequired
}