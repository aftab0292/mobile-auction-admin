const defaultImgSize = 2097152;
const defaultVidSize = 10485760;

export const CATEGORY_ICON = {
    MAX_SIZE: parseInt(process.env.REACT_APP_CATEGORY_ICON_SIZE || defaultImgSize),
    MAX_FILES: 1,
    LOCATION: 'categories',
    EXTENSION: 'jpg'
};