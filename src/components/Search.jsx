// Country search input with Redux state management

import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";

export default function Search({ theme }) {
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const dispatch = useDispatch();

  return (
    <div
      className={`shadow-sm rounded-sm relative w-full 
        ${theme === "light" ? "bg-white" : "bg-[#2B3945]"}`}
    >
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch />
      </div>

      <input
        className={`bg-transparent w-full pl-14 py-4 border-none outline-none
        ${theme === "light" ? "placeholder:text-gray-400" : "placeholder:text-gray-300"}`}
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search for a country..."
      />
    </div>
  );
}
