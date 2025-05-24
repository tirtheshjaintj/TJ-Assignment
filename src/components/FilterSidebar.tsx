import React from "react";
import type { Filters } from "../types";

interface FilterSidebarProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
    const handleCheckboxChange = (key: keyof Filters) => {
        setFilters({ ...filters, [key]: !filters[key] });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col w-full flex-1/3 mr-10 md:max-w-[280px] sticky top-[100px] self-start border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>

            <label className="flex items-center mb-2">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.workFromHome}
                    onChange={() => handleCheckboxChange("workFromHome")}
                />
                Work from home
            </label>

            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.partTime}
                    onChange={() => handleCheckboxChange("partTime")}
                />
                Part-time
            </label>

            <div className="mb-4">
                <label className="text-sm font-medium block mb-1">
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
                    className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">₹{filters.stipend}</div>
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium block mb-1">Starting from (or after)</label>
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full text-sm"
                />
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium block mb-1">Max. duration (months)</label>
                <input
                    type="number"
                    name="duration"
                    value={filters.duration}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full text-sm"
                    min="1"
                />
            </div>

            {["jobOffer", "fastResponse", "earlyApplicant", "forWomen"].map((key) => (
                <label key={key} className="flex items-center mb-2 capitalize">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters[key as keyof Filters]}
                        onChange={() => handleCheckboxChange(key as keyof Filters)}
                    />
                    {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
            ))}

            <button
                onClick={() =>
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
                    })
                }
                className="text-blue-600 text-sm mt-2 underline"
            >
                Clear all
            </button>

            <div className="mt-6">
                <label className="text-sm font-medium block mb-1">Keyword Search</label>
                <div className="flex">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="e.g. Design, Mumbai, Infosys"
                        value={filters.keyword}
                        onChange={handleInputChange}
                        className="flex-grow px-2 py-1 border rounded-l text-sm"
                    />
                    <button className="bg-blue-500 text-white px-3 rounded-r">
                        🔍
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
