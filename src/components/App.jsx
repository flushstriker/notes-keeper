import React from "react"
import Header from "./Header"   
import Footer from "./Footer"
// import Seed from "./seed"
import Note from "./Note"
import CreateArea from "./CreateArea"
// import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from "axios"

function App(){
    const [notes, setNotes] = React.useState([]);

    React.useEffect(()=>{
        axios.get('http://localhost:3001/user')
        .then(res=>{
            const entry = res.data;
            setNotes(()=>{
                return [...entry];
            })
        })
        .catch(err =>{
            console.log("Error: "+err);
        })
    }, [])


    function addNote(newNote){
        axios.post('http://localhost:3001/user', newNote);
        // The following get request is necessary to make sure we get the mongoB id too to order to make the note
        axios.get('http://localhost:3001/user')
        .then(res=>{
            setNotes(()=>{
                return [...res.data];
            })
        })
        .catch(err=>{
            console.log("Error: "+err);
        })
    }
    function deleteNote(id){

        axios.delete(`http://localhost:3001/user/${id}`);

        axios.get('http://localhost:3001/user')
        .then(res=>{
            setNotes(()=>{
                return [...res.data];
            })
        })
        .catch(err=>{
            console.log("Error: "+err);
        })
    }
    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />

            {notes.map((noteItem)=>{
                return <Note key={noteItem._id} index={noteItem._id} title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
            })}

            <Footer />
        </div>
    )
}
export default App;