import React from "react";
import "../styles/RemedyCard.css";

export default function RemedyCard({ remedy, onSelect }) {
  const handleKey = (e) => {
    if (e.key === "Enter") onSelect(remedy);
  };

  return (
    <article
      className="remedy-card"
      role="button"
      tabIndex="0"
      onClick={() => onSelect(remedy)}
      onKeyDown={handleKey}
      aria-label={`View details for ${remedy.name}`}
    >
      <img
        src={remedy.image_url}
        alt={remedy.name}
        loading="lazy"
        className="remedy-card-image"
      />
      <h3 className="remedy-card-title">{remedy.name}</h3>

      <p className="remedy-card-disease">
        <strong>Disease:</strong> {remedy.disease}
      </p>

      <p className="remedy-card-desc">{remedy.description}</p>
    </article>
  );
}
