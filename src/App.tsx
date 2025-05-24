import { useEffect } from "react";
import { useInternships } from "./context/InternshipProvider";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const { internships, loading } = useInternships();
  useEffect(() => {
    console.log(internships);
  }, [internships]);

  return <>
    <ToastContainer />
  </>
}

export default App;

