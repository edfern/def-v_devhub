import { Fragment, useEffect, useState } from 'react';

import { InputTextForm } from '../input/input-form';

import { Button } from '../button/index';
import { Grid } from '@mui/material';
import { useRepository } from '../../hooks/useRepository.js';
import { connect } from 'react-redux';
import { AlertError, AlertSuccess } from '../alert/index';

const FormEditRepo = ({ repoUpdate }) => {
  const [repository, setRepository] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { update } = useRepository();
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);

  const [inputs, setInputs] = useState({
    id: 0,
    name: '',
    description: '',
    visible: false,
    path: '',
  });

  const handleChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update({
      setLoading,
      setError,
      setMessage,
      repository: inputs,
      setSuccess,
    });
  };

  useEffect(() => {
    if (
      inputs.name === repoUpdate.name &&
      inputs.description === repoUpdate.description
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [inputs, setButton, repoUpdate]);

  useEffect(() => {
    setInputs({
      id: repoUpdate.id,
      name: repoUpdate.name,
      description: repoUpdate.description,
      visible: repoUpdate.visible,
      path: repoUpdate.path,
    });
  }, [repoUpdate]);

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
              readOnly={true}
              requerid={true}
              value={inputs.name}
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
          value={inputs.description}
        />
        <div className="form-action">
          <Button
            type="submit-form"
            text="Guardar"
            color="primary"
            size="small"
            variant="contained"
            onSubmit={handleSubmit}
            loading={loading}
            action="submit"
            disabled={button}
          />
        </div>
        <AlertError
          description={message}
          error={error}
          setError={() => setError(false)}
        />
        <AlertSuccess
          open={success}
          setOpen={() => setSuccess(false)}
          description={`Se ha actualizado correctamente la descripción de tu repositorio ${repoUpdate.name}`}
        />
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userInfo.id,
});
export default connect(mapStateToProps, null)(FormEditRepo);
