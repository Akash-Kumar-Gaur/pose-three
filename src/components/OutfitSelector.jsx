import React, { useState } from "react";

const OutfitSelector = ({ onOutfitChange }) => {
  const [selectedOutfit, setSelectedOutfit] = useState("onesie");
  const handleOutfitChange = (value) => {
    setSelectedOutfit(value);
    onOutfitChange?.(value);
  };

  return (
    <div style={{ position: "absolute" }}>
      <input
        type="checkbox"
        id="outfit-switch"
        className="button checkbox"
        style={{
          position: "absolute",
          top: "3.5rem",
          right: "0.5rem",
          zIndex: 1,
          display: "none",
        }}
      />
      <div className="carousel">
        <input
          type="radio"
          name="model"
          value="onesie"
          className="carousel-item"
          style={{ backgroundImage: "url(./preview/onesie.png)" }}
          checked={selectedOutfit === "onesie"}
          onChange={(e) => handleOutfitChange(e.target.value)}
        />
        <input
          type="radio"
          name="model"
          value="jacket"
          className="carousel-item"
          style={{ backgroundImage: "url(./preview/jacket.png)" }}
          checked={selectedOutfit === "jacket"}
          onChange={(e) => handleOutfitChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OutfitSelector;
