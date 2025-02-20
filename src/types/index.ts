export interface diceTypes {
    id: string
    value: number
    isHeld: boolean
}
export interface contextTypes {
    showMenu: boolean
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}
