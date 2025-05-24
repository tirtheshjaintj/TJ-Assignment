import { motion } from "framer-motion";

const SkeletonCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 m-2 rounded-2xl shadow-sm w-full flex justify-between items-center animate-pulse"
        >
            <div className="flex flex-col gap-2 w-full">
                {/* Title & Company */}
                <div className="flex justify-between">
                    <div>
                        <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                    {/* Logo */}
                    <div className="ml-4 shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gray-200" />
                    </div>
                </div>

                {/* Icons Row */}
                <div className="flex flex-wrap gap-4 mt-2">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-28" />
                </div>

                {/* Posted Time */}
                <div className="mt-2 h-5 bg-green-100 rounded-full w-32" />
            </div>
        </motion.div>
    );
};

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
            ))}
        </div>
    );
};

export default Loader;
