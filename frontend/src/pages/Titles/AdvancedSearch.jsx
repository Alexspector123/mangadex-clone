import React, { useState } from "react";
import useFetchbyTitle from "../../hooks/useFetchbyTitle";

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryParams, setQueryParams] = useState(null);
  const { mangaData, error, isLoading } = useFetchbyTitle(queryParams);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setQueryParams({ title: searchQuery, limit: 10 });
    }
  };

  return (
    <div className="relative z-10 px-4 mt-[68px] mb-auto">
      <h2>Advanced Manga Search</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search manga by title..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {mangaData.length > 0 ? (
        <ul>
          {mangaData.map((manga) => (
            <li key={manga.id}>{manga.attributes?.title?.en || "No Title"}</li>
          ))}
        </ul>
      ) : (
        <p>No manga found.</p>
      )}
    </div>
  );
};

export default AdvancedSearch;
