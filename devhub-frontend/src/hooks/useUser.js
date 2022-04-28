import { useCallback } from 'react';
import { newUser } from '../services';

const UseUser = () => {
  const newCreateUser = useCallback(
    async ({ userInfo, setLoading, setAuthInfo, avatar }) => {
      setLoading(true);
      await newUser({ userInfo })
        .then((data) => {
          if (data.registered) {
            var authInfo = {
              ...data.data,
              isAuthenticated: true,
              avatar: avatar,
            };
            localStorage.setItem('userInfo', JSON.stringify(authInfo));
            setAuthInfo(authInfo);
            localStorage.setItem('avatar', avatar);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    },
    []
  );

  return {
    newCreateUser,
  };
};

export default UseUser;
