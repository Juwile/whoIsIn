const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema (not the same as graphql schema!)
const projectSchema = new Schema({
    title: String,
    status: String,
    effort: Number,
    created: String,
    due: String,
    profileId: String
})

module.exports = mongoose.model('Project', projectSchema); // model = collection in Database
