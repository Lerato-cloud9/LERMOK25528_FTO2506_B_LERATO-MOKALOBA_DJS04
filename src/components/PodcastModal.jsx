import { useState } from 'react';

/**
 * PodcastModal component - Displays detailed podcast information in a modal
 * 
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data to display
 * @param {Array} props.genres - Array of genre objects for mapping IDs to titles
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback function to close the modal
 * @returns {JSX.Element|null} The rendered modal or null if closed
 */

export default function PodcastModal({ podcast, genres, isOpen, onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  if (!isOpen || !podcast) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    // Close modal on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };