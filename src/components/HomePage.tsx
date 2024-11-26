import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZoogleLogo } from "./ui/ZoogleLogo";
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [emptyError, setEmptyError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setEmptyError(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(70vh-100px)]">
      <h1 className="text-8xl font-bold mb-8">
        <ZoogleLogo size="text-8xl" />
      </h1>
      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl flex flex-col items-center"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Zoogle..."
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg m-3 box-border"
          />
          <button
            type="button"
            onClick={clearSearch}
            disabled={!searchTerm}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full transition-colors text-sm  text-gray-500 ${
              !searchTerm
                ? "opacity-0 text-white-500"
                : "bg-white-200 hover:bg-gray-300"
            }`}
          >
            𐌢
          </button>
        </div>

        <button
          type="submit"
          disabled={!searchTerm}
          className={`m-10 px-6 py-2 rounded transition-colors ${
            !searchTerm
              ? "bg-gray-100 text-gray-300"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Search
        </button>
      </form>
      {emptyError && (
        <p className="text-red-500 mt-4">Please enter a search term.</p>
      )}
    </div>
  );
}
