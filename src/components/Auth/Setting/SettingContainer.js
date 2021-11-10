import Setting from './SettingComponent';
import { connect } from 'react-redux';
import { getSetting, updateSetting } from '~actions/auth';
const mapStateToProps = ({ settings: { adminSetting } }) => ({ adminSetting });
export default connect(mapStateToProps, { getSetting, updateSetting })(Setting);
