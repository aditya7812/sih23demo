import { createContext, useContext } from "react";
import { useState } from "react";
const RoleContext = createContext(undefined)

export const RoleProvider = ({children}) => {
    const [role, setRole] = useState("user")

    return (
        <RoleContext.Provider
            value={{
                role,
                changeRole: (newrole) => setRole(newrole), 
            }}
        >
            {children}
        </RoleContext.Provider>
    )
}
export const useRole = () => useContext(RoleContext)