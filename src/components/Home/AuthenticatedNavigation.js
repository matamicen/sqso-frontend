import React from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Actions';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import NavigationSearch from './NavigationSearch'

class AuthenticatedNavigation extends React.Component {
    render() {
        return (
            <div>
            <Menu fixed='top'>
                <Menu.Item>
                    <Link to='/'>
                        SuperQSO
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <NavigationSearch/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item icon='setting'>                        
                        <Dropdown.Menu>
                        <Dropdown.Header content={this.props.currentQRA}/>
                        <Dropdown.Divider/>
                            <Dropdown.Item>
                                <Link to='/logout'>
                                    Signout
                                </Link>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>

            </Menu>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({currentQRA: state.default.userData.qra});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AuthenticatedNavigation);
