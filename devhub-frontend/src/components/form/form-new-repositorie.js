import { Fragment, useEffect, useState } from 'react';
import { ItemsCheckBox } from '../../util/itemsCheckBox.js';
import { CheckBox } from '../input/checkbox';
import { InputTextForm } from '../input/input-form';

import { Button } from '../button/index';
import { Grid } from '@mui/material';
import { useRepository } from '../../hooks/useRepository.js';
import { connect } from 'react-redux';
import { AlertError } from '../alert/index';
import { useHistory } from 'react-router-dom';

const FormNewRepo = ({ id, match }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { newRepo, repository } = useRepository();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [inputs, setInputs] = useState({
    id: id,
    name: '',
    description: '',
    visible: false,
  });

  const handleChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newRepo(inputs, setLoading, setError, setMessage);
  };

  useEffect(() => {
    if (Object.keys(repository).length > 0) {
      history.push(`${match}/${repository.name}`);
    }
  }, [repository, history, match]);

  return (
    <Fragment>
      <form className="form-new-repo" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={9}>
            <InputTextForm
              title="Nombre"
              type="text"
              description="Los grandes nombres de repositorios son breves y fáciles de recordar. ¿Necesitas inspiración?"
              placeholder="Mi impresionante proyecto"
              onChange={handleChangeInputs}
              name="name"
              readOnly={false}
              requerid={true}
            />
          </Grid>
        </Grid>
        <InputTextForm
          title="Descripción del proyecto (opcional)"
          type="text"
          description="Agrega una descripción a tu repositorio para que sea mas fácil recordar que contiene."
          placeholder="Mi impresionante proyecto"
          multiline={true}
          rows={5}
          maxRows={6}
          name="description"
          onChange={handleChangeInputs}
          readOnly={false}
          requerid={true}
        />
        <CheckBox
          title="Nivel de visibilidad"
          items={ItemsCheckBox}
          setPrivate={(e) => setInputs({ ...inputs, visible: e })}
        />
        <div className="form-action">
          <Button
            type="submit-form"
            text="Crear repositorio"
            color="primary"
            size="small"
            variant="contained"
            onSubmit={handleSubmit}
            loading={loading}
            action="submit"
          />
          <Button
            type="submit-form-normal"
            text="Cancelar"
            size="small"
            variant="outlined"
            disabled={loading}
            action="button"
            onClick={() => history.push(`${match}`)}
          />
        </div>
        <AlertError
          description={message}
          open={error}
          setOpen={() => setError(false)}
        />
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userInfo.id,
});
export default connect(mapStateToProps, null)(FormNewRepo);
