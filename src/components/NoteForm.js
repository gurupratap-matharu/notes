import React from 'react'

const NoteForm = (props) => (
    <form onSubmit={props.addNote}>
        <input type="text" value={props.newNote} onChange={props.handleNoteChange} />
        <button type="submit">Save</button>
    </form>
)

export default NoteForm