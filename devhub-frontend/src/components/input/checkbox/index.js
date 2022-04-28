import { Checkbox } from '@mui/material';
import { Fragment, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

export const CheckBox = ({ title, setPrivate }) => {
  const [state, setState] = useState({ private: true, public: false });

  const handleChecked = (e) => {
    if (e.target.name === 'private') {
      setState({ private: true, public: false });
      setPrivate(false);
    }
    if (e.target.name === 'public') {
      setState({ private: false, public: true });
      setPrivate(true);
    }
  };

  return (
    <Fragment>
      <div className="input">
        <label className="input-label">{title}</label>
        <div className="ckeckbox-icon">
          <div className="checkbox-body">
            <Checkbox
              onChange={handleChecked}
              value={state.private}
              checked={state.private}
              name="private"
            />
            <div className="checkbox-info">
              <div className="label-icon">
                <LockIcon />
                <label className="checkbox-label">Privado</label>
              </div>
              <small className="checkbox-description">
                El acceso al proyecto debe otorgarse explícitamente a cada
                usuario. Si este proyecto es parte de un grupo, se otorgará
                acceso a los miembros del grupo.
              </small>
            </div>
          </div>
        </div>
        <div className="ckeckbox-icon">
          <div className="checkbox-body">
            <Checkbox
              onChange={handleChecked}
              value={state.public}
              checked={state.public}
              name="public"
            />
            <div className="checkbox-info">
              <div className="label-icon">
                <PublicIcon />
                <label className="checkbox-label">Público</label>
              </div>
              <small className="checkbox-description">
                Se puede acceder al proyecto sin ninguna autenticación.
              </small>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
