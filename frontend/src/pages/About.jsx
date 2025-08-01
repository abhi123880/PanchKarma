import '../styles/About.css';
import ScrollToTopButton from "../components/ScrollToTopButton";

const About = () => {
  return (
    <>
      <div className="about-container">
        <h1 className="about-title">
          🌿 The Essence of Panchkarma Medicine
        </h1>

        <section className="about-section">
          <h2>💡 Ancient Wisdom, Modern Relevance</h2>
          <p>
            Panchkarma medicine is not just a remedy — it's a revival of a 5000-year-old science that heals from the inside out.
            Rooted in Ayurveda, Panchkarma medicines go beyond symptom control. They cleanse, balance, and rebuild your body's natural systems.
          </p>
        </section>

        <section className="about-section">
          <h2>🔬 What Makes It Different?</h2>
          <p>
            Unlike conventional treatments that suppress symptoms, Panchkarma medicines are crafted to <strong>eliminate toxins</strong>, 
            <strong>restore doshic balance (Vata, Pitta, Kapha)</strong>, and <strong>revitalize tissues</strong> (Dhatus). Their power lies in:
          </p>
          <ul className="about-list">
            <li>Deep detoxification through herbal compounds</li>
            <li>Natural enhancement of immunity and vitality</li>
            <li>Personalized formulations for unique constitutions</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🌿 Heroes of the Herb Cabinet</h2>
          <p>Here are some legendary Ayurvedic medicines used in Panchkarma support:</p>
          <ul className="about-list">
            <li><strong>Triphala:</strong> The gentle yet powerful detoxifier</li>
            <li><strong>Guggulu:</strong> The fat-mobilizing resin for joints and metabolism</li>
            <li><strong>Dashmoola:</strong> The anti-inflammatory root blend</li>
            <li><strong>Brahmi Ghrita:</strong> A medicated ghee for memory and nervous system balance</li>
            <li><strong>Pippali Rasayana:</strong> Rejuvenator for lungs and immunity</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🧪 How Is It Taken?</h2>
          <p>
            Panchkarma medicines are administered <strong>before</strong>, <strong>during</strong>, and <strong>after</strong> the cleansing process.
            They can be taken as:
          </p>
          <ul className="about-list">
            <li>💧 Herbal decoctions or teas</li>
            <li>🧈 Medicated oils and ghee (internally and externally)</li>
            <li>🌿 Powdered churna or capsules</li>
            <li>👃 Nasal drops (Nasya) and enemas (Basti)</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🔒 Purity You Can Trust</h2>
          <p>
            All our Panchkarma formulations are made using ethically sourced herbs, purified minerals, and cold-processed oils — 
            ensuring <strong>zero toxins</strong> and <strong>maximum potency</strong>. Every medicine is backed by classical texts and tested for safety and efficacy.
          </p>
        </section>

        <section className="about-section">
          <h2>💬 Final Thought</h2>
          <p>
            Panchkarma medicine is a path — not a pill. It’s designed to realign your body with nature’s rhythms. 
            Through targeted formulations and centuries-old techniques, we help you heal at your roots and flourish in balance.
          </p>
        </section>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default About;
