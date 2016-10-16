const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
