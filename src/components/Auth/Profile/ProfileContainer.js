import Profile from './ProfileComponent';
import { connect } from 'react-redux';

import { updateProfile } from '~actions/auth';

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps, { updateProfile })(Profile);
