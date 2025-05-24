import { useEffect, useState } from "react";
import { useInternships } from "./context/InternshipProvider";
import type { Filters, Internship } from "./types";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import Internships from "./components/Internships";

const App: React.FC = () => {
  const { internships } = useInternships();
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [filters, setFilters] = useState<Filters>({
    workFromHome: false,
    partTime: false,
    stipend: 0,
    startDate: "",
    duration: "",
    jobOffer: false,
    fastResponse: false,
    earlyApplicant: false,
    forWomen: false,
    keyword: "",
  });

  useEffect(() => {
    let result = internships;

    if (filters.workFromHome)
      result = result.filter((i) => i.work_from_home);

    if (filters.partTime)
      result = result.filter((i) => i.part_time);

    if (filters.stipend > 0)
      result = result.filter((i) => i.stipend.salaryValue1 >= filters.stipend);

    if (filters.startDate)
      result = result.filter((i) => new Date(i.start_date1) >= new Date(filters.startDate));

    if (filters.duration)
      result = result.filter((i) =>
        parseInt(i.duration) <= parseInt(filters.duration)
      );

    if (filters.keyword)
      result = result.filter((i) =>
        `${i.profile_name} ${i.company_name}`.toLowerCase().includes(filters.keyword.toLowerCase())
      );

    // Placeholder for other boolean flags (if mapped in your API response)
    if (filters.jobOffer)
      result = result.filter((i) => i.is_ppo);

    if (filters.forWomen)
      result = result.filter((i) => i.labels_app_in_card.includes("internships for women"));

    // fastResponse, earlyApplicant would depend on backend support — currently ignored

    setFilteredInternships(result);
  }, [filters, internships]);

  return (
    <>
      <ToastContainer position={"bottom-right"} />
      <div className="flex justify-center flex-col items-center">
        <Header />
        <div className="flex md:w-[956px]">
          <span className="text-sm mt-5 p-10 flex items-center">Home&nbsp; {">"} &nbsp;Internships</span>
        </div>
        <main className="flex flex-col md:flex-row md:w-[956px]">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <Internships internships={filteredInternships} />
        </main>
      </div>
    </>
  );
};

export default App;