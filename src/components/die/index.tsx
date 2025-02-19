export default function Die(props: { value: number, isHeld: boolean, animation?: boolean }) {
    const { value, isHeld, animation } = props

    return <>
        <button className={`h-[50px] w-[50px] shadow-md rounded-[10px] border-none ${animation ? "animate-bounce" : ""} ${isHeld ? "bg-[#59E391]" : "bg-white"} text-[1.75rem] font-bold`}>
            {value}
        </button>
    </>
}