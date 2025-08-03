'use client';

import { createContext, ReactNode, useState } from "react";

interface UserType {
  // Define properties of user, e.g.
  isVerified: boolean;
  name?: string;
  email?: string;
  image:string,
}

interface AppContextType {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
//   projectData: any[]; // or more specific type
//   setProjectData: React.Dispatch<React.SetStateAction<any[]>>;
  checkLoggedInUser: () => Promise<void>;

}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
//   const [projectData, setProjectData] = useState<any[]>([]);
    

      async function checkLoggedInUser() {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/me`, {
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
          console.log(err)
          setUser(null);
        }
       
    }
    //  async function projectDataFetch() {
    //     try{
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data`, {
    //         method: "GET",
    //     });
    
    //     const data = await response.json();
    //     // console.log(data)
    //     if (response.ok) {
    //             setProjectData(data.projects);
    //             console.log("data",data.projects)
    //         } 
    //     } catch(err){

    //         setUser(null);
    //     }
       
    // }

    const value: AppContextType = {

        menuOpen,
        setMenuOpen,
        user,
        setUser,
        // projectData,
        // setProjectData,
        checkLoggedInUser,
        // projectDataFetch,
    };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}