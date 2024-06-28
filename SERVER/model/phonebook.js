// ./model/phonebook.js

const mongoose = require('mongoose');

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // assuming emails should be unique

    },
    rollno:{
        type:String,
        required: true,
        maxlength:10,
        minlength:10
    },
    Branch:
    {
        type:String,
        required:true,
    },
    phone: {
        type: String,
        required: true,
        maxlength:10,
        minlength:10
    }
});

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema);

module.exports = PhoneBook;
