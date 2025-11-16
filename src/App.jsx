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
  const [selectedGenres, setSelectedGenres] = useState("all");
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
      (selectedGenres === "all" || p.genres.includes(parseInt(selectedGenres)))
    );

    // Apply search filter - matches any part of title (case-insensitive)
      if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(podcast => 
        podcast.title.toLowerCase().includes(query)
      );
    }

  // Apply genre filter - show podcasts that match selected genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(podcast =>
        podcast.genres.some(genreId => selectedGenres.includes(genreId))
      );
    }

  // Apply sorting based on selected criteria from the dropdown
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":  // Sort by most recently updated first
          return new Date(b.updated) - new Date(a.updated);
        case "oldest":  // Sort by oldest updated first
          return new Date(a.updated) - new Date(b.updated);
        case "a-z":   // Sort alphabetically from A to Z
          return a.title.localeCompare(b.title);
        case "z-a":  // Sort alphabetically from Z to A

          return b.title.localeCompare(a.title);
        default:
          return 0;  // If no sort option matches, leave order unchanged
      }
    });

     return filtered;  // Return the filtered and sorted array of podcasts
  }, [podcasts, searchQuery, sortBy, selectedGenres]);

    /**
   * Calculates pagination values based on processed results
   * Per User Story: Display results in manageable chunks
   */

  const totalPages = Math.ceil(processedPodcasts.length / itemsPerPage); // Total number of pages needed to show all podcasts
  const startIndex = (currentPage - 1) * itemsPerPage;                    // Index of the first podcast to show on the current page
  const endIndex = startIndex + itemsPerPage;                             // Index of the last podcast to show on the current page
  const paginatedPodcasts = processedPodcasts.slice(startIndex, endIndex);// Slice the processed podcasts array to get only the items for the current page

    /**
   * Resets to page 1 when filters change
   * Per User Story: Ensure pagination reflects filtered results correctly
   */
  useEffect(() => {
    setCurrentPage(1);  // Whenever search, genre, or sort changes, go back to the first page
  }, [searchQuery, selectedGenres, sortBy]); // This will run effect when any of these change

    /**
   * Handles page navigation and scrolls to top
   * Per User Story: Smooth page transitions with state persistence
   */
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);  // Update the current page state
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll smoothly to the top of the page
  }, []); // Empty dependency array because function does not rely on other variables

    /**
   * Resets all filters to default state
   * Per User Story: Allow users to clear all selections easily
   */
  const handleResetFilters = useCallback(() => {
    setSearchQuery("");             // Clear the search input
    setSelectedGenres([]);          // Deselect all genres
    setSortBy("newest");            // Reset sorting to default
    setCurrentPage(1);              // Go back to the first page
  }, []);

  /**
   * Handles search query changes
   * Per User Story: Dynamic search with immediate updates
   */
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);    // Update the searchQuery state whenever user types
  }, []);

  /**
   * Handles sort option changes
   * Per User Story: Sort functionality that works with other filters
   */
  const handleSortChange = useCallback((value) => {
    setSortBy(value);  // Update the sortBy state when user selects a new sort option
  }, []);

  /**
   * Handles genre filter changes
   * Per User Story: Multi-select genre filtering
   */
  const handleGenreChange = useCallback((genres) => {
    setSelectedGenres(genres);  // Update selectedGenres state when user selects/deselects genres
  }, []);


  return (
    <>
      <Header />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner" role="status" aria-label="Loading"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

{/* Only show controls if data is loaded and there’s no error */}
        {!loading && !error && (
          <>
            <section className="controls-section" aria-label="Search and filter controls">
              <SearchBar 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
              
              <div className="controls-row">
                <SortControls 
                  value={sortBy} 
                  onChange={handleSortChange} 
                />
                <div className="results-count" role="status" aria-live="polite">
                  Showing {paginatedPodcasts.length} of {processedPodcasts.length} podcast{processedPodcasts.length !== 1 ? 's' : ''}
                </div>
              </div>

{/* Genre filter component */}
                <GenreFilter 
                selectedGenres={selectedGenres} // Currently selected genre IDs
                onChange={handleGenreChange}    // Handler to update selected genres

                genres={genres}                 // Array of all available genres
              />
            </section>

{/* Show message if no podcasts match search/filters */}
            {processedPodcasts.length === 0 ? (
              <div className="no-results" role="status">
                <div className="no-results-icon">🔍</div>

                {/* Heading */}
                <h2>No podcasts found</h2>

                {/* Explanation text */}
                <p>
                  {searchQuery && `No results for "${searchQuery}". `}
                  {selectedGenres.length > 0 && `Try different genre filters. `}
                  Try adjusting your search or filters.
                </p>

                {/* Button to reset all filters */}
                <button onClick={handleResetFilters} className="reset-btn">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
              {/* Display the grid of podcasts for the current page */}
                <PodcastGrid podcasts={paginatedPodcasts} genres={genres} />

               {/* Pagination controls for navigating pages */}
                <Pagination
                  currentPage={currentPage}           // Current page number
                  totalPages={totalPages}             // Total number of pages
                  onPageChange={handlePageChange}      // Handler to change page
                  totalResults={processedPodcasts.length} // Total filtered podcasts
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
