'use client';

import { createContext, ReactNode } from "react";
import {  useSession } from "next-auth/react";

interface UserType {
  // Define properties of user, e.g.
  isVerified: boolean;
  resetRequestCount: number;
  username:string;
  name?: string;
  email?: string;
  image:string,
}

interface AppContextType {
  user: UserType | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: { children: ReactNode }) {

  const { data: session } = useSession();

  const user = (session?.user as UserType) || null;

    const value: AppContextType = {

        user,
    };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
