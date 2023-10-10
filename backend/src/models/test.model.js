const mongoose = require('mongoose')
const autoIncrementModelID = require("./counter.model");

const TestSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    owner_tg_id: {
        type: Number,
        required: true
    },
    questions: {
        type: Array,
        required: true,
        default: []
    },
    results: {
        type: Array,
        required: true,
        default: []
    },
    date_of_creation: {
        type: Date,
        required: true,
        default: new Date()
    }
})

TestSchema.index({ id: 1 })

TestSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('tests', this, next);
});

module.exports = mongoose.model('Tests', TestSchema)