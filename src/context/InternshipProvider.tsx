// src/context/InternshipContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import type { Internship, InternshipsData } from "../types";
import { toast } from "react-toastify";
import axios from "axios";

interface InternshipContextType {
  internships: Internship[];
  loading: boolean;
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInternships = async () => {
    try {
      setLoading(true);

      let internships: Internship[] = [];
      
      if (import.meta.env.VITE_MODE === "production") {
        const response = await axios.get("/mock.json");
        const data:InternshipsData = response.data;
          internships = data.internship_ids.map(
            (id) => data.internships_meta[id]
          );
      }else{
        const response = await axiosInstance.get("/hiring/search");
        const data:InternshipsData = response.data;
        internships = data.internship_ids.map(
          (id) => data.internships_meta[id]
        );
      }

      setInternships(internships);
      toast.success(`Fetched ${internships.length} Internships`);

    } catch (err) {
      toast.error("Failed to fetch internships");
      console.error("Failed to fetch internships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Running");
    fetchInternships();

  }, []);

  return (
    <InternshipContext.Provider value={{ internships, loading }}>
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternships = () => {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error("useInternships must be used within an InternshipProvider");
  }
  return context;
};
