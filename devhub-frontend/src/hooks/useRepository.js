import { useCallback, useState } from 'react';
import {
  apiAddMembers,
  apiDeleteRepository,
  apiGetMembers,
  apiSearchFindPublic,
  apiSearchUserByIdRepo,
  newRepository,
  searchById,
  updateRepository,
} from '../services/apiRepository';

export const useRepository = () => {
  const [repo, setRepo] = useState({});
  const [user, setUser] = useState({});

  const newRepo = useCallback(
    async (infoRepo, setLoading, setError, setMessage) => {
      setLoading(true);
      setError(false);
      await newRepository(infoRepo)
        .then((resp) => {
          setRepo(resp.repositoriesEntity);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const allRepositoryById = useCallback(
    ({ id, setLoading, setError, setMessage }) => {
      setLoading(true);
      setError(false);
      searchById({ id })
        .then((resp) => {
          setRepo(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const allRepositoryByName = useCallback(
    ({ id, setLoading, setError, setMessage }) => {
      setLoading(true);
      setError(false);
      searchById({ id })
        .then((resp) => {
          setRepo(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const UpdateRepository = useCallback(
    ({ setLoading, setError, setMessage, repository, setSuccess }) => {
      setLoading(true);
      setError(false);
      updateRepository({ repository })
        .then((resp) => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          setSuccess(false);
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const deleteRepository = useCallback(
    ({ id, setLoading, setError, setMessage, setSuccess }) => {
      setLoading(true);
      setError(false);
      apiDeleteRepository({ id })
        .then((resp) => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          setSuccess(false);
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const searchByVisiblePublic = useCallback(
    ({ setMessage, setRepositories, name }) => {
      apiSearchFindPublic({ name })
        .then((resp) => {
          setRepositories(resp.data);
        })
        .catch((err) => {
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const getUserByIdRepository = useCallback(
    ({ setSuccess, setLoading, setError, setMessage, idRepo }) => {
      setError(false);
      setLoading(true);
      apiSearchUserByIdRepo({ idRepo })
        .then((resp) => {
          setUser(resp.data);
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const addUserMembers = useCallback(
    ({ info, setLoading, setError, setMessage, setSuccess, setReload }) => {
      setLoading(true);
      setError(false);
      apiAddMembers({ info })
        .then((resp) => {
          setSuccess(true);
          setLoading(false);
          setReload(true);
        })
        .catch((err) => {
          setSuccess(false);
          setError(true);
          setLoading(false);
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  const getMembers = useCallback(
    ({ id, setMembers, setMessage, setReload }) => {
      apiGetMembers({ idRepo: id })
        .then((resp) => {
          setMembers(resp.data);
          setReload(false);
        })
        .catch((err) => {
          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(
              'Revise su conexión a internet y vuelva a intentarlo por favor. '
            );
          }
        });
    },
    []
  );

  return {
    newRepo,
    repository: repo,
    user,
    allRepositoryById,
    allRepositoryByName,
    update: UpdateRepository,
    deleteRepository,
    searchByVisiblePublic,
    getUserByIdRepository,
    addUserMembers,
    getMembers,
  };
};
