import * as React from "react";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateFakeData } from "../utils/fakeData";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { ANIMALS } from "../constants/ANIMALS";

interface SearchResult {
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
  type: string;
}

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const allAnimalsString = ANIMALS.join(", ");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchTerm(query);
    performSearch(query);
  }, [location.search]);

  const performSearch = (query: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const fakeData = generateFakeData(100);
      const filteredResults = fakeData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const ResultDetails = ({ result }: { result: SearchResult }) => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{result.title}</h2>
      <img
        src={result.image}
        alt={result.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-green-700 text-sm mb-2">{result.url}</p>
      <p className="mb-2">
        <strong>Type:</strong> {result.type}
      </p>
      <p>{result.description}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-8 sm:px4 py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Zoogle..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </form>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          {isLoading ? (
            <div className="space-y-4 ">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="animate-pulse py-4 ">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : searchTerm === "" ? (
            <p>Please enter a search term to find animals.</p>
          ) : results.length === 0 ? (
            <>
              <p>No results found for "{searchTerm}".</p>
              <p>
                Try looking for <b>{allAnimalsString}</b>.
              </p>
            </>
          ) : (
            <div className="space-y-8">
              {results.map((result) => (
                <div key={result.id} className="mb-4">
                  {isMobile ? (
                    <Dialog>
                      <DialogTrigger>
                        <button
                          onClick={() => handleResultClick(result)}
                          className="text-left"
                        >
                          <h2 className="text-xl text-blue-600 hover:underline mb-1">
                            {result.title}
                          </h2>
                          <p className="text-green-700 text-sm mb-1">
                            {result.url}
                          </p>
                          <p className="text-sm text-gray-600">
                            {result.description}
                          </p>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{result.title}</DialogTitle>
                        </DialogHeader>
                        <ResultDetails result={result} />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <button
                      onClick={() => handleResultClick(result)}
                      className="text-left w-full"
                    >
                      <h2 className="text-xl text-blue-600 hover:underline mb-1">
                        {result.title}
                      </h2>
                      <p className="text-green-700 text-sm mb-1">
                        {result.url}
                      </p>
                      <p className="text-sm text-gray-600">
                        {result.description}
                      </p>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {!isMobile && selectedResult && (
          <div className="w-full md:w-1/3 sticky top-4 self-start">
            <ResultDetails result={selectedResult} />
          </div>
        )}
      </div>
    </div>
  );
}
