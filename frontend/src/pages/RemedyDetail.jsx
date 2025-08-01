import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/RemedyDetail.css";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function RemedyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remedy, setRemedy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/remedies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRemedy(data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading remedy data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <main className="remedy-detail-loading" aria-busy="true">
        Loading...
      </main>
    );
  if (!remedy)
    return (
      <main className="remedy-detail-error" role="alert">
        Remedy not found.
      </main>
    );

  return (
    <>
      <div className="top-bar-container">
        <button
          onClick={() => navigate("/")}
          className="remedy-detail-back-btn-top"
          aria-label="Go back"
        >
          &larr; Back to List
        </button>
      </div>
      <div className="remedy-detail-split">
        <div className="remedy-detail-image-pane">
          {remedy.image_url && (
            <img
              src={remedy.image_url}
              alt={remedy.name ? `Image of ${remedy.name}` : "Remedy image"}
              className="remedy-detail-image"
              loading="lazy"
            />
          )}
        </div>
        <div className="remedy-detail-content-pane">
          <h1 className="remedy-detail-title">{remedy.name}</h1>
          <p className="remedy-detail-disease">
            <strong>Diseases:</strong> {remedy.disease || "Not specified"}
          </p>
          <DetailSection title="Description" content={remedy.description} />
          <DetailSection title="Ingredients" list={remedy.ingredients} isList />
          <DetailSection title="Preparation Method" list={remedy.preparationMethod} isList />
          <DetailSection title="Dosage" content={remedy.dosage} />
          <DetailSection title="Benefits" content={remedy.benefits} />
          <DetailSection title="Side Effects" content={remedy.sideEffects} />
          <DetailSection title="Precautions" content={remedy.precautions} />
           <DetailSection title="Traditional Use" content={remedy.traditionalUse} />
           <DetailSection title="Storage Instructions" content={remedy.storageInstructions} />

        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}

function DetailSection({ title, content, list, isList, ordered }) {
  if (isList && Array.isArray(list) && list.length > 0) {
    const ListTag = ordered ? "ol" : "ul";
    return (
      <section className="remedy-detail-section">
        <h2 className="remedy-detail-section-title">{title}</h2>
        <ListTag className="remedy-detail-list">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      </section>
    );
  }

  return (
    <section className="remedy-detail-section">
      <h2 className="remedy-detail-section-title">{title}</h2>
      <p className="remedy-detail-section-content">
        {content || "Not available"}
      </p>
    </section>
  );
}