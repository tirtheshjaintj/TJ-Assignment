import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import type { Filters } from "../types"; // Make sure your `Filters` type is accurate
import {  FaFilterCircleXmark } from "react-icons/fa6";


interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleCheckboxChange = (key: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  }, [setFilters]);
  
  

  const clearAllFilters = () => {
    setFilters({
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
  };

  const FilterContent: React.FC = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center"><FaFilter/> Filters</h2>

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
          Desired minimum monthly stipend (₹)
        </label>
        <input
          type="range"
          name="stipend"
          min="0"
          max="10000"
          step="1000"
          value={filters.stipend}
          onChange={handleInputChange}
          className="w-full accent-blue-500"
        />
        <div className="text-base text-gray-500 mt-1">₹{filters.stipend}</div>
      </div>

      {/* View More */}
      <button
        onClick={() => setShowMoreFilters(!showMoreFilters)}
        className="flex items-center text-blue-600 text-sm my-5"
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
                className="border border-gray-500/50 rounded p-2 w-full text-sm  block mb-1"
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
                className="border border-gray-500/50 focus:outline-blue-400 rounded p-2 w-full  text-sm font-medium block mb-1"
                min="1"
              />
            </div>

            {/* Extra Checkboxes */}
            {(["jobOffer", "fastResponse", "earlyApplicant", "forWomen"] as (keyof Filters)[]).map(
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
      <div className="mt-6 mb-4">
        <label className="text-sm font-medium block mb-1">Keyword Search</label>
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
        className="text-blue-600 flex items-center  p-2 text-base cursor-pointer float-right pb-2"
      >
        Clear all&nbsp;<FaFilterCircleXmark/>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-md  rounded-lg flex-1/3 sticky top-[100px] self-start">
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          Open Filters <FaFilter/>  
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
          >
            <motion.div
              className="w-4/5 bg-white overflow-y-auto h-full p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <FaTimes size={20} />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
