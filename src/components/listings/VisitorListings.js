import VisitorItems from "./VisitorItems";

const VisitorListings = ({ searchResults }) => {
  return (
    <div className="visitor-listings">
      <VisitorItems searchResults={searchResults} />
    </div>
  );
};

export default VisitorListings;