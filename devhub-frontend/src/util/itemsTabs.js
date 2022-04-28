import { StarredRepositories } from '../pages/dashboard/starredRepositories';
import { YourRepositories } from '../pages/dashboard/yourRepositories';

export const tabsHomePage = {
  header: [
    'Tus repositorios',
    'Repositorios descatacados',
    'Explorar repositorios',
  ],
  content: [<YourRepositories />, <StarredRepositories />],
};
