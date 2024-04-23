const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true, minLength: 2, maxLength: 100},
    password: {type: String, required: true, minLength: 2, maxLength: 100}
});

// UserSchema.virtual('url').get(function(){
//     return `/catalog/pet/${this._id}`;
// });

module.exports = mongoose.model("User", UserSchema);