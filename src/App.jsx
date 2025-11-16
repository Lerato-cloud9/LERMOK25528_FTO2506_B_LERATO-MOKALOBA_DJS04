import { useEffect, useState, useMemo, useCallback } from "react";
import PodcastGrid from "./components/PodcastGrid";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import GenreFilter from "./components/GenreFilter";
import Pagination from "./components/Pagination";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI control state - manages user interactions
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Configuration
  const itemsPerPage = 12;

    /**
   * Fetches podcast data from the API on component mount
   * As per user story:Load podcast data for browsing
   */
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // Processes podcasts by applying search, filter, and sort operations
  const processedPodcasts = useMemo(() => {
    let result = podcasts.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGenre === "all" || p.genres.includes(parseInt(selectedGenre)))
    );

    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.updated) - new Date(a.updated);
      if (sortBy === "oldest") return new Date(a.updated) - new Date(b.updated);
      if (sortBy === "a-z") return a.title.localeCompare(b.title);
      if (sortBy === "z-a") return b.title.localeCompare(a.title);
      return 0;
    });

    return result;
  }, [podcasts, searchQuery, sortBy, selectedGenre]);

  // Pagination
  const totalPages = Math.ceil(processedPodcasts.length / itemsPerPage);
  const paginatedPodcasts = processedPodcasts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => setCurrentPage(1), [searchQuery, selectedGenre, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const resetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

    return (
    <>
      <Header />
      <main>
        {loading && (
          <div className="message-container">
          <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
          <div className="error">Error: {error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
  <section className="controls-section">
  <SearchBar value={searchQuery} onChange={setSearchQuery} />
  
  <div className="filters-container">
  <div className="filter-group">
  <span className="filter-label">Filter by:</span>
    <GenreFilter 
      selectedGenre={selectedGenre}
      onChange={setSelectedGenre}
      genres={genres}
    />
    </div>

    <div className="filter-group">
      <span className="filter-label">Sort by:</span>
      <SortControls value={sortBy} onChange={setSortBy} />
    </div>

    <div className="results-count">
    Showing {paginatedPodcasts.length} of {processedPodcasts.length} podcasts
    </div>
    </div>
  </section>

  {processedPodcasts.length === 0 ? (
  // If there are NO podcasts after filtering/searching, show the "no results" message
    <div className="no-results">
    <div className="no-results-icon">🔍</div>
      <h2>No podcasts found</h2>
      <p>Try adjusting your search or filters.</p>
      <button onClick={resetFilters} className="reset-btn">
      Reset All Filters
    </button>
    {/* Button that clears all filters to show all podcasts again */}
    </div>
      ) : (
       <>
      <PodcastGrid podcasts={paginatedPodcasts} genres={genres} />
       {/* Displays the podcasts for the current page inside a grid layout */}
        <Pagination
        currentPage={currentPage}            // The page the user is currently on
        totalPages={totalPages}              // Total number of pages available
        onPageChange={handlePageChange}      // Function to change pages when user clicks pagination     
        totalResults={processedPodcasts.length} // Number of podcasts after search + filters
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}