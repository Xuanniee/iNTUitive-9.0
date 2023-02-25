const mongoose = require('mongoose');
const { Schema } = mongoose;

const SummarySchema = new Schema({
    title: String,
    summary: String,
});

const SummaryModel = mongoose.model('Summary', SummarySchema);

module.exports = SummaryModel;





