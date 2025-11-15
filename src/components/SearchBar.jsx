/**
 * SearchBar component - Provides a text input for searching podcasts by title
 * 
 * @param {Object} props
 * @param {string} props.value - Current search query value
 * @param {Function} props.onChange - Callback function when search input changes
 * @returns {JSX.Element} The rendered search input
 */
export default function SearchBar({ value, onChange }) {
// The component returns a simple UI: a wrapping <div> and an <input> field
  return (
    <div className="search-bar">
      <input
        type="text"                                  // Input type is text because user types words
        placeholder="Search podcasts by title..."    // Light text shown before the user types
        value={value}                                // The current search value from parent component
        onChange={(e) => onChange(e.target.value)}   // Runs when user types & sends new value up
        className="search-input"                     // CSS class for styling the input
        aria-label="Search podcasts"                 // Accessibility label for screen readers
      />                 
    </div>
  );
}
