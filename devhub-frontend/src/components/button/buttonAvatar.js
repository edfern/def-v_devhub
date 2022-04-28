import React, { Fragment } from 'react';

import * as Material from '@mui/material';

import { AvatarUser } from '../avatar/index';
import { styled } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B98E0',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
const btnMenu = {
  margin: 'none',
};
const IconButtonCustom = styled(Material.Button)(() => ({
  backgroundColor: '#0a4769',
  boxShadow: 'none',
  padding: '2px 5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& span ': {
    margin: '8px',
  },

  '&:hover': {
    color: '#0a4769',
    backgroundColor: 'white',
  },
}));

export const ButtonAvatar = ({ active, onClick }) => {
  return (
    <Fragment>
      <IconButtonCustom
        style={btnMenu}
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        size="small"
        className={active ? 'button-active' : ''}
        onClick={onClick}
      >
        <AvatarUser type="header-profile" />
      </IconButtonCustom>
    </Fragment>
  );
};
