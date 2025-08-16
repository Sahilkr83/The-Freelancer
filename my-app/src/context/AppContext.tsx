'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import {  useSession } from "next-auth/react";

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

}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: { children: ReactNode }) {

  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser((session?.user as UserType) || null);
    // console.log("User in context:", session?.user);
  }, [session]);

//   const [projectData, setProjectData] = useState<any[]>([]);
    
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
        // projectDataFetch,
    };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}