/**
 * Pagination component - Provides page navigation controls
 * 
 * @param {Object} props
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.onPageChange - Callback function when page changes
 * @returns {JSX.Element} The rendered pagination controls
 */

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];    // Array to store the page numbers that will be shown
  const maxVisible = 5; // Maximum number of page buttons visible at a time

// Calculate which page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));    // startPage = the first page number to show
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);          // endPage = the last page number to show
  
  if (endPage - startPage < maxVisible - 1) {           // Adjust startPage if there aren’t enough pages at the end
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {         // Fill the pages array with the page numbers from startPage to endPage
    pages.push(i);
  }

    return (
    <div className="pagination">     {/* Main container for pagination buttons */}
      <button
        onClick={() => onPageChange(currentPage - 1)}  // Go to the previous page when clicked
        disabled={currentPage === 1}                  // Disable if already on the first page
        className="page-btn"                     
        aria-label="Previous page"                   // Accessibility label for screen readers
      >
        Previous                                    {/* Button text shown to the user */}
      </button>

{/* Show first page button and ellipsis if startPage is greater than 1 */}
      {startPage > 1 && (
        <>
          <button 
            onClick={() => onPageChange(1)}   // Go to the first page
            className="page-btn"              // Styling class
            aria-label="Go to page 1"         // Accessibility label
          >
            1
          </button>                          1 {/* Display number 1 */}

          {/* Show ellipsis if there’s a gap between page 1 and startPage */}
          {startPage > 2 && <span className="ellipsis">...</span>}
        </>
      )}

{/* Render buttons for the visible pages */}
        {pages.map(page => (
        <button
          key={page}                        // Unique key for React rendering
          onClick={() => onPageChange(page)}// Go to the selected page on click
          className={`page-btn ${page === currentPage ? 'active' : ''}`} // Add "active" class if this page is the current page
          aria-label={`Go to page ${page}`}                              // Accessibility label for screen readers
          aria-current={page === currentPage ? 'page' : undefined}       // Marks the current page for accessibility
        >
          {page}   {/* Show the page number */}
        </button>
      ))}