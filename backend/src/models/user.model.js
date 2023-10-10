const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    tg_id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    test_ids: {
        type: Array,
        required: true,
        default: []
    }
})

UserSchema.index({ tg_id: 1 })

module.exports = mongoose.model('Users', UserSchema)