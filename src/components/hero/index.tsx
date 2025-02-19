export default function Hero() {
    return <>
        <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-[50px] font-[700]">Tenzies</h1>
            <p className="w-72 lg:w-[65%]">
                Roll until all dice are the same. Click each die to
                freeze it at its current value between rolls.
            </p>
        </div>
    </>
}