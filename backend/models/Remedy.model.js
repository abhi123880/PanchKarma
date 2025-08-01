import mongoose from "mongoose";

const remedySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String },
  disease: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  preparationMethod: { type: [String], required: true },
  dosage: { type: String, required: true },
  duration: { type: String },
  benefits: { type: String, required: true },
  sideEffects: { type: String },
  precautions: { type: String, required: true },
  traditionalUse: { type: String },
  scientificEvidence: { type: String },
  storageInstructions: { type: String },
  relatedRemedies: { type: [String] },
  image_url: { type: String, required: true },
});

export default mongoose.model("Remedy", remedySchema);
