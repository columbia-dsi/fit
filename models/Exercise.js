/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        type: String,
        group: String, 
        name: String,
        link: String,
        level: String
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var Exercise = mongoose.model('Exercise', schema, 'exercise');

module.exports = Exercise;