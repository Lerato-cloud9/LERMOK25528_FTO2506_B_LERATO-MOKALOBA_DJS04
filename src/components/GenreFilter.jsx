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

        <style>{`
        .genre-filter-dropdown {
          position: relative;
        }

        .filter-select {
          appearance: none;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 10px 36px 10px 16px;
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          min-width: 180px;
          transition: all 0.2s;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        .filter-select:hover {
          border-color: #9ca3af;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        @media (max-width: 768px) {
          .filter-select {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}