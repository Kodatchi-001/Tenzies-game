"use client"

import Die from "../die";
import Hero from "../hero";
import { v4 as uuidv4 } from "uuid";
import { diceTypes } from "@/types";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'
import Score from "../score";
import Navbar from "../nav";

export default function Game() {
    /*---> States <---*/
    const [dice, setDice] = useState<diceTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const gameWon: boolean = dice?.every((die) => die?.isHeld) && dice?.every((die) => die?.value === dice[0]?.value);
    const { width, height } = useWindowSize()
    const [isClient, setIsClient] = useState<boolean>(false);
    const [timer, setTimer] = useState<string>('');
    const [timerRuns, setTimerRuns] = useState<boolean>(false);
    const [time, setTime] = useState<{ seconds: number, minutes: number }>({ seconds: 0, minutes: 0 });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    /*---> Functions <---*/
    const generateAllDies = (): diceTypes[] => {
        return new Array(10).fill(0).map(() => ({ id: uuidv4(), value: Math?.ceil(Math?.random() * 6), isHeld: false }));
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
        gameWon ? setTimerRuns(false) : setTimerRuns(true)
    }
    const gameTimer = (): void => {
        if (timerRuns) {
            if (intervalRef.current) { clearInterval(intervalRef.current) }
            intervalRef.current = setInterval(() => {
                setTime((prevState) => {
                    let newSeconds = prevState?.seconds < 59 ? prevState?.seconds + 1 : 0;
                    let newMinutes = prevState?.seconds < 59 ? prevState?.minutes : prevState.minutes + 1;
                    setTimer(`${newMinutes >= 10 ? "" : "0"}${newMinutes}:${newSeconds >= 10 ? "" : "0"}${newSeconds}`);
                    return { seconds: newSeconds, minutes: newMinutes };
                });
            }, 1000);
        }
        if (gameWon && intervalRef.current) { clearInterval(intervalRef.current) }
    }
    useEffect(() => {
        gameTimer();
    }, [timerRuns, gameWon])
    useEffect(() => {
        if (gameWon) {
            setTimerRuns(false);
        }
    }, [gameWon]);
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
                <h1 className="text-2xl font-bold">{timer}</h1>
            </div>
            <Score />
        </section>
    </>
}