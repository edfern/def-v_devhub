import { Button } from '../../components/button/index';
import CreateIcon from '@mui/icons-material/Create';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useAllRepositories } from '../../hooks/useItems';
import { connect } from 'react-redux';
import ItemRepositories from '../../components/item-repositories';
import { Main } from '../../components/main/main';
import { resetInfoDelete, setLoading } from '../actions/page.actions';
import { LoadingSpinner } from '../../components/spinner';
import { AlertSuccessDelete } from '../../components/alert';
import { useEffect } from 'react';
import { reloadId } from '../../Auth/actions/auth.actions';

const RepositoriesHome = ({
  active,
  id,
  loading,
  setLoading,
  infoDelete,
  resetInfoDelete,
  username,
  reloadId,
}) => {
  const history = useHistory();

  const { repositories } = useAllRepositories({ id, loading, setLoading });
  useEffect(() => {
    reloadId();
  }, []);

  return (
    <Main>
      <AlertSuccessDelete
        nameItem={infoDelete.nameRepository}
        open={infoDelete.successDelete}
        setOpen={resetInfoDelete}
      />

      <Grid columnSpacing={16}>
        <div className="grid-section">
          <div className="grid-section-header">
            <span className="section-title">Repositorios</span>
            <Button
              type="icon-button"
              variant="contained"
              icon={<CreateIcon />}
              text="Nuevo repositorio"
              onClick={() => history.push(`${username}/new`)}
            />
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : repositories.length > 0 ? (
          repositories.map((item, key) => (
            <ItemRepositories
              nameRepo={item.name}
              statusRepo={item.visible}
              description={item.description}
              key={key}
              to={`${username}/${item.name}`}
            />
          ))
        ) : (
          <div className="grid-body empty">
            <div className="grid-empty">
              <video autoPlay loop={true} muted>
                <source src="https://drawer.design/wp-content/uploads/2021/05/Cutie-Pack-Note.mp4" />
              </video>
              <span>Aun no tienes repositorios.</span>
            </div>
          </div>
        )}
      </Grid>
    </Main>
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

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesHome);
