import { Fragment } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Material from '@mui/material';
import { styled } from '@mui/system';
import { purple } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';

export const Button = ({
  text,
  color,
  onClick,
  icon,
  width,
  type,
  onSubmit,
  loading,
  size,
  to,
  activeClass,
  active,
  variant,
  disabled,
  action,
  label,
  children,
}) => {
  const btnStyle = {
    margin: '8px 0px',
    borderRadius: '50px',
    width: `${width}`,
  };
  const btnInfo = {
    margin: '8px 0px',
    width: `${width}`,
    '&:hover': {
      boxShadow: 'none',
      color: '#0a4769',
      backgroundColor: 'white',
    },
  };

  const btnMenu = {
    padding: '5px 15px',
    position: 'relative',
  };

  const ColorButton = styled(Material.Button)(() => ({
    backgroundColor: '#0a4769',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      color: '#0a4769',
      backgroundColor: 'white',
    },
  }));

  const IconButton = styled(Material.Button)(() => ({
    backgroundColor: 'white',
    color: '#0a4769',
    '&:hover': {
      color: 'white',
      backgroundColor: '#13293d',
    },
  }));

  const ButtonSquare = styled(Material.Button)(() => ({
    backgroundColor: '#13293d',
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      color: '#0a4769',
      backgroundColor: 'white',
    },
  }));

  const WhatButtons = () => {
    switch (type) {
      case 'normal': {
        return (
          <Material.Button
            variant="contained"
            color={color}
            style={btnStyle}
            onClick={onClick}
            startIcon={icon}
            type={type}
            onSubmit={onSubmit}
          >
            {text}
          </Material.Button>
        );
      }
      case 'settings': {
        return (
          <Material.IconButton
            aria-label={label}
            onClick={onClick}
            className={active ? 'button-settings' : ''}
          >
            {children}
          </Material.IconButton>
        );
      }
      case 'info': {
        return (
          <Material.Button
            variant={variant || 'contained'}
            color={color}
            style={btnInfo}
            onClick={onClick}
            type={type}
            onSubmit={onSubmit}
          >
            {text}
          </Material.Button>
        );
      }
      case 'submit': {
        return (
          <LoadingButton
            color={color}
            style={btnStyle}
            onClick={onClick}
            loading={loading}
            endIcon={icon}
            loadingPosition="end"
            variant="contained"
            type={type}
          >
            Registrar
          </LoadingButton>
        );
      }
      case 'submit-form': {
        return (
          <LoadingButton
            color={color}
            onClick={onClick}
            loading={loading}
            variant={variant}
            type={type}
            size={size}
            style={{ marginRight: '10px' }}
            onSubmit={onSubmit}
            disabled={disabled}
          >
            {text}
          </LoadingButton>
        );
      }
      case 'submit-form-normal': {
        return (
          <Material.Button
            variant={variant}
            color={color}
            onClick={onClick}
            startIcon={icon}
            type={action}
            size={size}
            disabled={disabled}
          >
            {text}
          </Material.Button>
        );
      }
      case 'menu': {
        return (
          <ColorButton
            style={btnMenu}
            variant="contained"
            startIcon={icon}
            size={size}
            className={active && 'button-active'}
            onClick={onClick}
          >
            {text}
          </ColorButton>
        );
      }
      case 'icon-button': {
        return (
          <IconButton
            style={btnMenu}
            variant={variant}
            startIcon={icon}
            size={size}
            className={active && 'button-active'}
            onClick={onClick}
          >
            {text}
          </IconButton>
        );
      }
      case 'nav-home': {
        return (
          <NavLink exact to={to} activeClassName={activeClass} role="button">
            <ButtonSquare
              style={btnMenu}
              variant="contained"
              startIcon={icon}
              size={size}
            >
              {text}
            </ButtonSquare>
          </NavLink>
        );
      }
      default:
        return null;
    }
  };
  return (
    <Fragment>
      <WhatButtons />
    </Fragment>
  );
};
