import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema Person
const PersonSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    unique: true,
    required: [true, "O nome (name) é obrigatório"],
  },
});

// Esquema Car
const CarSchema = new Schema({
  model: {
    type: String,
    maxlength: 15,
    unique: true,
    required: [true, "O modelo (model) é obrigatório"],
  },
});

// Modelos precisam ser declarados antes de serem usados nas validações
const Person = mongoose.model("Person", PersonSchema);
const Car = mongoose.model("Car", CarSchema);

// Esquema Phone
const PhoneSchema = new Schema({
  idpeople: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
    validate: {
      validator: async function (id: string) {
        const person = await Person.findById(id);
        return !!person;
      },
      message: "A pessoa (idpeople) fornecida não existe",
    },
  },
  number: {
    type: String,
    match: [/^[0-9]{11}$/, "O número deve ter exatamente 11 dígitos numéricos"],
    required: [true, "O número (number) é obrigatório"],
  },
});

// Esquema CarByPerson
const CarByPersonSchema = new Schema({
  idcar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
    validate: {
      validator: async function (id: string) {
        const car = await Car.findById(id);
        return !!car;
      },
      message: "O carro (idcar) fornecido não existe",
    },
  },
  idpeople: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
    validate: {
      validator: async function (id: string) {
        const person = await Person.findById(id);
        return !!person;
      },
      message: "A pessoa (idpeople) fornecida não existe",
    },
  },
});

// Compila os outros modelos
const Phone = mongoose.model("Phone", PhoneSchema);
const CarByPerson = mongoose.model("CarByPerson", CarByPersonSchema);

export { Person, Car, Phone, CarByPerson };