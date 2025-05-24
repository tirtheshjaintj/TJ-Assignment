import InternshipCard from "../components/InternshipCard";
import NoResults from "../components/NoResults";
import Loader from "../components/Loader";
import { useInternships } from "../context/InternshipProvider";
import type { Internship } from "../types";

interface InternshipsProps {
    internships: Internship[];
}

const Internships: React.FC<InternshipsProps> = ({ internships }) => {
    const { loading } = useInternships();

    return (
        <div className="flex-2/3 px-3">
            {/* Loader */}
            {loading && <Loader />}

            {/* No Results */}
            {!loading && internships.length === 0 && <NoResults />}

            <h1 className="text-center font-semibold text-lg p-4">{internships.length} Total Internships</h1>
            <p className="text-center text-xs"> Latest Summer Internships in India </p>
            {/* Internships List */}
            {!loading && internships.length > 0 && (
                <div className="flex flex-col justify-between items-center">
                    {internships.map((internship, idx) => (
                        <InternshipCard key={idx} internship={internship} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Internships;
