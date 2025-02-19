"use client"

import Die from "../die";
import Hero from "../hero";
import { v4 as uuidv4 } from "uuid";
import { diesTypes } from "@/types";
import { useEffect, useState } from "react";

export default function Game() {
    /*---> States <---*/
    const [dice, setDice] = useState<diesTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /*---> Functions <---*/
    const generateAllDies = (): diesTypes[] => {
        return new Array(10).fill(0).map(() => ({ id: uuidv4(), value: Math?.ceil(Math?.random() * 6), isHeld: false }));
    }
    const roleDice = (): void => {
        setDice((prevState) => prevState?.map((die) => (
            die?.isHeld ? die : { ...die, value: Math?.ceil(Math?.random() * 6) }
        )))
    }
    const hold = (id: string): void => {
        setDice((prevState) => prevState?.map((die) => die?.id === id ? { ...die, isHeld: !die?.isHeld } : die));
    }
    useEffect((): void => {
        setDice(generateAllDies());
        setLoading(false);
    }, []);

    console.log(dice)
    return <>
        <section className="w-full h-screen flex flex-col gap-10 items-center pt-28">
            <div className="flex flex-col items-center gap-7">
                <Hero />
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
            <button className="px-[18px] py-[9px] rounded-md bg-[#5035FF] text-white text-[1rem] font-bold whitespace-nowrap"
                onClick={roleDice}>
                Roll Dice
            </button>
        </section>
    </>
}