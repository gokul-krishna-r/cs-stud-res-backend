const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Scheme defines structure
const noteSchema = new Schema({
    title: {type: String, required: true},
    sem: {type: String,required:true},
    sub: {type:String,required:true},
    module:{type:String,required:true},
    category:{type:String,required:true},
    link: {type:String,required:true},
    

},{timestamps:true});

//Model creates an interface to connect with Database

const NoteModel= mongoose.model("Note",noteSchema);

module.exports = NoteModel;