import { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Main } from '../../components/main/main';
import Section from '../../components/section';
import FormEditRepo from '../../components/form/form-edit-repo';
import { Link, useParams } from 'react-router-dom';
import { useRepositoryByName } from '../../hooks/useItems';
import { setLoading, setInfoDelete } from '../actions/page.actions';
import { connect } from 'react-redux';
import { Button } from '../../components/button';
import { AlertError } from '../../components/alert';
import { InputTextForm } from '../../components/input/input-form';
import Autocomplete from '../../components/autocomplete';
import Select from '../../components/select';
import { useRepository } from '../../hooks/useRepository';
import { useHistory } from 'react-router-dom';
import { useAllUser } from '../../hooks/useFile';
import { AvatarUser } from '../../components/avatar';
import ImageDefault from '../../assets/images/default.png';

const RepositoryEdit = ({
  id,
  username,
  loading,
  setLoading,
  setInfoDelete,
}) => {
  const [success, setSuccess] = useState(false);
  const [refresh, setReflesh] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { nameRepository } = useParams();
  const { update, deleteRepository, addUserMembers, getMembers } =
    useRepository();
  const [inputDelete, setInputDelete] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successMembers, setSuccessMembers] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [errorMembers, setErrorMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [showButtonMembers, setShowButtonMembers] = useState(true);

  const [reload, setReload] = useState(false);
  const history = useHistory();
  const [item, setItem] = useState({});
  const [roles, setRoles] = useState('');

  const { repository } = useRepositoryByName({
    id,
    name: nameRepository,
    setSuccess,
    setError,
    setLoading,
    refresh,
  });

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    let { id } = repository;
    deleteRepository({
      id,
      setLoading,
      setError,
      setMessage,
      setSuccess: setSuccessDelete,
    });
  };

  const handleSubmitStatus = (e) => {
    e.preventDefault();
    repository['visible'] = !repository.visible;

    update({
      setLoading,
      setError,
      setMessage,
      repository,
      setSuccess,
    });
  };
  const handleChangeDelete = (e) => {
    setInputDelete(e.target.value);
  };

  useEffect(() => {
    if (inputDelete === 'delete me') {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [inputDelete]);

  useEffect(() => {
    if (successDelete) {
      setInfoDelete({
        successDelete: true,
        nameRepository,
      });

      history.push(`/repositories`);
    }
  }, [successDelete, history, username, setInfoDelete, nameRepository]);

  const handleSubmitMembers = (e) => {
    const info = {
      idRepo: repository.id,
      idUser: item.id,
    };
    e.preventDefault();
    addUserMembers({
      info,
      setLoading: setLoadingMembers,
      setError: setErrorMembers,
      setMessage,
      setSuccess: setSuccessMembers,
      setReload,
    });
  };

  const { users } = useAllUser();

  useEffect(() => {
    if (roles !== '') {
      setShowButtonMembers(false);
    } else {
      setShowButtonMembers(true);
    }
  }, [item, roles]);

  useEffect(() => {
    getMembers({
      id: repository.id,
      setMembers,
      setMessage,
      setReload,
    });
    if (reload) {
      getMembers({
        id: repository.id,
        setMembers,
        setMessage,
        setReload,
      });
    }
  }, [repository, reload, getMembers]);

  return (
    <Main limit="limit" back={true}>
      <CSSTransition in={success} classNames="fade" timeout={300} unmountOnExit>
        <Fragment>
          <div className="main-header info">
            <div className="main-title">
              <div>
                <h3>Configuración general</h3>
                Modifica la información general de tu repositorio.{' '}
              </div>
            </div>
          </div>
          <div className="main-body">
            <Section
              title="Nombre y descripción"
              description="Modifica el nombre y descripción de tu repositorio."
              expand={true}
              onClick={() => setReflesh(!refresh)}
            >
              {success && <FormEditRepo repoUpdate={repository} />}
            </Section>
            <Section
              title="Privacidad"
              description="Modifica la visibilidad del repositorio."
            >
              <div className="section-body">
                <div className="section item">
                  <h3>Visibilidad</h3>
                  <form onSubmit={handleSubmitStatus}>
                    {repository && repository.visible ? (
                      <div>
                        Tu repositorio esta público.
                        <div>
                          ¿Quieres cambiar a <strong>privado</strong>?
                        </div>
                      </div>
                    ) : (
                      <div>
                        Tu repositorio esta privado.
                        <div>
                          ¿Quieres cambiar a <strong>público</strong>?
                        </div>
                      </div>
                    )}
                    <div className="form-action">
                      <Button
                        type="submit-form"
                        text={
                          repository
                            ? repository.visible
                              ? 'Privado'
                              : 'Público'
                            : 'No disponible'
                        }
                        color="primary"
                        size="small"
                        variant="contained"
                        onSubmit={handleSubmitStatus}
                        loading={loading}
                        action="submit"
                      />
                    </div>
                    <AlertError
                      description={message}
                      error={error}
                      setError={() => setError(false)}
                    />
                  </form>
                </div>
                <div className="section item">
                  <h3>Miembros</h3>
                  <div>
                    Puede invitar a un nuevo miembro a
                    <strong> {repository.name}</strong> o invitar a otro grupo.
                  </div>
                  <div className="members">
                    <form onSubmit={handleSubmitMembers}>
                      <div>
                        <Autocomplete
                          title="Buscar miembros"
                          placeholder="Buscar"
                          items={users}
                          onSelect={(e) => setItem(e)}
                        />
                        <Select
                          title="Selecciona un role"
                          onChange={(e) => setRoles(e.target.value)}
                        />
                      </div>
                      <div className="form-actions">
                        <Button
                          type="submit-form"
                          text={`Agregar`}
                          color="primary"
                          size="small"
                          variant="contained"
                          onSubmit={handleSubmitMembers}
                          loading={loadingMembers}
                          action="submit"
                          disabled={showButtonMembers}
                        />
                      </div>

                      <AlertError
                        description={message}
                        error={error}
                        setError={() => setError(false)}
                      />
                    </form>
                    <div className="members-repository">
                      <h3 className="title">Miembros en {repository.name}</h3>
                      {Object.keys(members).length > 0 ? (
                        members.map((item, key) => (
                          <div className="card-info members" key={key}>
                            <AvatarUser
                              avatar={ImageDefault}
                              invited={true}
                              type="header-profile"
                              color="_black"
                            />
                            <div className="owner-info">
                              <h3>Miembro: @{item.username}</h3>
                              <span>
                                <Link to={`/${item.username}/profile`}>
                                  {item.name}
                                </Link>{' '}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>aun no tienes aun miembro en tu repositorio</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
            <Section
              title="Eliminar repositorio"
              description="Elimina tu repositorio pero ten cuidado ya que no podras revertir esta acción."
            >
              <div className="section-body">
                <div className="section item">
                  <h3>¿Estás absolutamente seguro?</h3>
                  <div className="section-delete">
                    <div className="card-info delete">
                      <form onSubmit={handleSubmitDelete}>
                        <h3 className="title">
                          ¡Sucederán cosas malas inesperadas si no lee esto!
                        </h3>
                        <div className="description">
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente el repositorio de{' '}
                          <strong>{username}</strong> /{' '}
                          <strong>{repository.name}</strong> , wiki, problemas,
                          comentarios, paquetes, secretos, ejecuciones de flujo
                          de trabajo y eliminará todas las asociaciones de
                          colaboradores. Esto no cambiará su plan de
                          facturación. Si desea bajar de categoría, puede
                          hacerlo en su Configuración de facturación.
                          <div>
                            Escriba{' '}
                            <b>
                              <i>delete me</i>
                            </b>{' '}
                            para confirmar.
                          </div>
                        </div>
                        <InputTextForm
                          type="text"
                          onChange={handleChangeDelete}
                        />
                        <div className="form-action center">
                          <Button
                            type="submit-form"
                            color="secondary"
                            size="small"
                            variant="outlined"
                            onSubmit={handleSubmitDelete}
                            loading={loading}
                            action="submit"
                            text="Entiendo las consecuencias, quiero elimiar este repositorio"
                            disabled={disabledButton}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
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
  infoDelete: state.PageReducer.deleteRepository,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  setInfoDelete: (infoDelete) => dispatch(setInfoDelete(infoDelete)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RepositoryEdit);
