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

