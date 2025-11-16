/**
 * SortControls component - Provides a dropdown to sort podcasts by different criteria
 * 
 * @param {Object} props
 * @param {string} props.value - Current sort option ('newest', 'oldest', 'a-z', 'z-a')
 * @param {Function} props.onChange - Callback function when sort option changes
 * @returns {JSX.Element} The rendered sort dropdown
 */
export default function SortControls({ value, onChange }) {
// This component shows a label and a dropdown for choosing how to sort podcasts
  return (
    <div className="sort-controls-dropdown">         {/* Wrapper for styling the sort section */}
      <select 
       className="sort-select"                     // CSS class for styling the dropdown
        value={value}                               // Current selected sorting option
        onChange={(e) => onChange(e.target.value)}  // Sends selected value back to parent
      >
        <option value="newest">📅 Newest First</option> {/* Sort by latest updated */}
        <option value="oldest">📅 Oldest First</option> {/* Sort by earliest updated */}
        <option value="a-z">🔤 Title A-Z</option>      {/* Sort alphabetically ascending */}
        <option value="z-a">🔤 Title Z-A</option>      {/* Sort alphabetically descending */}
      </select>
    </div>
  );
}