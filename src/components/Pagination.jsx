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