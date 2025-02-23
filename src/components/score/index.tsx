import Hero from "../hero";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { shareStates } from "@/context";

export default function Score() {
    /*---> States <---*/
    const { showMenu, score, setScore } = useContext(shareStates);

    /*---> Functions <---*/
    const removeScore = (id: string) => {
        setScore((prevState) => prevState?.filter((item) => item?.id !== id))
    }

    /*---> Effects <---*/
    useEffect(() => {
        if (score?.length > 0) {
            localStorage.setItem("score", JSON.stringify(score));
        }
    }, [score])

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: showMenu ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:max-w-[400px] h-screen right-0 flex flex-col absolute shadow-xl z-20 bg-white">
            <div className="w-full flex flex-col pt-28 px-8">
                <Hero title="Score" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            {["Number", "Level", "Time", "Action"]?.map((head, index) => (
                                <TableHead key={index} className={`w-1/4 ${head === "Number" ? "" : head === "Action" ? "text-end" : "text-center"}`}>
                                    {head}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {score && score?.sort((a, b) => a?.time?.minutes - b?.time?.minutes || a?.time?.seconds - b?.time?.seconds).map((item, index) => (
                            <TableRow key={item?.id}>
                                <TableCell className="w-1/4 font-bold">{index + 1}</TableCell>
                                <TableCell className="w-1/4 font-bold text-center">{item?.level}</TableCell>
                                <TableCell className="w-1/4 font-bold text-center">{item?.time?.minutes >= 10 ? "" : 0}{item?.time?.minutes} : {item?.time?.seconds >= 10 ? "" : 0}{item?.time?.seconds}</TableCell>
                                <TableCell className="w-1/4 font-bold text-end">
                                    <button className="px-[11px] py-[5px] rounded-md bg-black text-white text-[0.8rem] font-bold"
                                        onClick={() => removeScore(item?.id)}>
                                        Remove
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}
