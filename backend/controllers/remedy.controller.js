import Remedy from "../models/Remedy.model.js";

  // Get all remedies
  export const getAllRemedies = async (req, res) => {
    try {
      const remedies = await Remedy.find();
      res.json(remedies);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // Get a single remedy by ID
  export const getRemedyById = async (req, res) => {
    try {
      const remedy = await Remedy.findOne({ id: req.params.id });
      if (!remedy) {
        return res.status(404).json({ message: "Remedy not found" });
      }
      res.json(remedy);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };