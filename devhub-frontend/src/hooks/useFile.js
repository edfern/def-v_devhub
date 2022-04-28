import { useEffect, useState } from 'react';
import { apiAllUsers } from '../services/apiRepository';
export const useAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiAllUsers()
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return {
    users,
  };
};
