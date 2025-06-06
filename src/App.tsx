import { useMemo, useState } from "react";
import { useInternships } from "./context/InternshipProvider";
import type { Filters, Internship } from "./types";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import Internships from "./components/Internships";

const App: React.FC = () => {
  const { internships } = useInternships();
  const [filters, setFilters] = useState<Filters>({
    workFromHome: false,
    partTime: false,
    stipend: 10000,
    startDate: "",
    duration: "",
    jobOffer: false,
    fastResponse: false,
    earlyApplicant: false,
    forWomen: false,
    keyword: "",
    profiles:[],
    locations:[]
  });

  const filteredInternships = useMemo<Internship[]>(() => {
    let result = internships;

    if (filters.workFromHome) {
      result = result.filter((i) => i.work_from_home);
    }
    if (filters.partTime) {
      result = result.filter((i) => i.part_time);
    }
    if (filters.stipend >= 0) {
      result = result.filter((i) => i.stipend.salaryValue1 >= (10000 - filters.stipend));
    }
    if (filters.startDate) {
      result = result.filter((i) => new Date(i.start_date1) >= new Date(filters.startDate));
    }
    if (filters.duration) {
      result = result.filter((i) =>
        parseInt(i.duration) <= parseInt(filters.duration)
      );
    }
    if (filters.keyword) {
      result = result.filter((i) =>
        `${i.profile_name} ${i.company_name} ${i.title}`.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.jobOffer) {
      result = result.filter((i) => i.is_ppo);
    }
    if (filters.forWomen) {
      result = result.filter((i) => i.job_segments.includes("internship_for_women"));
    }
    if (filters.profiles.length > 0) {
      result = result.filter((i) => filters.profiles.includes(i.profile_name));
    }
    if (filters.locations.length > 0) {
      result = result.filter((i) =>
        i.location_names.some((loc) => filters.locations.includes(loc))
      );
    }

    return result;
  }, [filters, internships]);

  const { profileSuggestion, locationSuggestion } = useMemo(() => {
    const tempProfiles = new Set<string>();
    const tempLocations = new Set<string>();
  
    internships.forEach((internship) => {
      tempProfiles.add(internship.profile_name);
      internship.location_names.forEach((location) => tempLocations.add(location));
    });
  
    return {
      profileSuggestion: Array.from(tempProfiles),
      locationSuggestion: Array.from(tempLocations),
    };
  }, [internships]);
  
  
  return (
    <>
      <ToastContainer position={"bottom-right"} />
      <div className="flex justify-center flex-col items-center">
        <Header />
        <div className="flex w-full lg:w-[956px] justify-start">
          <span className="text-sm mt-5 p-3 md:p-10 flex items-center">Home&nbsp; {">"} &nbsp;Internships</span>
        </div>
        <main className="flex flex-col w-full lg:flex-row lg:w-[956px]">
          <FilterSidebar filters={filters} setFilters={setFilters} profiles={profileSuggestion} locations={locationSuggestion}/>
          <Internships internships={filteredInternships} />
        </main>
      </div>
    </>
  );
};

export default App;