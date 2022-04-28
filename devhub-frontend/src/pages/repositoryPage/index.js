import { connect } from 'react-redux';
import { Link, Redirect, useParams, useRouteMatch } from 'react-router-dom';
import { AvatarRepositorie, AvatarUser } from '../../components/avatar';
import { Button } from '../../components/button/index';
import { Main } from '../../components/main/main';
import BackupIcon from '@mui/icons-material/Backup';
import { useRepositoryByName } from '../../hooks/useItems';
import { FormFiles } from '../../components/form/form-files';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TooltipIcon } from '../../components/tooltip';
import { useEffect, useRef, useState } from 'react';
import { Card } from '@mui/material';
import { menuSettingsRepository } from '../../util/itemsMenu';
import { CSSTransition } from 'react-transition-group';
import { useEventListner } from '../../hooks/useAddEventListener';
import { Fragment } from 'react';
import { LoadingSpinner } from '../../components/spinner';
import { setLoading } from '../actions/page.actions';

import ImageDefault from '../../assets/images/default.png';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const RepositoryPage = ({
  id,
  avatar,
  name,
  username,
  match,
  loading,
  setLoading,
  invited,
  infoInvited,
}) => {
  const [showOption, setShowOption] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [successFile, setSuccessFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const ref = useRef();
  const { nameRepository } = useParams();
  const { url } = useRouteMatch();
  const { repository } = useRepositoryByName({
    id,
    repository: {},
    name: nameRepository,
    setSuccess,
    setError,
    setLoading,
  });

  const handleShowSubMenu = (e) => {
    if (success & !invited) {
      if (!ref.current.contains(e.target)) {
        setShowOption(false);
      }
    }
  };

  useEventListner(handleShowSubMenu);

  const handleChangeFiles = (files) => {
    console.log(files);
  };

  const handleSubmitFile = (e, files) => {
    e.preventDefault();
    setLoadingFiles(true);
    (async () => {
      await sleep(1e3); // For demo purposes.
      setSuccessFile(true);
      setFiles(files);
      console.log(files);
      setLoadingFiles(false);
    })();
  };

  useEffect(() => {
    if (invited) {
      if (repository.name === 'DevHubUMG') {
        setSuccessFile(true);
        setFiles(repoArray);
      }
    }
  }, [repository]);

  return (
    <Main limit="limit" back={true}>
      {loading && <LoadingSpinner />}

      <CSSTransition in={success} classNames="fade" timeout={300} unmountOnExit>
        <Fragment>
          <div className="repository-header">
            <div className="info">
              <div className="info-left">
                <AvatarRepositorie to="#" text={nameRepository} />
                <div className="header-info">
                  <h3>{repository.name}</h3>
                  <span>
                    Repositorio ID: <strong>{repository.id}</strong>
                  </span>
                </div>
              </div>
              {!invited && (
                <div className="info-right" ref={ref}>
                  <TooltipIcon text="Más opciones">
                    <Button
                      type="settings"
                      onClick={() => setShowOption(!showOption)}
                      active={showOption}
                    >
                      <MoreVertIcon />
                    </Button>
                  </TooltipIcon>
                  <CSSTransition
                    in={showOption}
                    classNames="width"
                    timeout={300}
                    unmountOnExit
                  >
                    <div className="menu-options">
                      <Card>
                        <div className="submenu">
                          <ul>
                            {menuSettingsRepository.map((item, key) => (
                              <Link
                                key={key}
                                to={`${url}/${item.path}`}
                                onClick={() => setShowOption(false)}
                              >
                                <li>
                                  {item.icon} {item.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </div>
                  </CSSTransition>
                </div>
              )}
            </div>
            <div className="description">{repository.description}</div>
          </div>
          <div className="card-info normal">
            <div className="card-header">
              <h3 className="title">
                {' '}
                <strong>
                  ¡Detecte sus vulnerabilidades de seguridad antes de tiempo!
                </strong>
              </h3>
            </div>
            <div className="card-body">
              <p>
                {' '}
                <strong>DevHub</strong> con la colaboracion de{' '}
                <strong>Gitlab</strong> puede escanear su código en busca de
                vulnerabilidades de seguridad. Las pruebas de seguridad de
                aplicaciones estáticas (SAST) lo ayudan a preocuparse menos y
                construir más.
              </p>
            </div>
            <div className="card-footer">
              <Button
                type="info"
                text="Aprende más"
                onClick={() => {
                  window.open(
                    'https://docs.gitlab.com/ee/user/application_security/sast/index.html'
                  );
                }}
              />
            </div>
          </div>
          <div className="repository-body">
            <div className="card-info owner">
              <AvatarUser
                avatar={ImageDefault}
                invited={invited}
                type="header-profile"
                color="_black"
              />
              <div className="owner-info">
                <h3>Propietario del repositorio</h3>
                <span>
                  <Link to={`/${username}/profile`}>
                    {invited ? infoInvited.name : name}
                  </Link>{' '}
                  es el autor desde el 16/10/2021
                </span>
              </div>
            </div>
            <div className="repository-action">
              {successFile && (
                <Button
                  type="icon-button"
                  text="Subir archivo"
                  variant="contained"
                  icon={<BackupIcon />}
                  size="small"
                />
              )}
            </div>
            <div className="repository-files">
              <CSSTransition
                in={successFile}
                classNames="fade"
                unmountOnExit
                timeout={300}
              >
                <div>
                  {files.map((item, key) => (
                    <div className="item">
                      <div key={key}>{item.name}</div>
                      <div>{item.type}</div>
                    </div>
                  ))}
                </div>
              </CSSTransition>
              <CSSTransition
                in={!successFile}
                classNames="fade"
                unmountOnExit
                timeout={300}
              >
                <FormFiles onSubmit={handleSubmitFile} loading={loadingFiles} />
              </CSSTransition>
            </div>
          </div>
          <div className="repository-footer"> </div>
        </Fragment>
      </CSSTransition>

      {error && <Redirect to={`${url}/not-found`} />}
    </Main>
  );
};

const mapStateToProps = (state) => ({
  avatar: state.AuthReducer.userInfo.avatar,
  name: state.AuthReducer.userInfo.name,
  username: state.AuthReducer.userInfo.username,
  id: state.AuthReducer.userInfo.id,
  loading: state.PageReducer.loading,
  invited: state.AuthReducer.invited,
  infoInvited: state.AuthReducer.infoInvited,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryPage);

const repoArray = [
  {
    path: 'Web 1920 – 1-devhub-laptop.png',
    lastModified: 1627785835596,
    name: 'Web 1920 – 1-devhub-laptop.png',
    size: 142413,
    type: 'image/png',
    webkitRelativePath: '',
  },
  {
    path: 'default.png',
    lastModified: 1635415171554,
    name: 'default.png',
    size: 9739,
    type: 'image/png',
    webkitRelativePath: '',
  },
];
