import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

export const ItemsCheckBox = [
  {
    name: 'Privado',
    icon: <LockIcon />,
    private: true,
    description:
      'El acceso al proyecto debe otorgarse explícitamente a cada usuario. Si este proyecto es parte de un grupo, se otorgará acceso a los miembros del grupo.',
  },
  {
    name: 'Publico',
    icon: <PublicIcon />,
    private: false,
    description: 'Se puede acceder al proyecto sin ninguna autenticación.',
  },
];
