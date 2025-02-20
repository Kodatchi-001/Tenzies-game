"use client"

import { contextTypes } from "@/types";
import { createContext, useContext, useState } from "react"

const initialState = {
    showMenu: false,
    setShowMenu: () => false
}

export const shareStates = createContext<contextTypes>(initialState);

export default function ShareProvider({ children }: { children: React.ReactNode }) {
    const [showMenu, setShowMenu] = useState(false);


    return <>
        <shareStates.Provider value={{ showMenu, setShowMenu }}>
            {children}
        </shareStates.Provider>
    </>
}

// export const usesharestate = () => useContext(shareStates)