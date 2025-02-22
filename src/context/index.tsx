"use client"

import { contextTypes, scoreTypes } from "@/types";
import { createContext, useEffect, useState } from "react"

const initialState: contextTypes = {
    showMenu: false,
    setShowMenu: () => false,
    score: [],
    setScore: () => []
}

export const shareStates = createContext<contextTypes>(initialState);

export default function ShareProvider({ children }: { children: React.ReactNode }) {
    const [showMenu, setShowMenu] = useState(false);
    const [score, setScore] = useState<scoreTypes[]>([])

    useEffect(() => {
        const storedScore = localStorage?.getItem("score");
        setScore(storedScore ? JSON.parse(storedScore) : []);
    }, [])

    return <>
        <shareStates.Provider value={{ showMenu, setShowMenu, score, setScore }}>
            {children}
        </shareStates.Provider>
    </>
}
