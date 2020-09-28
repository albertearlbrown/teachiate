import React, { useState } from 'react'

export const AuthStoreContext = React.createContext();

const AuthStore = ({children}) => {

    const [isAuthenicate, setIsAuthenicate] = useState(false);
    const [userData, setUserData] = useState(null);

    return (
        <AuthStoreContext.Provider value={{isAuthenicate, setIsAuthenicate, userData, setUserData}}>
            {children}
        </AuthStoreContext.Provider>
    )
};

export default AuthStore;