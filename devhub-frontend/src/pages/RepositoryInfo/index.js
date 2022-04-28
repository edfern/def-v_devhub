import { Grid } from '@mui/material';
import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { AvatarRepositorie } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputTextForm } from '../../components/input/input-form';
import { Main } from '../../components/main/main';
import { LoadingSpinner } from '../../components/spinner';
import { useRepositoryByName } from '../../hooks/useItems';
import { setLoading } from '../actions/page.actions';

const RepositoryInfo = ({
  id,
  avatar,
  name,
  username,
  loading,
  setLoading,
}) => {
  const [showOption, setShowOption] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { nameRepository } = useParams();
  const { repository } = useRepositoryByName({
    id,
    repository: {},
    name: nameRepository,
    setSuccess,
    setError,
    setLoading,
  });
  return (
    <Main limit="limit" back={true}>
      {loading && <LoadingSpinner />}
      <CSSTransition in={success} classNames="fade" timeout={300} unmountOnExit>
        <Fragment>
          <div className="main-header info">
            <div className="main-title">
              <div>
                <h3>Información general</h3>
                Información general y vista técnica del proyecto{' '}
                <strong>{repository.name}</strong>
              </div>
            </div>
          </div>
          <div className="main-body">
            <Grid container spacing={5}>
              <Grid item xs={5}>
                <InputTextForm
                  value={repository.name || ''}
                  readOnly={true}
                  title="Nombre del proyecto"
                />
              </Grid>
              <Grid item xs={2}>
                <InputTextForm
                  value={`${username[0]}${username[1]}-${repository.id}` || ''}
                  readOnly={true}
                  title="ID del proyecto"
                />
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <InputTextForm
                  value={repository.description || ''}
                  readOnly={true}
                  title="Descripción del proyecto"
                  multiline={true}
                  rows={2}
                  maxRows={6}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <div className="avatar-description">
                  <AvatarRepositorie
                    to="#"
                    text={`${repository.name}`}
                    width="80px"
                    height="80px"
                    size="30px"
                  />
                  <div className="info">
                    <h3 className="title">Avatar del proyecto</h3>
                    <span className="description">
                      El tamaño máximo del archivo es de 200 KB.
                    </span>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div className="card-info normal">
                  <div className="card-header">
                    <h3 className="title">
                      {' '}
                      <strong>
                        Actualice su plan para mejorar las solicitudes de
                        fusión.
                      </strong>
                    </h3>
                  </div>
                  <div className="card-body">
                    <ul>
                      <li>
                        Fusionar aprobaciones de solicitudes Establezca el
                        número de aprobaciones necesarias y defina una lista de
                        aprobadores necesarios para cada solicitud de fusión en
                        un proyecto.
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <Button
                      variant="outlined"
                      type="info"
                      text="Pruébalo gratis"
                      onClick={() => {
                        window.location =
                          'https://gitlab.com/-/trials/new?glm_content=mr_features&glm_source=gitlab.com';
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      </CSSTransition>
    </Main>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.AuthReducer.userInfo.avatar,
  name: state.AuthReducer.userInfo.name,
  username: state.AuthReducer.userInfo.username,
  id: state.AuthReducer.userInfo.id,
  loading: state.PageReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryInfo);
