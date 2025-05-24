import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import Internships from "./components/Internships";
import { useInternships } from "./context/InternshipProvider";
import type { Internship } from "./types";


const App: React.FC = () => {

  const { internships } = useInternships();
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);

  useEffect(() => {
    setFilteredInternships(internships);
  }, [internships]);

  return (
    <>
      <ToastContainer position={"bottom-right"} />
      <div className="flex justify-center flex-col items-center">
        <Header />
        <div className="flex md:w-[956px]">
          <span className="text-sm mt-5 p-10 flex items-center">Home&nbsp; {">"} &nbsp;Internships</span>
        </div>
        <main className="flex flex-col md:flex-row md:w-[956px] ">
          <FilterSidebar />

          <Internships internships={filteredInternships} />

        </main>
      </div>
    </>
  );
};

export default App;
