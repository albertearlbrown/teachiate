import React, { useState } from 'react'

export const AuthStoreContext = React.createContext();

const AuthStore = ({children}) => {

    const [isAuthenicate, setIsAuthenicate] = useState(false);
    const [userData, setUserData] = useState(null);
    const [newGroup, setNewGroup] = useState({"avatar":'https://teachate-uploads.s3.amazonaws.com/cb700e8b-c436-4ec4-87b7-187810a48710.png',"cover":'https://teachate-uploads.s3.amazonaws.com/cb700e8b-c436-4ec4-87b7-187810a48710.png',"_id":"5fad8cbc50e59c6df7bfa586","members":[{"isAdmin":true,"_id":"5fad8cbc50e59c6df7bfa587","memberId":"5fa6ec0c04527eb6dc5e6487"}],"creationDate":"2020-11-12T19:27:56.077Z","updateDate":"2020-11-12T19:27:56.077Z","groupName":"New Group","location":"location","description":"description","privacy":"PUBLIC","creatorId":"5fa6ec0c04527eb6dc5e6487","__v":0})

    return (
        <AuthStoreContext.Provider value={{isAuthenicate, setIsAuthenicate, userData, setUserData, newGroup, setNewGroup}}>
            {children}
        </AuthStoreContext.Provider>
    )
};

export default AuthStore;
