import React, { Component, Fragment, Suspense } from 'react';
import 'react-virtualized/styles.css';
import Loader from '~components/Util/Loader';
import * as PropTypes from 'prop-types';

const HeaderComponent = React.lazy(() => import('~components/Layout/Header'));
const FooterComponent = React.lazy(() => import('~components/Layout/Footer'));
const SidebarComponent = React.lazy(() => import('~components/Layout/Sidebar'));

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <HeaderComponent/>
        <div className="left-side-menu">
          <div className="slimscroll-menu">
            <Suspense fallback={<Loader/>}>
              <SidebarComponent/>
            </Suspense>
          </div>
        </div>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <Suspense fallback={<Loader/>}>{children}</Suspense>
            </div>
          </div>
          <FooterComponent />
        </div>
      </Fragment>
    );
  }
}

export default Layout;

const PRELOAD_COMPONENTS = [
  'Util/AbbreviatedNumber',
  'Util/AutoParagraph',
  'Util/DateTime',
  'Util/ErrorBoundary',
  'Util/Excerpt',
  'Util/FormattedNumber',
  'Util/LazyImage',
  'Util/StaticImage'
];
PRELOAD_COMPONENTS.forEach(component => import(`~components/${component}`));
