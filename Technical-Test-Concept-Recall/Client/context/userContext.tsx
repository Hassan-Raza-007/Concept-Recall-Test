import axios from 'axios'
import * as React from 'react';
import { createContext, useState, useEffect } from 'react'


export const userContext = createContext<any>(null)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data)
            })
        }
    }, [])

    const contextValue = { user, setUser }
    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    )
}