import "./index.css";
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div>
      <div className="card relative">
        <div className={flipped ? "flipped" : ""}>
          <img
            src="image/cover.png"
            onClick={handleClick}
            alt="cover"
            className="cover rounded-xl block border-2 border-white"
          />
          <img
            src={card.src}
            alt="front"
            className="front rounded-xl border-2 border-white absolute top-0"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
