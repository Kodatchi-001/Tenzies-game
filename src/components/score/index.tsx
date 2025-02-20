"use client"

import Hero from "../hero";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { shareStates } from "@/context";

export default function Score() {
    const { showMenu } = useContext(shareStates);

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: showMenu ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:max-w-[400px] h-screen right-0 flex flex-col absolute shadow-xl bg-white">
            <div className="w-full flex flex-col pt-28 px-8">
                <Hero title="Score" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Number</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold">01</TableCell>
                            <TableCell className="text-right font-bold">INV001</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}
