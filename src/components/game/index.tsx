"use client"

import Die from "../die";
import Hero from "../hero";
import { v4 as uuidv4 } from "uuid";
import { diceTypes, gameLevelTypes } from "@/types";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'
import Score from "../score";
import Navbar from "../nav";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function Game() {
    /*---> States <---*/
    const [dice, setDice] = useState<diceTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const gameWon: boolean = dice?.every((die) => die?.isHeld) && dice?.every((die) => die?.value === dice[0]?.value);
    const { width, height } = useWindowSize()
    const [isClient, setIsClient] = useState<boolean>(false);
    const [timerRuns, setTimerRuns] = useState<boolean>(false);
    const [time, setTime] = useState<{ seconds: number, minutes: number }>({ seconds: 0, minutes: 0 });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [level, setLevel] = useState<gameLevelTypes>('normal')
    const [randomLevel, setRandomLevel] = useState<number>(6)

    /*---> Functions <---*/
    const generateAllDies = (): diceTypes[] => {
        return new Array(10).fill(0).map(() => ({ id: uuidv4(), value: Math?.ceil(Math?.random() * randomLevel), isHeld: false }));
    }
    const roleDice = (): void => {
        if (gameWon) {
            setDice(generateAllDies)
            setTimerRuns(false)
        } else {
            setDice((prevState) => prevState?.map((die) => (
                die?.isHeld ? die : { ...die, value: Math?.ceil(Math?.random() * randomLevel) }
            )))
        }
    }
    const hold = (id: string): void => {
        setTimerRuns(true)
        setDice((prevState) => prevState?.map((die) => die?.id === id ? { ...die, isHeld: !die?.isHeld } : die));
    }
    const gameTimer = (): void => {
        if (timerRuns) {
            if (intervalRef.current) { clearInterval(intervalRef.current) }
            intervalRef.current = setInterval(() => {
                setTime((prevState) => {
                    const newSeconds = prevState?.seconds < 59 ? prevState?.seconds + 1 : 0;
                    const newMinutes = prevState?.seconds < 59 ? prevState?.minutes : prevState.minutes + 1;
                    return { seconds: newSeconds, minutes: newMinutes };
                });
            }, 1000);
        }
        if (gameWon && intervalRef.current) { clearInterval(intervalRef.current) }
    }
    const changeLevel = (): void => {
        setRandomLevel(level === "normal" ? 6 : level === "hard" ? 12 : level === "extreme" ? 24 : 0)
    }

    /*---> Effects <---*/
    useEffect(() => {
        setDice(generateAllDies());
        setLoading(false);
        setIsClient(true)
    }, []);
    useEffect(() => {
        gameTimer();
    }, [timerRuns, gameWon])
    useEffect(() => {
        changeLevel()
        roleDice()
    }, [randomLevel, level])
    
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
                <div className="flex items-center gap-2">
                    <button className="px-[18px] py-[7.6px] rounded-md bg-black text-white text-[1rem] font-bold whitespace-nowrap"
                        onClick={roleDice}>
                        {gameWon ? "New Game" : "Roll Dice"}
                    </button>
                    <Select onValueChange={(value) => { setLevel(value as 'normal' | 'hard' | 'extreme') }}>
                        <SelectTrigger className="w-[115px] py-[19.3px] text-[1rem] font-bold bg-black text-white">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="normal">Normale</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                                <SelectItem value="extreme">Extreme</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {timerRuns && <h1 className="text-3xl font-bold">{`${time?.minutes >= 10 ? "" : "0"}${time?.minutes}:${time?.seconds >= 10 ? "" : "0"}${time?.seconds}`}</h1>}
            </div>
            <Score />
        </section>
    </>
}