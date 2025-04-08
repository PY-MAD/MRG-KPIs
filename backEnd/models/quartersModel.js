const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quarterSchema = new Schema({
    year: {
        required: true,
        type: Number
    },
    quarter: {
        required: true,
        type: String, // مثل 'Q1'
        enum: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    months: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Quarter', quarterSchema);