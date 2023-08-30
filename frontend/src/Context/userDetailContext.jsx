import React, { createContext, useContext, useState } from 'react';

const UserDetailContext = createContext();

export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState({});

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetail() {
  return useContext(UserDetailContext);
}
