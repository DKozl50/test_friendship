const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
})

const counterModel = mongoose.model('counter', CounterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
    counterModel.findByIdAndUpdate(
        modelName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    )
        .then((res) => {
            doc.id = res.seq;
            next();
        })
        .catch((error) => {
            return next(error);
        })

}

module.exports = autoIncrementModelID;