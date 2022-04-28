import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './notFound';

import Header from '../components/layout/header';
import UserHome from './dashboard';

const DevHubPage = ({ username, isAuthenticated }) => {
  const [cardInfo, setCardInfo] = useState(false);

  return (
    <Fragment>
      {isAuthenticated ? (
        <div className="main">
          <Header onClick={() => setCardInfo(!cardInfo)} />
          <Switch>
            <Route path={`/`}>
              <UserHome />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.userInfo.isAuthenticated,
  username: state.AuthReducer.userInfo.username,
});

export default connect(mapStateToProps, '')(DevHubPage);
