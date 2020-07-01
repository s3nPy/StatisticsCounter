const { model, Schema} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [ {type: Schema.Types.ObjectId, ref: 'Counter'} ]
});

module.exports = new model('User', schema);