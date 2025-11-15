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
  const [selectedGenres, setSelectedGenres] = useState([]);
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
    let filtered = [...podcasts];

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
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <PodcastGrid podcasts={podcasts} genres={genres} />
        )}
      </main>
    </>
  );
}
