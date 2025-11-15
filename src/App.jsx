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
