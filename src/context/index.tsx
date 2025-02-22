"use client"

import { contextTypes, scoreTypes } from "@/types";
import { createContext, useEffect, useState } from "react"

const initialState: contextTypes = {
    showMenu: false,
    setShowMenu: () => false,
    score: [],
    setScore: () => [],
    showInformation: false,
    setShowInformation: () => false
}

export const shareStates = createContext<contextTypes>(initialState);

export default function ShareProvider({ children }: { children: React.ReactNode }) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [score, setScore] = useState<scoreTypes[]>([])
    const [showInformation, setShowInformation] = useState<boolean>(false);

    useEffect(() => {
        const storedScore = localStorage?.getItem("score");
        setScore(storedScore ? JSON.parse(storedScore) : []);
    }, [])

    return <>
        <shareStates.Provider value={{ showMenu, setShowMenu, score, setScore, showInformation, setShowInformation }}>
            {children}
        </shareStates.Provider>
    </>
}
