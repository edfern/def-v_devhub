import { useEffect, useState } from 'react';
import {
  apiSearchFindPublic,
  apiSearchRepositoryShared,
  searchById,
  searchByName,
} from '../services/apiRepository';

export const useAllRepositories = ({ id, setLoading }) => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    setLoading(true);
    searchById({ id })
      .then((resp) => {
        setLoading(false);
        setRepositories(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setLoading]);

  return {
    repositories,
  };
};

export const useRepositoryByName = ({
  id,
  name,
  setSuccess,
  setError,
  setLoading,
  refresh,
}) => {
  const [repository, setRepository] = useState({});
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await searchByName({ id, nameRepository: name })
        .then((resp) => {
          setSuccess(true);
          setLoading(false);
          setRepository(resp.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
    fetchData();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    repository,
  };
};

export const useRepositoryFindByName = ({ name }) => {
  const [repositories, setRepositories] = useState({});
  useEffect(() => {
    async function fetchData() {
      await apiSearchFindPublic({ name })
        .then((resp) => {
          setRepositories(resp.data);
        })
        .catch((err) => {});
    }
    fetchData();
  }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    repositories,
  };
};

export const useAllRepositoriesShared = ({ id, setLoading }) => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiSearchRepositoryShared({ id })
      .then((resp) => {
        setRepositories(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setLoading]);

  return {
    repositories,
  };
};
