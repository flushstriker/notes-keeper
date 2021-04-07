const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String, 
        require: true,
        trim: true
    }
}, {
    timestamps: true
});
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;