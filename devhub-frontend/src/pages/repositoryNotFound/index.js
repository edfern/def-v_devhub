import { useParams } from 'react-router-dom';
import { Main } from '../../components/main/main';

const NotFound = () => {
  const { nameRepository } = useParams();
  return (
    <Main limit="limit">Repositorio: {nameRepository} no encontrado.</Main>
  );
};

export default NotFound;
