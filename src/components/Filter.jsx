// Region filter dropdown connected to Redux global state

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRegion } from "../redux/regionSlice";

export default function Filter({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const selectedRegion = useSelector((state) => state.region.selectedRegion);
  const dispatch = useDispatch();

  const ref = useRef(null);

  //Closes the dropdown menu when click enywhere on the page
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full rounded-md shadow-md px-6 py-4 text-sm flex justify-between items-center
          ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
      >
        {selectedRegion === "All" ? "Filter by Region" : selectedRegion}

        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-full rounded-md shadow-lg z-10
            ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-white"
            }`}
        >
          <div className="py-2">
            <button
              onClick={() => {
                dispatch(setRegion("All"));
                setIsOpen(false);
              }}
              className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              All
            </button>

            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  dispatch(setRegion(region));
                  setIsOpen(false);
                }}
                className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
