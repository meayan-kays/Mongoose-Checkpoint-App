const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var personSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    age : Number,
    favoriteFoods : [String]
})

module.exports = Person = mongoose.model('person', personSchema)