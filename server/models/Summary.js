const mongoose = require('mongoose');
const { Schema } = mongoose;

const SummarySchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    summary: String,
});

const SummaryModel = mongoose.model('Summary', SummarySchema);

module.exports = SummaryModel;





