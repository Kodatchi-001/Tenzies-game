export interface diceTypes {
    id: string
    value: number
    isHeld: boolean
}
export type gameLevelTypes = 'normal' | 'hard' | 'extreme'
export interface scoreTypes {
    level: string
    time: { minutes: number, seconds: number }
}
export interface contextTypes {
    showMenu: boolean
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
    score: scoreTypes[]
    setScore: React.Dispatch<React.SetStateAction<scoreTypes[]>>
    showInformation: boolean
    setShowInformation: React.Dispatch<React.SetStateAction<boolean>>
}