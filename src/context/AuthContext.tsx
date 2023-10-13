"use client"
import { SessionProvider } from "next-auth/react";

const AuthContext = ({children}:AuthContextProps) => {
    return <SessionProvider>{children}</SessionProvider>
}
export default AuthContext;