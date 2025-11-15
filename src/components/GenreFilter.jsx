/**
 * GenreFilter component - Provides genre filtering with multi-select chips
 * 
 * @param {Object} props
 * @param {Array<number>} props.selectedGenres - Array of selected genre IDs
 * @param {Function} props.onChange - Callback function when genre selection changes
 * @param {Array<Object>} props.genres - Array of all available genres
 * @returns {JSX.Element} The rendered genre filter interface
 */
import { useCallback } from "react";

export default function GenreFilter({ selectedGenres, onChange, genres }) {

  // Toggle a genre on or off when the user clicks on it
  // genreId = the ID of the genre being selected or unselected

  const handleGenreToggle = (genreId) => {                   // If the genre is already selected, remove it from the list
    if (selectedGenres.includes(genreId)) {
      onChange(selectedGenres.filter(id => id !== genreId));
    } else {                                                  // Otherwise, add the new genre to the selected list
      onChange([...selectedGenres, genreId]);
    }
  };

/**
   * Clear all selected genres
   * (This auto-clears the selectedGenres array)
   */
  const clearFilters = () => {
    onChange([]);                        // Reset genre selection to an empty list
  };

    return (
    <div className="genre-filter">      {/* Wrapper container for genre filtering UI */}
      <div className="filter-header">   {/* Header row with label + clear button */}
        <label>Filter by Genre:</label> {/* Label showing what this section does */}
        {selectedGenres.length > 0 && (  /* Only show "Clear All" if any genre is selected */
          <button 
          onClick={clearFilters} // Runs function to reset all selections
          className="clear-btn"          // Styling for the clear button
          aria-label={`Clear all filters (${selectedGenres.length} selected)`}
          >         
            Clear All
          </button>
        )}
      </div>
      <div className="genre-chips" role="group" aria-label="Genre filters">    {/* Container for clickable genre buttons */}
        {genres.map(genre => (         /* Loop through all genres and render buttons */
          <button
            key={genre.id}             // Unique key for React list rendering
            onClick={() => handleGenreToggle(genre.id)} // Toggle when clicked
            className={`genre-chip ${selectedGenres.includes(genre.id) ? 'active' : ''}`} // Adds 'active' class only if this genre is selected
            aria-pressed={selectedGenres.includes(genre.id)}
            aria-label={`Filter by ${genre.title}`}
          >
            {genre.title}    {/* Show the name of the genre */}                               
          </button>
        ))}
      </div>
    </div>
  );
}