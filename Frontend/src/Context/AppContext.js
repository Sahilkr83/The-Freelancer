import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider ({children}){
    
    const [contactOn ,setContactOn] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [user,setUser] = useState(null)
    const [projectData,setProjectData] = useState([])
    

      async function checkLoggedInUser() {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/me`, {
            method: "GET",
            credentials: "include", // Very important to include cookies
        });
    
        const data = await response.json();
        console.log(data)
       if (response.ok && data.user?.isVerified) {
            setUser(data.user);
            console.log(user)
            console.log("User is logged in:");
        }  else {
            setUser(null)
            console.log("Not logged in:", data.message);
        }
        } catch(err){

            setUser(null);
        }
       
    }
     async function projectDataFetch() {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data`, {
            method: "GET",
        });
    
        const data = await response.json();
        // console.log(data)
        if (response.ok) {
                setProjectData(data.projects);
                console.log("data",data.projects)
            } 
        } catch(err){

            setUser(null);
        }
       
    }

    const value = {
        contactOn ,
        setContactOn,
        checkLoggedInUser,
        user,
        setUser,
        menuOpen,
        setMenuOpen,
        projectDataFetch,
        projectData,
        setProjectData
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}