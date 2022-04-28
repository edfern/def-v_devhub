import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Fragment } from 'react';

export const InputTextForm = ({
  title,
  name,
  type,
  onChange,
  value,
  placeholder,
  description,
  requerid,
  multiline,
  rows,
  maxRows,
  readOnly,
}) => {
  const inputStyle = {
    margin: '10px 0px 0px 0px',
    borderRadius: '50px',
    width: '100%',
  };

  const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-inputMarginDense': {
      cursor: 'not-allowed',
    },
  });
  return (
    <Fragment>
      <div className="input">
        <label className="input-label">{title}</label>
        {readOnly ? (
          <CssTextField
            className="readOnly"
            style={inputStyle}
            variant="outlined"
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            size="small"
            placeholder={placeholder}
            required={requerid}
            multiline={multiline}
            minRows={rows}
            maxRows={maxRows}
            InputProps={{
              readOnly: readOnly,
            }}
            disabled={readOnly}
          />
        ) : (
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
            multiline={multiline}
            minRows={rows}
            maxRows={maxRows}
            disabled={readOnly}
          />
        )}
        {description && (
          <small className="input-description">{description}</small>
        )}
      </div>
    </Fragment>
  );
};
