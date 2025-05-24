import { motion } from "framer-motion";

const NoResults: React.FC = () => {
    return (
        <motion.div
            className="p-6 text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <p>No internships match your filters.</p>
        </motion.div>
    );
};

export default NoResults;