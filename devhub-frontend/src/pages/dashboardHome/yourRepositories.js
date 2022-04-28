import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemRepositories from '../../components/item-repositories';
import { LabTabs } from '../../components/tab';
import {
  useAllRepositories,
  useAllRepositoriesShared,
} from '../../hooks/useItems';
import { setLoading } from '../actions/page.actions';
import IconDefault from '../../assets/images/public-default.gif';

import { LoadingSpinner } from '../../components/spinner';
import { apiSearchUserByIdRepo } from '../../services/apiRepository';
import { setId } from '../../Auth/actions/auth.actions';

const AllRepositories = ({ id, loading, setLoading, username }) => {
  const { repositories } = useAllRepositories({ id, setLoading });

  return (
    <Fragment>
      <div>
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
      </div>
    </Fragment>
  );
};

const SharedRepository = ({ id, setLoading, loading, username, setId }) => {
  const { repositories } = useAllRepositoriesShared({ id, setLoading });
  const [userRepository, setUserRepository] = useState([]);
  useEffect(() => {
    if (Object.keys(repositories).length > 0) {
      for (const repository of repositories) {
        setLoading(true);
        apiSearchUserByIdRepo({ idRepo: repository.id })
          .then((resp) => {
            setUserRepository([{ ...repository, user: resp.data }]);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [repositories, setLoading]);

  const handleClick = ({ id, name, username }) => {
    const userInfo = localStorage.getItem('userInfo');
    const info = JSON.parse(userInfo);

    const data = {
      id: id,
      invited: true,
    };
    if (info.id === id) {
      setId({ ...data, invited: false });
    } else {
      setId({ ...data, invited: true, name, username });
    }
  };

  return (
    <Fragment>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : userRepository.length > 0 ? (
          userRepository.map((item, key) => (
            <ItemRepositories
              nameRepo={item.name}
              statusRepo={item.visible}
              description={item.description}
              key={key}
              to={`/${item.user.username}/${item.name}`}
              invite={true}
              username={item.user.username}
              onClick={() =>
                handleClick({
                  id: item.user.id,
                  name: item.user.name,
                  username: item.user.username,
                })
              }
            />
          ))
        ) : (
          <div className="grid-body empty">
            <div className="grid-empty">
              <img
                src={IconDefault}
                alt="public-empty"
                width={100}
                height={100}
              />
              <span>Aún no eres colaborador de algún repostorio.</span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const PrivateRepositories = ({ id, setLoading, loading, username }) => {
  const { repositories } = useAllRepositories({ id, setLoading });
  const repositoriesPrivate = repositories.filter(
    (item) => item.visible === false
  );
  return (
    <Fragment>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : repositoriesPrivate.length > 0 ? (
          repositoriesPrivate.map((item, key) => (
            <ItemRepositories
              nameRepo={item.name}
              statusRepo={item.visible}
              description={item.description}
              key={key}
              to={`/${username}/${item.name}`}
            />
          ))
        ) : (
          <div className="grid-body empty">
            <div className="grid-empty">
              <img
                src={IconDefault}
                alt="public-empty"
                width={100}
                height={100}
              />
              <span>Aún no tienes repositorios privados.</span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const PublicRepositories = ({ id, setLoading, loading, username }) => {
  const { repositories } = useAllRepositories({ id, setLoading });
  const repositoriesPublic = repositories.filter(
    (item) => item.visible === true
  );
  return (
    <Fragment>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : repositoriesPublic.length > 0 ? (
          repositoriesPublic.map((item, key) => (
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
              <img
                src={IconDefault}
                alt="public-empty"
                width={100}
                height={100}
              />
              <span>Aún no tienes repositorios públicos.</span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const YourRepositories = ({ id, loading, setLoading, username, setId }) => {
  const header = ['Todos', 'Privados', 'Públicos', 'Miembro'];
  const content = [
    <AllRepositories
      id={id}
      loading={loading}
      setLoading={setLoading}
      username={username}
    />,
    <PrivateRepositories
      id={id}
      loading={loading}
      setLoading={setLoading}
      username={username}
    />,
    <PublicRepositories
      setLoading={setLoading}
      id={id}
      loading={loading}
      username={username}
    />,
    <SharedRepository
      setLoading={setLoading}
      id={id}
      loading={loading}
      username={username}
      setId={setId}
    />,
  ];
  return <LabTabs items={header} content={content} />;
};

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userInfo.id,
  loading: state.PageReducer.loading,
  username: state.AuthReducer.userInfo.username,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  setId: (id) => dispatch(setId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourRepositories);
