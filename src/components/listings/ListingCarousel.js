import { useState } from 'react';

const ListingCarousel = ({ media }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === (media?.length || 0) - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? (media?.length || 0) - 1 : prevIndex - 1));
  };

  return (
    <div className="listing-carousel">
      <button onClick={prevImage}>Previous</button>
      <div className="carousel-images">
        {/* Render the current image if media exists and is not empty */}
        {media?.length > 0 && (
          <img src={media[currentImageIndex]?.url} alt={`Image ${currentImageIndex + 1}`} />
        )}
      </div>
      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default ListingCarousel;