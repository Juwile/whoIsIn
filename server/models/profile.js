const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema (not the same as graphql schema!), id not needed as automatically given by database

const profileSchema = new Schema({
    firstname: String,
    lastname: String,
    role: String,
    background: String,
    goals: String,
    absences: [Date]
})

module.exports = mongoose.model('Profile', profileSchema); // model = collection in Database