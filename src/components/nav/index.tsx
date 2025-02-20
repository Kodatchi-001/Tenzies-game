"use client"

import { shareStates } from "@/context";
import { useContext } from "react";
import { GrScorecard } from "react-icons/gr";
import { MdOutlineLightMode } from "react-icons/md";

export default function Navbar() {
    const { setShowMenu } = useContext(shareStates);
    const toggle = () => setShowMenu((prevState) => !prevState);

    return <>
        <nav className="w-full py-5 flex justify-end gap-3 absolute pr-5 lg:pr-14 pt-6 z-50">
            <div className="bg-white rounded-full shadow-xl p-[9px] cursor-pointer">
                <MdOutlineLightMode className="text-[18px]" />
            </div>
            <div className="bg-white rounded-full shadow-xl p-[9px] cursor-pointer" onClick={toggle}>
                <GrScorecard className="text-[18px]" />
            </div>
        </nav>
    </>
}