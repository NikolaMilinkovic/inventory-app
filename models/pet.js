const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: {type: String, required: true, minLength: 2, maxLength: 100},
});

PetSchema.virtual('url').get(function(){
    return `/catalog/pet/${this._id}`;
});

module.exports = mongoose.model("Pet", PetSchema);