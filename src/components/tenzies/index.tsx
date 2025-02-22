"use client"

import Score from "../score";
import Navbar from "../nav";
import Game from "../game";
import Information from "../information";

export default function Tenzies() {
    return <>
        <Navbar />
        <section className="w-full h-screen flex justify-center relative overflow-hidden">
            <Game />
            <Score />
            <Information />
        </section>
    </>
}