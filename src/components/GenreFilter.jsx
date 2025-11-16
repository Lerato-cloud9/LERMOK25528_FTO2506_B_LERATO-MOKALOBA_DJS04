export default function GenreFilter({ selectedGenre, onChange, genres }) {
  return (
    <div className="genre-filter-dropdown">
        {/* Dropdown select for genres */}
      <select 
        className="filter-select"
        value={selectedGenre}
        onChange={(e) => onChange(e.target.value)} // Update parent state on change
      >
        {/* Option to show all genres */}
        <option value="all">All Genres</option>
        
        {/* Render each genre as an option */}
        {genres.map((genre) => (                   
          <option key={genre.id} value={genre.id}>
            {genre.title}  {/* Display genre name */}
          </option>
        ))}
      </select>