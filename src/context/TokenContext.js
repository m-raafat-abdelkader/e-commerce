import { createContext, useState } from "react";

export let UserToken=createContext(); 
export default function UserTokenProvider(myProps){
    const [userToken,setToken] = useState(null); 

    return <UserToken.Provider value={{userToken,setToken}}>
        {myProps.children}
    </UserToken.Provider>
}