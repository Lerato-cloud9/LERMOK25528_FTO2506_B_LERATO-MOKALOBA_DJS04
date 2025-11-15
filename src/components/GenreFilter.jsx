/**
 * GenreFilter component - Provides genre filtering with multi-select chips
 * 
 * @param {Object} props
 * @param {Array<number>} props.selectedGenres - Array of selected genre IDs
 * @param {Function} props.onChange - Callback function when genre selection changes
 * @param {Array<Object>} props.genres - Array of all available genres
 * @returns {JSX.Element} The rendered genre filter interface
 */

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
   */
  const clearFilters = () => {
    onChange([]);
  };