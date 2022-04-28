import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import HomeIcon from '@mui/icons-material/Home';

export const ItemsSubMenuHeader = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    path: '',
  },
  {
    name: 'Mis repositorioes',
    icon: <FolderOpenIcon />,
    path: '/repositories',
  },
  {
    name: 'Grupos',
    icon: <GroupsIcon />,
    path: '/groups',
  },
  {
    name: 'Actividad',
    icon: <AccessTimeIcon />,
    path: '/activity',
  },
  {
    name: 'Overview',
    icon: <ViewAgendaIcon />,
    path: '',
  },
];
