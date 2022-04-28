import React, { Fragment } from 'react';
import { Container } from '@material-ui/core';
import { getUrlGithub, getUrlGoogle } from '../../Auth/Service';
import GitHubIcon from '@material-ui/icons/GitHub';

import { FaGoogle } from 'react-icons/fa';

import { ButtonM } from '../../components/button';

export const LayoutStartLogin = (props) => {
  return (
    <Fragment>
      <div className="layout-start"></div>
    </Fragment>
  );
};
