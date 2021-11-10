import React, { Component, Fragment } from 'react';
import StaticImage from '~components/Util/StaticImage';
import * as PropTypes from 'prop-types';

class Header extends Component {
    logOut = () => {
        const { history, signOut } = this.props;
        signOut();
        history.push('/');
    };

    render() {
        return (
            <Fragment>
                <div className="navbar-custom">
                    <ul className="list-unstyled topnav-menu float-right mb-0">
                        <li className="dropdown notification-list">
                            <button
                                className="nav-link dropdown-toggle waves-effect waves-light"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="false"
                                aria-expanded="false"
                                style={{
                                    border: 'none',
                                    color: '#fff',
                                    display: 'inline-block',
                                    height: '70px',
                                    lineHeight: '70px',
                                    width: '60px',
                                    backgroundColor: 'transparent',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }}
                            >
                                <i className="fe-settings noti-icon" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome John!</h6>
                                </div>
                                <a href="/profile" className="dropdown-item notify-item">
                                    <i className="fa fa-user" />
                                    <span>Profile</span>
                                </a>
                                <a href="/change-password" className="dropdown-item notify-item">
                                    <i className="fa fa-key" />
                                    <span>Change Password</span>
                                </a>
                                <a href="/setting" className="dropdown-item notify-item">
                                    <i className="fe-settings" />
                                    <span>Settings</span>
                                </a>
                                <a onClick={this.logOut} className="dropdown-item notify-item">
                                    <i className="fe-log-out" />
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>

                    <div className="logo-box">
                        <a href="/" className="logo text-center">
                            <span className="logo-lg">
                                <StaticImage src="logo.png" alt="" height="50" />
                            </span>
                            <span className="logo-sm">
                                <StaticImage src="logo.png" alt="" height="24" />
                            </span>
                        </a>
                    </div>

                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                        <li>
                            <button className="button-menu-mobile waves-effect waves-light">
                                <i className="fe-menu" />
                            </button>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

Header.propTypes = {
    signOut: PropTypes.func.isRequired,
};

export default Header;
