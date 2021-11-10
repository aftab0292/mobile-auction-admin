import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <Fragment>
        <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
                <li>
                    <Link to="/">
                        <i className="fe-airplay" />
                        <span> Dashboard </span>
                    </Link>
                </li>
                <li>
                    <a>
                        <i className="fe-users" />
                        <span> User Manager </span>
                        <span className="menu-arrow" />
                    </a>
                    <ul className="nav-second-level" aria-expanded="false">
                        <li>
                            <Link to="/users">Users List</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i className="fas fa-sitemap " />
                        <span> Category Manager </span>
                        <span className="menu-arrow" />
                    </a>
                    <ul className="nav-second-level" aria-expanded="false">
                        <li>
                            <Link to="/categories">Category List</Link>
                            <Link to="/categories/add-category">Add Category</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i className="fas fa-sitemap " />
                        <span> Feature Manager </span>
                        <span className="menu-arrow" />
                    </a>
                    <ul className="nav-second-level" aria-expanded="false">
                        <li>
                            <Link to="/features">Feature List</Link>
                            <Link to="/features/add">Add Feature</Link>
                            <Link to="/features/users">Feature Users List</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i className="fas fa-sitemap " />
                        <span> Auction Manager </span>
                        <span className="menu-arrow" />
                    </a>
                    <ul className="nav-second-level" aria-expanded="false">
                        <li>
                            <Link to="/auction/live">Live Auction List</Link>
                            <Link to="/auction/upcoming">Upcoming Auction List</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="clearfix" />
    </Fragment>
);

export default Sidebar;
