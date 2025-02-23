import { useContext } from "react";
import Hero from "../hero";
import { shareStates } from "@/context";
import { motion } from "framer-motion";

export default function Information() {
    /*---> States <---*/
    const { showInformation } = useContext(shareStates);

    return <>
        <motion.div
            initial={{ marginTop: "120px", opacity: 0, zIndex: "-1" }}
            animate={{ marginTop: showInformation ? "84px" : "120px", opacity: showInformation ? 1 : 0, zIndex: showInformation ? "1" : "-1" }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            className="w-full sm:max-w-[400px] h-screen lg:h-auto lg:right-24 mt-[84px] flex flex-col absolute shadow-xl px-6 py-7 sm:rounded-xl z-10 bg-white">
            <Hero title="Information" />
            <ul className="flex flex-col gap-2">
                <li>
                    <b>1) -</b> First, choose a number to start the game. This will define how many dice will be rolled.
                </li>
                <li>
                    <b>2) -</b> Next, select the level of difficulty. You can choose between normale,
                    hard, or extreme based on your preference. After that, click <b>Roll Dice</b> to begin the game.
                </li>
                <li>
                    <b>3) -</b> Once you finish, check your score to see how well you performed in the game!
                </li>
            </ul>
        </motion.div>
    </>
}