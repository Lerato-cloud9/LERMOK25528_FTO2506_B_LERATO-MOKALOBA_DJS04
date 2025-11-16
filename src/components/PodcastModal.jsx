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

    // Map genre IDs to genre titles
  const genreNames = podcast.genres?.map((id) => {
    const match = genres?.find((genre) => genre.id === id);
    return match ? match.title : `Genre ${id}`;
  }) || [];

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        {/* Close button */}
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal header with image and basic info */}
        <div className="modal-header">
          <div className="modal-image-container">
            <img 
              src={podcast.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
              alt={podcast.title}
              className="modal-image"
            />
          </div>

          <div className="modal-header-info">
            <h1 id="modal-title" className="modal-title">{podcast.title}</h1>

            {/* Description */}
            {podcast.description && (
              <div className="modal-description">
                <h2>Description</h2>
                <p>{podcast.description}</p>
              </div>
            )}