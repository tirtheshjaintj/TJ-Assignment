import {  useState } from "react";
import InternshipCard from "../components/InternshipCard";
import NoResults from "../components/NoResults";
import Loader from "../components/Loader";
import InternshipModal from "../components/InternshipModal";
import { useInternships } from "../context/InternshipProvider";
import type { Internship } from "../types";

interface InternshipsProps {
  internships: Internship[];
}

const Internships: React.FC<InternshipsProps> = ({ internships }) => {
  const { loading } = useInternships();
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
 
  return (
    <div className="flex-1 w-full lg:flex-2/3 px-3 relative">
      {/* Loader */}
      {loading && <Loader />}

      {/* No Results */}
      {!loading && internships.length === 0 && <NoResults />}

      <h1 className="text-center font-semibold text-lg p-4">{internships.length} Total Internships</h1>
      <p className="text-center text-xs mb-4">Latest Summer Internships in India</p>

      {/* Internships List */}
      {!loading && internships.length > 0 && (
        <div className="flex flex-col justify-between items-center gap-4">
          {internships.map((internship, idx) => (
            <div key={idx} onClick={() => setSelectedInternship(internship)} className="w-full cursor-pointer">
              <InternshipCard internship={internship} />
            </div>
          ))}
        </div>
      )}

      {/* Internship Details Modal */}
      <InternshipModal internship={selectedInternship} onClose={() => setSelectedInternship(null)} />
    </div>
  );
};

export default Internships;
