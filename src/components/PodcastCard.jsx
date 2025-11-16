import { formatDate } from "../utils/formatDate";
import { useState } from 'react';
import PodcastModal from './PodcastModal';

export default function PodcastCard({ podcast, genres, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className="tag">
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  const handleCardClick = () => {
    setIsModalOpen(true);
    if (onClick) onClick();
  };

  return (
    <>
      <div 
        className="card" 
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <img src={podcast.image} alt={podcast.title} />
        <h3>{podcast.title}</h3>
        <p className="seasons">{podcast.seasons} seasons</p>
        <div className="tags">{genreSpans}</div>
        <p className="updated-text">Updated {formatDate(podcast.updated)}</p>
      </div>

      {/* Pass genres prop to modal */}
      <PodcastModal 
        podcast={podcast}
        genres={genres}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}