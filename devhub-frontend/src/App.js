import { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import DevHubPage from './pages';

const App = ({ isAuthenticated, username }) => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to={`/`} /> : <Login />}
          </Route>
          <Route path="/" component={DevHubPage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.userInfo.isAuthenticated,
  username: state.AuthReducer.userInfo.username,
});

export default connect(mapStateToProps, '')(App);
