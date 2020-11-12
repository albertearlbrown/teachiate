import React, { useState } from 'react'

export const AuthStoreContext = React.createContext();

const AuthStore = ({children}) => {

    const [isAuthenicate, setIsAuthenicate] = useState(false);
    const [userData, setUserData] = useState(null);
    const [newGroup, setNewGroup] = useState({members:[]})

    return (
        <AuthStoreContext.Provider value={{isAuthenicate, setIsAuthenicate, userData, setUserData, newGroup, setNewGroup}}>
            {children}
        </AuthStoreContext.Provider>
    )
};

export default AuthStore;
