"use client"

import Die from "../die";
import Hero from "../hero";
import { v4 as uuidv4 } from "uuid";
import { diesTypes } from "@/types";

export default function Game() {
    const dies: diesTypes[] = [
        { id: uuidv4(), value: 0, isHeld: false },
        { id: uuidv4(), value: 1, isHeld: false },
        { id: uuidv4(), value: 2, isHeld: false },
        { id: uuidv4(), value: 3, isHeld: false },
        { id: uuidv4(), value: 4, isHeld: false },
        { id: uuidv4(), value: 5, isHeld: false },
        { id: uuidv4(), value: 6, isHeld: false },
        { id: uuidv4(), value: 7, isHeld: false },
        { id: uuidv4(), value: 8, isHeld: false },
        { id: uuidv4(), value: 9, isHeld: false },
    ]

    return <>
        <section className="w-full h-screen flex flex-col gap-10 items-center pt-28">
            <div className="flex flex-col items-center gap-7">
                <Hero />
                <div className="grid grid-rows-2 grid-cols-5 gap-5">
                    {dies.map((item) => (
                        <Die key={item?.id} value={item?.value} isHeld={item?.isHeld} />
                    ))}
                </div>
            </div>
            <button className="px-[18px] py-[9px] rounded-md bg-[#5035FF] text-white text-[1rem] font-bold whitespace-nowrap">
                Roll Dice
            </button>
        </section>
    </>
}