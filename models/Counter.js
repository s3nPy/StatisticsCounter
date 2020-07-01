const { model, Schema} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    values: [Number],
    dates: [Date],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = new model('Counter', schema);