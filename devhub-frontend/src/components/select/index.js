import { Fragment, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect } from '@mui/material';

const Select = ({ title, onChange }) => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    onChange(event);
  };

  const inputStyle = {
    margin: '10px 0px 0px 0px',
    width: '100%',
  };

  return (
    <Fragment>
      <div className="input">
        <label className="input-label"> {title}</label>
        <FormControl fullWidth style={inputStyle}>
          <InputLabel id="demo-simple-select-label">Roles</InputLabel>
          <MuiSelect
            style={inputStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Roles"
            onChange={handleChange}
            size="small"
          >
            <MenuItem disabled value="">
              <em>Role</em>
            </MenuItem>
            <MenuItem value={2}>Colaborador</MenuItem>
          </MuiSelect>
        </FormControl>
      </div>
    </Fragment>
  );
};

export default Select;
