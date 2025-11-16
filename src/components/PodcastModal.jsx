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

             {/* Genres */}
            {genreNames.length > 0 && (
              <div className="modal-genres">
                <h2>Genres</h2>
                <div className="genre-tags">
                  {genreNames.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

                        {/* Last updated */}
            {podcast.updated && (
              <div className="modal-updated">
                📅 Last updated: {new Date(podcast.updated).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>
        </div> 

                {/* Seasons section */}
        <div className="modal-seasons">
          <h2 className="seasons-title">Seasons</h2>
          
          {podcast.seasons ? (
            <div className="seasons-list">
              {[...Array(podcast.seasons)].map((_, index) => (
                <div 
                  key={index} 
                  className="season-card"
                  onClick={() => setSelectedSeason(index + 1)}
                >
                  <div className="season-info">
                    <h3 className="season-title">Season {index + 1}: Getting Started</h3>
                    <p className="season-subtitle">Introduction to the fundamentals</p>
                  </div>
                  <div className="season-episodes">
                    12 episodes
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-seasons">No seasons available</p>
          )}
        </div>
      </div>     

    <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          overflow-y: auto;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          font-size: 20px;
          color: #666;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #f5f5f5;
          transform: scale(1.1);
        }

        .modal-header {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          padding: 40px;
          border-bottom: 1px solid #e5e5e5;
        }

        .modal-image-container {
          width: 300px;
          height: 300px;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          background: #6b7280;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .modal-header-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .modal-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.2;
        }

        .modal-description h2,
        .modal-genres h2 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .modal-description p {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        .genre-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .genre-tag {
          background: white;
          border: 1px solid #d1d5db;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-updated {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #6b7280;
        }

        .modal-seasons {
          padding: 40px;
        }

        .seasons-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 24px 0;
        }

        .seasons-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .season-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .season-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .season-info {
          flex: 1;
        }

        .season-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .season-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .season-episodes {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .no-seasons {
          text-align: center;
          color: #9ca3af;
          padding: 40px;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .modal-header {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }

          .modal-image-container {
            width: 100%;
            height: auto;
            aspect-ratio: 1;
          }

          .modal-title {
            font-size: 24px;
          }

          .modal-seasons {
            padding: 24px;
          }

          .season-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}