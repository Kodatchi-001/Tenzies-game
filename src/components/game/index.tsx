"use client"

import Die from "../die";
import Hero from "../hero";
import { v4 as uuidv4 } from "uuid";
import { diceTypes } from "@/types";
import { useEffect, useState } from "react";
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'
import Score from "../score";
import Navbar from "../nav";
// import { usesharestate } from "@/context";


export default function Game() {
    // const {showMenu , setShowMenu} = usesharestate()
    // console.log(showMenu)
    /*---> States <---*/
    const [dice, setDice] = useState<diceTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const gameWon: boolean = dice?.every((die) => die?.isHeld) && dice?.every((die) => die?.value === dice[0]?.value);
    const { width, height } = useWindowSize()
    const [isClient, setIsClient] = useState<boolean>(false);

    /*---> Functions <---*/
    const generateAllDies = (): diceTypes[] => {
        return new Array(10).fill(0).map((e , i) => ({ id: uuidv4(), value: Math?.ceil(Math?.random() * 6), isHeld: false }));
    }
    const roleDice = (): void => {
        if (gameWon) {
            setDice(generateAllDies)
        } else {
            setDice((prevState) => prevState?.map((die) => (
                die?.isHeld ? die : { ...die, value: Math?.ceil(Math?.random() * 6) }
            )))
        }
    }
    const hold = (id: string): void => {
        setDice((prevState) => prevState?.map((die) => die?.id === id ? { ...die, isHeld: !die?.isHeld } : die));
    }
    useEffect(() => {
        setDice(generateAllDies());
        setLoading(false);
        setIsClient(true)
    }, []);

    return <>
        <Navbar />
        <section className="w-full h-screen flex relative overflow-hidden">
            <div className="w-full h-full flex flex-col gap-10 items-center pt-28">
                {isClient && gameWon && <Confetti width={width} height={height} />}
                <div className="flex flex-col items-center gap-7">
                    <Hero title="Tenzies" paragraphe="Roll until all dice are the same. Click each die to freeze it at its current value between rolls." />
                    <div className="grid grid-rows-2 grid-cols-5 gap-5">
                        {loading ? (
                            Array(10)?.fill(0).map((item, index) => (
                                <Die key={index} value={item?.value} isHeld={item?.isHeld} animation={true} />
                            ))
                        ) : (
                            dice && dice?.map((item) => (
                                <Die key={item?.id} value={item?.value} isHeld={item?.isHeld} hold={() => hold(item?.id)} />
                            ))
                        )}
                    </div>
                </div>
                <button className="px-[18px] py-[8px] rounded-md bg-[#5035FF] text-white text-[1rem] font-bold whitespace-nowrap"
                    onClick={roleDice}>
                    {gameWon ? "New Game" : "Roll Dice"}
                </button>
            </div>
            <Score />
        </section>
    </>
}