/**
 * Pagination component - Provides page navigation controls
 * 
 * @param {Object} props
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.onPageChange - Callback function when page changes
 * @returns {JSX.Element} The rendered pagination controls
 */

export default function GenreFilter({ selectedGenres, onChange, genres }) {
  // This function turns a genre on or off when the user clicks it
  // genreId = the ID of the genre we are selecting or unselecting
  const handleGenreToggle = (genreId) => {
    if (selectedGenres.includes(genreId)) {                // If the genre is already selected, remove it from the list
      onChange(selectedGenres.filter(id => id !== genreId));
    } else {                                                // If it’s not selected yet, add it to the list
      onChange([...selectedGenres, genreId]);
    }
  };

  // This function clears all selected genres
  // It resets the list back to an empty array
  const clearFilters = () => {
    onChange([]);  // Update the parent with no selected genres
  };

  return (
    <div className="genre-filter">
      <div className="filter-header">
        <label>Filter by Genre:</label>
        {/* Only show "Clear All" if at least one genre is selected */}
        {selectedGenres.length > 0 && (   
          <button onClick={clearFilters} // Clears all selected genres when clicked
          className="clear-btn">  
            Clear All
          </button>
        )}
      </div>
      <div className="genre-chips">  {/* Container for the clickable genre buttons */}
        {genres.map(genre => (       /* Loop through all available genres */
          <button
            key={genre.id}
            onClick={() => handleGenreToggle(genre.id)}
            className={`genre-chip ${selectedGenres.includes(genre.id) ? 'active' : ''}`} // Adds the "active" class only if this genre is selected
            aria-pressed={selectedGenres.includes(genre.id)}                              // Accessibility: tells screen readers if this button is currently pressed/active
          >
            {genre.title}
          </button>
        ))}
      </div>
    </div>
  );
}