import React, { useCallback, useEffect, useState } from 'react';
import { MainLogin } from '../../components/main/main';
import queryString from 'query-string';

import { getUrlGithub, getUrlGoogle } from '../Service';

import { Grid } from '@mui/material';
import { Logo } from '../../components/logo';
import { Card } from '../../components/card';
import FormRegister from '../../components/form/form-login';
import { Button } from '../../components/button/index';
import GitHubIcon from '@mui/icons-material/GitHub';

import { FaGoogle } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { MetroSpinner } from 'react-spinners-kit';
import { setLoading } from '../../pages/actions/page.actions';
import { setAuthInfo, setAvatar, setRegistered } from '../actions/auth.actions';
import { connect } from 'react-redux';

import UseAuth from '../../hooks/useAuth';
import UserUser from '../../hooks/useUser';
import { setNewUser, setUsername } from '../../pages/actions/user.actions';

const Login = ({
  registered,
  setRegistered,
  loading,
  setLoading,
  setAuthInfo,
  setNewUser,
  userInfo,
  setAvatar,
  avatar,
}) => {
  const [type] = useState(localStorage.getItem('type'));
  const [unregisterd, setUnregisterd] = useState(false);
  const [start, setStart] = useState(true);

  const { logInGithub, logInGoogle } = UseAuth();
  const { newCreateUser } = UserUser();

  const sigIn = useCallback(({ code }) => {
    switch (type) {
      case 'github': {
        return logInGithub({
          code,
          setLoading,
          setRegistered,
          setAuthInfo,
          setNewUser,
          setAvatar,
          avatar,
        });
      }
      case 'google': {
        return logInGoogle({
          code,
          setLoading,
          setRegistered,
          setAuthInfo,
          setNewUser,
          setAvatar,
          avatar,
        });
      }
      default:
        return null;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (params.code) {
      sigIn({ code: params.code });
    } else {
      console.error('code not present');
    }
  }, [sigIn]);

  useEffect(() => {
    if (registered !== null) {
      if (!registered) {
        setUnregisterd(true);
        setStart(false);
      } else {
      }
    }
  }, [unregisterd, start, registered]);

  const handleSubmit = () => {
    newCreateUser({ userInfo, setLoading, setAuthInfo, avatar });
  };

  return (
    <MainLogin>
      <div className="layout-start">
        <Card
          position="relative"
          zIndex="1"
          boxShadow="10%"
          width="360px"
          borderRadius="20px"
          pd="30px 0"
          background="rgb(255 255 255 / 93%)"
          maxWidth="90%"
        >
          <Grid>
            <Logo />
            <small className="description">
              <strong>DevHub</strong> es un repositorio sin límite de
              almacenamiento.
            </small>
          </Grid>
          <div className="main-login-body">
            <CSSTransition
              in={start}
              classNames="animation"
              timeout={500}
              onEntered={() => setUnregisterd(false)}
              onExited={() => setUnregisterd(true)}
              unmountOnExit
            >
              <div className="input-group">
                <Button
                  text="Iniciar sesión con Github"
                  color="primary"
                  type="normal"
                  onClick={() => {
                    getUrlGithub({ setLoading });
                    localStorage.setItem('type', 'github');
                  }}
                  icon={<GitHubIcon />}
                  width="100%"
                />
                <Button
                  type="normal"
                  text="Iniciar sesión con Google"
                  color="primary"
                  icon={<FaGoogle />}
                  onClick={() => {
                    getUrlGoogle({ setLoading });
                    localStorage.setItem('type', 'google');
                  }}
                  width="100%"
                />
                {loading && (
                  <div className="loading">
                    <MetroSpinner color="#1B98E0" />
                  </div>
                )}
              </div>
            </CSSTransition>

            <CSSTransition
              in={unregisterd}
              classNames="animation"
              timeout={500}
              unmountOnExit
              onEntered={() => setStart(false)}
              onExited={() => setStart(true)}
            >
              <FormRegister
                type={type}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </CSSTransition>
          </div>
          <div className="main-login-footer">
            Este software fue creado para la Universidad Mariano Gálvez de
            Guatemala, con el fin de poner en práctica los conocimientos de
            programación y administración para la creación de dicho proyecto.
          </div>
        </Card>
      </div>
    </MainLogin>
  );
};

const mapStateToProps = (state) => ({
  loading: state.PageReducer.loading,
  registered: state.AuthReducer.registered,
  userInfo: state.UserReducer,
  avatar: state.AuthReducer.userInfo.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading)),
  setRegistered: (registered) => dispatch(setRegistered(registered)),
  setAuthInfo: (authInfo) => dispatch(setAuthInfo(authInfo)),
  setUsername: (username) => dispatch(setUsername(username)),
  setNewUser: (userInfo) => dispatch(setNewUser(userInfo)),
  setAvatar: (avatar) => dispatch(setAvatar(avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
