const express = require('express');
const Route = express.Router();
const Note = require('../models/note');

Route.get('/', async(req, res)=>{
    const notes = await Note.find({})
    // console.log(notes);
    res.send(notes);
})

Route.post('/', async(req, res)=>{
    var {title, content} = req.body;
    // const content = req.body.content;
    const newNote = new Note({title, content});
    await newNote.save();
    //res.redirect('/user');
    res.send(newNote);
})

Route.delete('/:id', async(req, res)=>{
    // await Note.deleteMany({});
    const {id} = req.params;
    console.log(id);
    await Note.findByIdAndDelete(id);
    res.send(`${id}`);
})
module.exports = Route;