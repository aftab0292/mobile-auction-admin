import {connect} from "react-redux";
import DateTimePicker from './DateTimePickerComponent';

const mapStateToProps = ({ settings: { language } }) => ({ language });

export default connect(mapStateToProps)(DateTimePicker);
