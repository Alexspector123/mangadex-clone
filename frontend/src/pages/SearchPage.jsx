import React, { useState, useCallback, useEffect, useRef } from "react";
import { debounce } from 'lodash';

import axios from 'axios';

import { FiSearch } from "react-icons/fi";

import useFetchbyTitle from "../hooks/manga/useFetchbyTitle";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({manga: [], group: [], author: []});

  const fetchOptions = async (nextValue) => {
    if(!nextValue.trim()){
        setResults({manga:[], group: [], author: []});
        return;
    }
    try {
        const response = await axios.get(`http://localhost:5000/api/manga/search?query=${nextValue}`);
        setResults(response.data);
    } catch (error) {
        console.error("Error fetching search results", error);
    }
  };

  const debounceDropDown = useCallback(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), []);

  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceDropDown(value);
  };

  return (
    <div className="relative z-10 px-4 
                    mt-[68px] mb-auto">
      <div className="flex items-center
                      mb-6 mt-2">
        <h2 className="font-header text-2xl font-semibold">Search</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputOnchange}
          placeholder="Search"
          className="w-full
                    px-12 py-2
                  bg-slate-100
                    rounded
                    text-base
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <FiSearch className="absolute top-2 left-2
                              text-2xl"/>
      </div>

      {mangaData.length > 0 ? (
        <ul>
          {mangaData.map((manga) => (
            <li key={manga.id}>{manga.attributes?.title?.en || "No Title"}</li>
          ))}
        </ul>
      ) : (
        <p>Start typing to search...</p>
      )}
    </div>
  );
};

export default SearchPage;
