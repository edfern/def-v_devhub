import { TextField } from '@mui/material';
import { Fragment } from 'react';

export const InputText = ({
  title,
  name,
  type,
  onChange,
  value,
  placeholder,
  description,
  requerid,
}) => {
  const inputStyle = {
    margin: '10px 0px 0px 0px',
    borderRadius: '50px',
    width: '100%',
  };
  return (
    <Fragment>
      <div className="input">
        <label className="input-label">{title}</label>
        <TextField
          style={inputStyle}
          variant="outlined"
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          size="small"
          placeholder={placeholder}
          required={requerid}
        />
        {description && (
          <small className="input-description">{description}</small>
        )}
      </div>
    </Fragment>
  );
};
