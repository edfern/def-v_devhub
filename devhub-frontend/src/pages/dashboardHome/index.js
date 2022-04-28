import { Main } from '../../components/main/main';
import iconHome from '../../assets/images/page-home.svg';
import { Button } from '../../components/button';
import CreateIcon from '@mui/icons-material/Create';
import { LabTabs } from '../../components/tab';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

import YourRepositories from './yourRepositories';
import StarredRepositories from './starredRepositories';
import ExploreRepositories from './exploreRepositories';
import { connect } from 'react-redux';
import { setLoading } from '../actions/page.actions';
import { useEffect } from 'react';
import { reloadId } from '../../Auth/actions/auth.actions';

const DashboardHome = ({ username, reloadId }) => {
  const history = useHistory();

  const header = [
    'Tus repositorios',
    'Repositorios descatacados',
    'Explorar repositorios',
  ];
  const content = [
    <YourRepositories />,
    <StarredRepositories />,
    <ExploreRepositories />,
  ];

  useEffect(() => {
    reloadId();
  }, []);
  return (
    <Main>
      <div className="card-info">
        <div className="card-info-icon">
          <img src={iconHome} alt="home" />
        </div>
        <div className="card-info-body">
          <div className="card-info-description">
            <strong>DevHub </strong> es un software de código abierto para
            colaborar en código. Administre repositorios de git con controles de
            acceso detallados que mantienen su código seguro. Realice revisiones
            de código y mejore la colaboración con solicitudes de combinación.
            Cada proyecto también puede tener un rastreador de problemas y una
            wiki.
          </div>
        </div>
      </div>
      <div className="main-header">
        <div className="main-title">
          <h3>Repositorios</h3>
          <Button
            type="icon-button"
            variant="contained"
            icon={<CreateIcon />}
            text="Nuevo repositorio"
            onClick={() => history.push(`${username}/new`)}
          />
        </div>
      </div>
      <LabTabs items={header} content={content} />
    </Main>
  );
};

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userInfo.id,
  loading: state.PageReducer.loading,
  username: state.AuthReducer.userInfo.username,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  reloadId: () => dispatch(reloadId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome);
