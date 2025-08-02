import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RemedyCard from "./RemedyCard";
import { useAuth } from "../context/AuthContext";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/Home.css";

export function Hero() {
  return (
    <section className="hero-section" aria-label="Homepage Hero Section">
      <img
        src="/Ayurveda.png"
        //src="https://media.istockphoto.com/id/1349182014/photo/herbal-tea.jpg?s=612x612&w=0&k=20&c=YdnuQs5IXYrufKIwi91snRSs5zUn0G7wvxpNnStSOfw="
        alt="Natural Ayurvedic herbs and remedies display"
        className="hero-image"
      />
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Ayurveda Healing</h1>
        <p className="hero-subtitle">
          Discover natural and home-based Ayurvedic remedies for holistic health and wellness.
        </p>
      </div>
    </section>
  );
}

function RemediesGrid({ remedies, onCardClick }) {
  if (!remedies.length) {
    return <p className="no-remedies">No remedies found.</p>;
  }
  return (
    <section className="remedies-grid" aria-label="List of Ayurvedic remedies">
      {remedies.map((remedy) => (
        <RemedyCard key={remedy.id} remedy={remedy} onSelect={() => onCardClick(remedy)} />
      ))}
    </section>
  );
}

export default function Home({ searchQuery = "" }) {
  const { user } = useAuth();
  const [remediesData, setRemediesData] = useState([]);
  const [filteredRemedies, setFilteredRemedies] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5);
  const navigate = useNavigate();
  const prevScrollTop = useRef(0);

  useEffect(() => {
    fetch('https://panchkarma.onrender.com/api/remedies')
      .then((response) => response.json())
      .then((data) => {
        setRemediesData(data);
        setFilteredRemedies(data);
        setItemsToShow(5);
      })
      .catch((err) => {
        console.error('Error fetching remedies:', err);
      });
  }, []);

  useEffect(() => {
    let result = remediesData;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((rem) =>
        rem.name.toLowerCase().includes(query) || rem.disease.toLowerCase().includes(query)
      );
    }
    setFilteredRemedies(result);
    setItemsToShow(5);
  }, [searchQuery, remediesData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;

      const increment = window.innerWidth <= 600 ? 3 : 5;
      const minItemsToShow = window.innerWidth <= 600 ? 3 : 5;
      if (windowHeight + scrollTop >= docHeight - 100 && itemsToShow < filteredRemedies.length) {
        setItemsToShow((prev) => Math.min(prev + increment, filteredRemedies.length));
      }
      if (scrollTop < prevScrollTop.current && itemsToShow > minItemsToShow) {
        setItemsToShow((prev) => Math.max(prev - increment, minItemsToShow));
      }

      prevScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemsToShow, filteredRemedies]);

  const handleRemedyClick = (remedy) => {
    if (user && typeof user === "object" && Object.keys(user).length > 0) {
      navigate(`/remedy/${remedy.id}`);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <main>
      <Hero />
      <RemediesGrid remedies={filteredRemedies.slice(0, itemsToShow)} onCardClick={handleRemedyClick} />
      <ScrollToTopButton />
    </main>
  );
}
