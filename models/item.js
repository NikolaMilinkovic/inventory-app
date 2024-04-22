const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, minLength: 2, maxLength: 30},
    description: {type: String, required: true, minLength: 2, maxLength: 200},
    price: {type: Number, required: true},
    inStock: {type: Number, required: true},
    for: [{type: Schema.Types.ObjectId, ref: "Pet"}],
    category: [{type: Schema.Types.ObjectId, ref: "Category"}],
});

ItemSchema.virtual('url').get(function(){
    return `item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);