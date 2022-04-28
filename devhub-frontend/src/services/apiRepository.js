import axios from 'axios';
import { BACKEND_API } from '../consts/backend';

export const newRepository = async (infoRepo) => {
  const { id } = infoRepo;

  const data = await axios.post(`${BACKEND_API}/repo/create/${id}`, infoRepo);
  return data.data;
};

export const apiSearchRepositoryShared = async ({ id }) => {
  const data = await axios.get(`${BACKEND_API}/repo/collaborators/${id}`);
  return data.data;
};

export const searchById = async ({ id }) => {
  const data = await axios.get(`${BACKEND_API}/repo/search/${id}`);
  return data.data;
};

export const searchByName = async ({ id, nameRepository }) => {
  const data = await axios.get(
    `${BACKEND_API}/repo/search/${id}/${nameRepository}`
  );
  return data.data;
};

export const apiSearchFindPublic = async ({ name }) => {
  const data = await axios.get(`${BACKEND_API}/repo/find/${name}`);
  return data.data;
};

export const apiSearchUserByIdRepo = async ({ idRepo }) => {
  const data = await axios.get(`${BACKEND_API}/user/find/${idRepo}/1`);
  return data.data;
};

export const updateRepository = async ({ repository }) => {
  const data = await axios.put(
    `${BACKEND_API}/repo/update/${repository.id}`,
    repository
  );
  return data.data;
};

export const apiDeleteRepository = async ({ id }) => {
  const data = await axios.delete(`${BACKEND_API}/repo/delete/${id}`);
  return data.data;
};

export const apiAllUsers = async () => {
  const data = await axios.get(`${BACKEND_API}/user/getAll`);
  return data.data;
};

export const apiAddMembers = async ({ info }) => {
  const data = await axios.post(`${BACKEND_API}/repo/add/collaborator`, info);
  return data.data;
};

export const apiGetMembers = async ({ idRepo }) => {
  const data = await axios.get(`${BACKEND_API}/user/collabsFromRepo/${idRepo}`);
  return data.data;
};
