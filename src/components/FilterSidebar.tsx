import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import type { Filters } from "../types";
import { FaFilterCircleXmark } from "react-icons/fa6";
import TagInput from "./TagInput";

interface FilterContentProps {
  filters: Filters;
  handleCheckboxChange: (key: keyof Filters) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleProfilesChange: (newProfiles: string[]) => void;
  handleLocationsChange: (newLocations: string[]) => void;
  clearAllFilters: () => void;
  profiles: string[];
  locations: string[];
}

const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  handleCheckboxChange,
  handleInputChange,
  handleProfilesChange,
  handleLocationsChange,
  clearAllFilters,
  profiles,
  locations
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center"><FaFilter/> Filters</h2>
      
      {/* Profiles Tag Input */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Profiles</label>
        <TagInput
          tags={filters.profiles}
          suggestions={profiles}
          onChange={handleProfilesChange}
          placeholder="Add job profiles"
        />
      </div>

      {/* Locations Tag Input */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Locations</label>
        <TagInput
          tags={filters.locations}
          suggestions={locations}
          onChange={handleLocationsChange}
          placeholder="Add locations"
        />
      </div>

      {/* WFH */}
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          className="accent-blue-500 w-4 h-4 mr-2"
          checked={filters.workFromHome}
          onChange={() => handleCheckboxChange("workFromHome")}
        />
        Work from home
      </label>

      {/* Part-time */}
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="accent-blue-500 w-4 h-4 mr-2"
          checked={filters.partTime}
          onChange={() => handleCheckboxChange("partTime")}
        />
        Part-time
      </label>

      {/* Stipend */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Desired Min. Monthly Stipend (₹)
        </label>
        <div className="text-base mt-1">₹{(10000-filters.stipend)}</div>
        <input
          type="range"
          name="stipend"
          min="0"
          max="10000"
          step="1000"
          value={filters.stipend}
          onChange={handleInputChange}
          className="w-full accent-blue-500 rotate-180"
        />
      </div>

      {/* View More */}
      <button
        onClick={() => setShowMoreFilters(!showMoreFilters)}
        className="flex items-center font-bold text-blue-600 dark:text-white text-sm my-5"
      >
        {showMoreFilters ? (
          <>
            View less filters <FaChevronUp className="ml-1" />
          </>
        ) : (
          <>
            View more filters <FaChevronDown className="ml-1" />
          </>
        )}
      </button>

      {showMoreFilters && (
        <motion.div
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          {/* Start Date */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-1">
              Starting from (or after)
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleInputChange}
              className="border border-gray-500/50 rounded p-2 w-full text-sm block mb-1"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-1">
              Max. duration (months)
            </label>
            <input
              type="number"
              name="duration"
              value={filters.duration}
              onChange={handleInputChange}
              placeholder="eg. 3 Months"
              className="border border-gray-500/50 focus:outline-blue-400 rounded p-2 w-full text-sm font-medium block mb-1"
              min="1"
            />
          </div>

          {/* Extra Checkboxes */}
          {(["jobOffer", "forWomen", "fastResponse", "earlyApplicant"] as (keyof Filters)[]).map(
            (key) => (
              <label key={key} className="flex items-center mb-2 capitalize">
                <input
                  type="checkbox"
                  className="accent-blue-500 w-4 h-4 mr-2"
                  checked={(filters[key])?true:false}
                  onChange={() => handleCheckboxChange(key)}
                />
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
            )
          )}
        </motion.div>
      )}

      {/* Keyword */}
      <div className="mt-6 mb-4 ">
        <label className="text-sm  font-medium block mb-1">Keyword Search</label>
        <input
          type="search"
          name="keyword"
          placeholder="e.g. Design, Mumbai, Infosys"
          value={filters.keyword}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-500/50 focus:outline-blue-400 rounded text-sm"
        />
      </div>

      {/* Clear All */}
      <button
        onClick={clearAllFilters}
        className="text-blue-600 dark:text-white flex items-center p-2 text-base cursor-pointer float-right pb-2"
      >
        Clear all&nbsp;<FaFilterCircleXmark/>
      </button>
    </div>
  );
};

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  profiles: string[];
  locations: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, profiles, locations }) => {
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCheckboxChange = useCallback((key: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, [setFilters]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  }, [setFilters]);

  const handleProfilesChange = useCallback((newProfiles: string[]) => {
    setFilters((prev) => ({
      ...prev,
      profiles: newProfiles,
    }));
  }, [setFilters]);

  const handleLocationsChange = useCallback((newLocations: string[]) => {
    setFilters((prev) => ({
      ...prev,
      locations: newLocations,
    }));
  }, [setFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters({
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
      profiles: [],
      locations: []
    });
  }, [setFilters]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1/3 sticky top-[100px] self-start">
        <FilterContent
          filters={filters}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          handleProfilesChange={handleProfilesChange}
          handleLocationsChange={handleLocationsChange}
          clearAllFilters={clearAllFilters}
          profiles={profiles}
          locations={locations}
        />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          Filters <FaFilter/>  
        </button>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            className="fixed lg:hidden inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFilterOpen(false)} 
          >
            <motion.div
              className="w-4/5 bg-white dark:bg-gray-800 relative overflow-y-auto h-full p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(e) => e.stopPropagation()} 
            >
                <button className="absolute right-5 p-2 cursor-pointer" onClick={() => setMobileFilterOpen(false)}>
                  <FaTimes size={25} />
                </button>
             
              <FilterContent
                filters={filters}
                handleCheckboxChange={handleCheckboxChange}
                handleInputChange={handleInputChange}
                handleProfilesChange={handleProfilesChange}
                handleLocationsChange={handleLocationsChange}
                clearAllFilters={clearAllFilters}
                profiles={profiles}
                locations={locations}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;