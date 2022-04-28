import { useCallback } from 'react';
import {
  getAccessTokenGitHub,
  getAccessTokenGoogle,
  getInfo,
} from '../Auth/Service';

function UseAuth() {
  const logInGithub = useCallback(
    async ({
      code,
      setLoading,
      setRegistered,
      setNewUser,
      setAuthInfo,
      setAvatar,
    }) => {
      setLoading(true);
      await getAccessTokenGitHub({ code })
        .then((token) => getInfo({ token, oAuth20: 'github' }))
        .then((info) => {
          setLoading(false);
          setRegistered(info.registered);
          if (info.registered) {
            var authInfo = {
              ...info.data,
              isAuthenticated: true,
              avatar: info.avatar,
            };
            localStorage.setItem('avatar', info.avatar);
            localStorage.setItem('userInfo', JSON.stringify(authInfo));
            setAuthInfo(authInfo);
          } else {
            const data = JSON.parse(info.data);
            var newUser = {
              name: data.name,
              email: data.email === null ? data.html_url : data.email,
            };
            setAvatar(data.avatar_url);
            setRegistered(info.registered);
            setNewUser(newUser);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    },
    []
  );

  const logInGoogle = useCallback(
    async ({
      code,
      setLoading,
      setRegistered,
      setAuthInfo,
      setNewUser,
      setAvatar,
    }) => {
      setLoading(true);
      await getAccessTokenGoogle({ code })
        .then((token) => getInfo({ token, oAuth20: 'google' }))
        .then((info) => {
          setLoading(false);
          if (info.registered) {
            var authInfo = {
              ...info.data,
              isAuthenticated: true,
              avatar: info.avatar,
            };
            localStorage.setItem('avatar', info.avatar);
            localStorage.setItem('userInfo', JSON.stringify(authInfo));
            setAuthInfo(authInfo);
          } else {
            const data = JSON.parse(info.data);
            var newUser = {
              name: data.name,
              email: data.email === null ? data.html_url : data.email,
            };
            setAvatar(data.picture);
            setRegistered(info.registered);
            setNewUser(newUser);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    },
    []
  );

  return {
    logInGithub,
    logInGoogle,
  };
}

export default UseAuth;
