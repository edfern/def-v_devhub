import axios from 'axios';
import { BACKEND_API } from '../../consts/backend';

const API = `${BACKEND_API}/auth`;
const APIUSER = `${BACKEND_API}/user`;

export const getUrlGithub = async ({ setLoading }) => {
  try {
    setLoading(true);
    const url = await axios.get(`${API}/github`);
    window.location = url.data;
  } catch (ex) {
    setLoading(false);
    console.error(ex);
  }
};

export const getAccessTokenGitHub = async ({ code }) => {
  const resp = await axios.get(`${API}/github/callback`, {
    params: {
      code: code,
    },
  });
  return resp.data;
};

export const getUrlGoogle = async ({ setLoading }) => {
  try {
    setLoading(true);
    const url = await axios.get(`${API}/google`);
    window.location = url.data;
  } catch (ex) {
    setLoading(false);
    console.error(ex);
  }
};

export const getAccessTokenGoogle = async ({ code }) => {
  const data = await axios
    .get(`${API}/google/callback`, {
      params: {
        code: code,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const getInfo = async ({ token, oAuth20 }) => {
  const userInfo = await axios
    .get(`${APIUSER}/info`, {
      params: {
        oAuth20: oAuth20,
        token: token,
      },
    })
    .then((resp) => {
      return resp.data;
    });

  return userInfo;
};
