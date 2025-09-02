const mongoose = require('mongoose');
// Everything concerning models need to be in this folder and file
// Specify a schema for our data with schema-type-options for validations or default values
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, // Disallows two tour documents with the same name
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Create a model of the tourSchema schema. Model names to be capitalized.
const Tour = mongoose.model('Tour', tourSchema); // (model name, schema name)

module.exports = Tour;
