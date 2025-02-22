import { MouseEventHandler } from 'react';

export default function Die(props: { value: number, isHeld: boolean, animation?: boolean, hold?: MouseEventHandler<HTMLButtonElement> }) {
    /*---> Props <---*/
    const { value, isHeld, animation, hold } = props

    return <>
        <button className={`h-[50px] w-[50px] shadow-md rounded-[10px] border-none ${animation ? "animate-" : ""} ${isHeld ? "bg-[#59E391]" : "bg-white"} text-[1.75rem] font-bold`}
            onClick={hold}>
            {value}
        </button>
    </>
}