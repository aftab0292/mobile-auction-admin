import React, {Component, Fragment} from 'react';
import LoadScript from '~components/Util/LoadScript';

class Footer extends Component {
    render() {
        let scripts = [
            `${process.env.PUBLIC_URL}/assets/js/jquery.min.js`,
            `${process.env.PUBLIC_URL}/assets/js/vendor.min.js`,
            `${process.env.PUBLIC_URL}/assets/js/app.min.js`,
        ];
        return (
            <Fragment>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                { new Date().getFullYear() } &copy; Mobile Auction
                            </div>
                            <div className="col-md-6"/>
                        </div>
                    </div>
                </footer>
                <LoadScript scripts={scripts}/>
            </Fragment>
        );
    }
}

export default Footer;
