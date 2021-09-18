const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema (not the same as graphql schema!), id not needed as automatically given by database

const sprintSchema = new Schema({
    number: Number,
    activeSprint: String,
    workDays: Number,
    startDate: Date,
    endDate: Date,
})

module.exports = mongoose.model('Sprint', sprintSchema); // model = collection in Database