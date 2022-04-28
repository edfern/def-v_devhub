import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Avatar = ({ avatar, image, type, color, invited, infoInvited }) => {
  return (
    <Fragment>
      <div className={`avatar ${type} ${color}`}>
        <img
          src={invited ? avatar : image}
          alt="avatar"
          className="image-profile"
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  image: state.AuthReducer.userInfo.avatar,
  infoInvited: state.AuthReducer.infoInvited,
});

const mapDispatchToProps = (dispatch) => ({
  ...dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
