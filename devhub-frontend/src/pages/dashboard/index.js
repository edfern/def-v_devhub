import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserRepositoriesPage from '../userRepositories';
import DashboardHome from '../dashboardHome';

const UserHome = ({ match }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <DashboardHome />
      </Route>
      <Route path={`/:username`}>
        <UserRepositoriesPage />
      </Route>
    </Switch>
  );
};

export default UserHome;
