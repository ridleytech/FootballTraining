export const addCompletedItem = (item: any) => {
  return {
    type: 'COMPLETED_ITEM',
    completedItem: item,
  };
};

export const selectPhase = (item: any) => {
  return {
    type: 'PHASE_SELECTED',
    selectedPhase: item,
  };
};

export const selectMax = (item: any) => {
  return {
    type: 'MAX_SELECTED',
    selectedMax: item,
  };
};

export const authUser = (user: any) => {
  return {
    type: 'AUTH_USER',
    user: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const clearField = (txt: string) => {
  return {
    type: 'CLEAR_FIELD',
    txt: txt,
  };
};
