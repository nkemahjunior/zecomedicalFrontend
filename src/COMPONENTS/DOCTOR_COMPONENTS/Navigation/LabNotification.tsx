"use client"

import { DoctorContext, mainDoctorContextType } from "@/app/(DOCTOR)/doctor/DoctorProvider";
import { useCheckLabResultsAvailableFN } from "@/DATA_FETCHING/DOCTOR/hooks/useCheckLabResultsAvailable";
import { useContext, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import AnimationPing from "./AnimationPing";
import Link from "next/link";
import { usePathname } from "next/navigation";

 
 
export default function LabNotification() {

    const pathname = usePathname()

    const {setCompletedLabResults,completedResults, pendingLabResults} = useContext(DoctorContext) as mainDoctorContextType
 
    const query = useCheckLabResultsAvailableFN() // runs every 10mins
    

    /**
     * on load take all pending lab request from the pendingLabRequest state then go to the individual labs and check if the results are available, 
     * if they are available bring them and it in the completedLabResults state
     */
    useEffect( () => {
        if(!query.isLoading && query.data && query.data.length > 0){



            const hold = [/*...completedResults,*/ ...query.data]
            setCompletedLabResults(hold)
        }

    },[ query.data, query.isLoading, setCompletedLabResults])


    return (
      <Link href={"/doctor/consultation/notifications"} className="block">
        <ul
          className={` hover:bg-stone-300 transition-colors  py-1 ${
            pathname == "/doctor/consultation/notifications"
              ? "bg-stone-200 text-[#24312F] font-bold "
              : ""
          }`}
        >
          <li className="ml-8 flex items-baseline gap-x-4">
            {pathname == "/doctor/consultation/notifications" && (
              <span className="relative h-fit inline-block">
                {completedResults.length > 0 && <AnimationPing />}

                <IoMdNotificationsOutline strokeWidth={10} />
              </span>
            )}
            {pathname != "/doctor/consultation/notifications" && (
              <span className="relative h-fit inline-block">
                {completedResults.length > 0 && <AnimationPing />}

                <IoMdNotificationsOutline />
              </span>
            )}
            Lab Notifications
          </li>
        </ul>
      </Link>
    );
}