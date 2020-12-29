/**
 * Models are fancy constructors compiled from our Schema definitions. 
 * Instances of these models represent 
 * 
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {   
        name: String, 
        email: String,
        feedbacks: String,
        goal: String,
        time: String,
        level: String
    }
);

//Mongoose#model(name, [schema], [collection], [skipInit])
var Answer = mongoose.model('Answer', schema, 'answers');

module.exports = Answer;