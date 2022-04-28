const getENV = () => {
  switch (process.env.REACT_APP_BACKEND_URL) {
    case 'production': {
      return 'API-SPRING-BOOT';
    }
    case 'productionmac': {
      return 'API-SPRING-BOOT';
    }
    case 'dev': {
      return 'localhost:8085';
    }
    default:
      return 'localhost:8085';
  }
};

export const BACKEND_API = getENV();
