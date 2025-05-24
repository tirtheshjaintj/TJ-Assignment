import { motion } from "framer-motion";
import type { Internship } from "../types";
import { FaHistory, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { formatDistanceToNow, parse } from "date-fns";

interface InternshipCardProps {
    internship: Internship;
}

export function getRelativeDate(dateString: string): string {
    try {
        const parsedDate = parse(dateString, "dd MMM'' yy", new Date());
        const distance = formatDistanceToNow(parsedDate, { addSuffix: true });

        // Optional: Convert "in 0 days" → "Today"
        if (distance === "in 0 days" || distance === "less than a day ago") {
            return "Today";
        }

        return distance.replace("over", "");
    } catch (error) {
        console.error("Date parsing error:", error);
        return "Unknown date";
    }
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {

    const {
        profile_name,
        company_name,
        location_names,
        duration,
        stipend,
        posted_on,
        work_from_home,
    } = internship;
    // Append "Work From Home" if applicable
    const displayedLocations = [...location_names];
    if (work_from_home && !displayedLocations.includes("Work From Home")) {
        displayedLocations.push("Work From Home");
    }

    // Handle stipend range display
    const displayedStipend = stipend.salaryValue1 && stipend.salaryValue2
        ? `₹${stipend.salaryValue1} - ₹${stipend.salaryValue2}`
        : stipend.salary;

    return (
        <motion.div
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 my-4  cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition w-full flex relative justify-between items-center "
        >
            <div className="flex flex-col gap-2 w-full">
                {/* Title & Company */}
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">{profile_name}</h3>
                        <p className="text-sm text-gray-500">{company_name}</p>
                    </div>
                    {/* Company Logo */}
                    <div className="ml-4 shrink-0">

                        <img
                            src={"/placeholder_logo.svg"}
                            alt={company_name}
                            className="w-12 h-12 rounded-lg bg-gray-100 object-contain"
                        />

                    </div>
                </div>

                {/* Icons Row */}
                <div className="flex flex-wrap text-xs text-gray-700 gap-6 mt-2">
                    <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {displayedLocations.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                        <HiOutlineClock className="text-gray-400" />
                        {duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaMoneyBillWave className="text-gray-400" />
                        {displayedStipend}
                    </span>
                </div>

                {/* Posted Time */}
                <span className="mt-2  bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full w-fit flex items-center">
                    <FaHistory />&nbsp;<span>{getRelativeDate(posted_on)}</span>
                </span>
            </div>


        </motion.div>
    );
};

export default InternshipCard;
