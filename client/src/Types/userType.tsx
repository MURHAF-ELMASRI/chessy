import propTypes from 'prop-types';

const userType = {
    uid: propTypes.string.isRequired,
    dispalyName: propTypes.string.isRequired,
    email: propTypes.string,
    photoURL: propTypes.string,
    lose: propTypes.number,
    win: propTypes.number,
    tie: propTypes.number,
};

export default userType;
