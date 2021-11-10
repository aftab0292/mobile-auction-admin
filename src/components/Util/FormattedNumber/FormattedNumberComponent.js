import * as PropTypes from 'prop-types';

const toFixedFix = (n, prec) => {
  const k = 10 ** prec;
  return `${(Math.round(n * k) / k).toFixed(prec)}`;
};

const FormattedNumber = ({ number = 0, decimals = 2, decPoint = '.', thousandsSep = ',' }) => {
  const cleanNumber = `${number}`.replace(/[^0-9+\-Ee.]/g, '');
  const n = !Number.isFinite(+cleanNumber) ? 0 : +cleanNumber;
  const precision = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);

  const s = (precision ? toFixedFix(n, precision) : `${Math.round(n)}`).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep);
  }
  if ((s[1] || '').length < precision) {
    s[1] = s[1] || '';
    s[1] += new Array(precision - s[1].length + 1).join('0');
  }

  return s.join(decPoint);
};

FormattedNumber.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  decimals: PropTypes.number,
  decPoint: PropTypes.string,
  thousandsSep: PropTypes.string
};

FormattedNumber.defaultProps = {
  number: 0,
  decimals: 2,
  decPoint: '.',
  thousandsSep: ','
};

export default FormattedNumber;
