import React, { Fragment, useState } from 'react';
import { Button } from '../button/index';
import { InputText } from '../input';

import SaveIcon from '@mui/icons-material/Save';
import { connect } from 'react-redux';
import { setUsername } from '../../pages/actions/user.actions';

const FormRegister = ({ type, onSubmit, loading, setUsername, username }) => {
  const [nickName, setNickName] = useState('');

  const handleSumbit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    setNickName(e.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={handleSumbit} className="form-login">
        <InputText
          title="Nickname"
          description={`Ingresa tu nickname o puedes utilizar el mismo de ${type}.`}
          placeholder="james_brown"
          value={nickName}
          onChange={handleChange}
          requerid={true}
        />
        <div className="button-group">
          <Button
            text="Registrar"
            color="primary"
            type="submit"
            icon={<SaveIcon />}
            loading={loading}
          />
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  username: state.UserReducer.username,
});

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => dispatch(setUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister);
