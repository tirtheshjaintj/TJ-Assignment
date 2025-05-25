import { motion } from "framer-motion";
import { MdOutlineSearchOff } from "react-icons/md";

const NoResults: React.FC = () => {

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <MdOutlineSearchOff className="text-5xl text-blue-500 mb-3" />
      <h3 className="text-lg font-semibold mb-1">No Results Found</h3>
      <p className="text-sm text-center max-w-sm">
        Try adjusting your filters or searching with a different keyword.
      </p>
    </motion.div>
  );
};

export default NoResults;
