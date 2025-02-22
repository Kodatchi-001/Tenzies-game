import { shareStates } from "@/context";
import { useContext } from "react";
import { GrScorecard } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";

export default function Navbar() {
    /*---> States <---*/
    const { setShowMenu, setShowInformation } = useContext(shareStates);

    /*---> Functions <---*/
    const toggleScore = (): void => setShowMenu((prevState) => !prevState);
    const toggleInformation = (): void => setShowInformation((prevState) => !prevState);

    return <>
        <nav className="w-full py-5 flex justify-end gap-3 absolute pr-5 lg:pr-14 pt-6 z-50">
            <div className="bg-white rounded-full shadow-xl p-[9px] cursor-pointer" onClick={toggleInformation}>
                <FaInfo className="text-[18px]" />
            </div>
            <div className="bg-white rounded-full shadow-xl p-[9px] cursor-pointer" onClick={toggleScore}>
                <GrScorecard className="text-[18px]" />
            </div>
        </nav>
    </>
}