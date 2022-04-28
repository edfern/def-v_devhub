import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RepositoriesHome from '../repositoriesHome';
import RepositoryCli from '../repositoryCli';
import RepositoryEdit from '../RepositoryEdit';
import RepositoryInfo from '../RepositoryInfo';
import NotFound from '../repositoryNotFound';
import RepositoryPage from '../repositoryPage';
import UserProfilePage from '../userProfile';
import NewRepositories from './newRepositorie';

const UserRepositoriesPage = ({ active }) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={RepositoriesHome} />
      <Route path={`${path}/new`}>
        <NewRepositories match={url} />
      </Route>
      <Route path={`${path}/profile`} component={UserProfilePage} />
      <Route
        exact
        path={`${path}/:nameRepository`}
        component={RepositoryPage}
      />
      <Route path={`${path}/:nameRepository/info`} component={RepositoryInfo} />
      <Route path={`${path}/:nameRepository/edit`} component={RepositoryEdit} />
      <Route path={`${path}/:nameRepository/cli`} component={RepositoryCli} />
      <Route path={`${path}/:nameRepository/not-found`} component={NotFound} />
    </Switch>
  );
};

export default UserRepositoriesPage;
