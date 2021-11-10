const AbbreviatedNumber = ({value}) => {
    if (!value) return 0;
    if (value < 1000 - 1) {
        return value;
    }
    if (value < 1000000 - 1) {
        return (Math.floor(value / 100) / 10) + 'K';
    }
    if (value < 1000000000 - 1) {
        return (Math.floor(value / 10000) / 100) + 'M';
    }
    if (value < 1000000000000 - 1) {
        return (Math.floor(value / 1000000) / 1000) + 'B';
    }
    return value;
};

export default AbbreviatedNumber;
