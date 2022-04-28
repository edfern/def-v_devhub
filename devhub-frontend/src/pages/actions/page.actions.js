export const LOADING = 'PAGE_LOADING';
export const SUCCESS_DELETE = 'SUCCES_DELETE';
export const RESET_INFO_DELETE = 'RESET_INFO_DELETE';

export const setLoading = (loading) => {
  return {
    type: LOADING,
    payload: loading,
  };
};

export const setInfoDelete = (infoDelete) => {
  return {
    type: SUCCESS_DELETE,
    payload: infoDelete,
  };
};

export const resetInfoDelete = () => {
  return {
    type: RESET_INFO_DELETE,
  };
};
