import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
    { label: "Internships", submenu: ["Internship1", "Internship2", "Internship3"] },
    { label: "Courses", badge: "OFFER", submenu: ["Course1", "Course2", "Course3"] },
    { label: "Jobs", submenu: ["Job1", "Job2", "Job3"] },
    { label: "Login / Register", submenu: ["Login", "Register"] },
];

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close sidebar if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
                setOpenDropdownIndex(null);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Toggle dropdown on mobile nav item click
    const toggleDropdown = (index: number) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    return (
        <header className="sticky top-0 z-50 bg-white  shadow-sm px-4 md:px-8 py-3 flex justify-center items-center w-screen">
            <div className=" bg-white flex justify-between items-center w-screen max-w-[1224px]">
                {/* Logo */}
                <div className="flex items-center gap-2 justify-center">
                    {/* Mobile Hamburger Icon */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <img src="/Internshala-logo.png" alt="Internshala" className="w-32" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700 relative">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer flex items-center gap-1 hover:text-blue-600"
                        >
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="ml-1 text-[10px] bg-orange-500 text-white font-semibold px-1.5 py-0.5 rounded-sm">
                                    {item.badge}
                                </span>
                            )}
                            <ChevronDown className="w-4 h-4" />



                            {/* Dropdown on hover */}
                            <div
                                className="absolute top-full  bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
                                onMouseEnter={() => setOpenDropdownIndex(index)}
                                onMouseLeave={() => setOpenDropdownIndex(null)}
                            >
                                <ul className="flex flex-col p-2 text-gray-700 w-full">
                                    {item.submenu?.map((subItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="py-2 px-5 rounded hover:bg-blue-100 cursor-pointer "
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </nav>



                {/* Mobile Sidebar Menu from Left */}
                <div
                    ref={sidebarRef}
                    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-6 flex flex-col gap-4 text-gray-700 font-medium h-full">


                        {navItems.map((item, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="flex justify-between items-center w-full text-left py-2 border-b border-gray-200"
                                >
                                    <span>{item.label}</span>
                                    <div className="flex items-center gap-1">
                                        {item.badge && (
                                            <span className="text-[10px] bg-orange-500 text-white font-semibold px-1.5 py-0.5 rounded-sm">
                                                {item.badge}
                                            </span>
                                        )}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${openDropdownIndex === index ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </div>
                                </button>

                                {/* Dropdown content animation */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdownIndex === index ? "max-h-40" : "max-h-0"
                                        }`}
                                >
                                    {openDropdownIndex === index && (
                                        <ul className="pl-4 mt-2 flex flex-col gap-2 text-sm text-gray-600">
                                            {item.submenu?.map((subItem, subIndex) => (
                                                <li key={subIndex}>{subItem}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
