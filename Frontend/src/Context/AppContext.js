import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider ({children}){
    
    const [contactOn ,setContactOn] = useState(false)

    

    const value = {
        contactOn ,
        setContactOn
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


