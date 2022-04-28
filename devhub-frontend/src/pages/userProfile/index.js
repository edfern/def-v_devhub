import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { reloadId } from '../../Auth/actions/auth.actions';
import { Main } from '../../components/main/main';
import { CardInfoUser } from '../../components/profile';
import { resetInfoDelete, setLoading } from '../actions/page.actions';
import { OverViewPage } from '../overview';

const UserProfilePage = ({ reloadId }) => {
  useEffect(() => {
    reloadId();
  }, []);
  return (
    <Fragment>
      <CardInfoUser />
      <Main limit={true} active={true}>
        <OverViewPage />
      </Main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userInfo.id,
  loading: state.PageReducer.loading,
  infoDelete: state.PageReducer.deleteRepository,
  username: state.AuthReducer.userInfo.username,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  resetInfoDelete: () => dispatch(resetInfoDelete()),
  reloadId: () => dispatch(reloadId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
