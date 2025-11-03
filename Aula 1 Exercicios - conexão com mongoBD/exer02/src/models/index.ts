import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema District (será um subdocumento) [cite: 724]
const DistrictSchema = new Schema({
  name: {
    type: String,
    maxlength: 30, // [cite: 709]
    required: [true, "O nome (name) do bairro é obrigatório"],
  },
});

// Esquema City (será um subdocumento) [cite: 724]
const CitySchema = new Schema({
  name: {
    type: String,
    maxlength: 30, // [cite: 705]
    required: [true, "O nome (name) da cidade é obrigatório"],
  },
  districts: [DistrictSchema], // districts é subdocumento de city [cite: 724]
});

// Esquema State (Modelo principal)
const StateSchema = new Schema({
  name: {
    type: String,
    maxlength: 20, // [cite: 704]
    unique: true, // Apenas o nome do State não aceita repetidos [cite: 725]
    required: [true, "O nome (name) do estado é obrigatório"],
  },
  cities: [CitySchema], // cities é subdocumento de state [cite: 724]
});

// Compila APENAS o modelo principal
const State = mongoose.model("State", StateSchema);

export { State };