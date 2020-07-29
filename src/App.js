import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }


    const handleUsernameChange = (event) => {
        console.log(event.target.value)
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(`logging with ${userName} ${password}`)
        try {

            const user = await loginService.login({ 'username': userName, 'password': password })
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUserName('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(`the note '${note.content}' was already deleted from the server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null
                ? <Togglable buttonLabel='login'>
                    <LoginForm
                        handleLogin={handleLogin}
                        userName={userName}
                        password={password}
                        handleUsernameChange={handleUsernameChange}
                        handlePasswordChange={handlePasswordChange}
                    />
                </Togglable>
                :
                <div>
                    <p>You are logged-in</p>
                    <Togglable buttonLabel='new note' ref={noteFormRef}>
                        <NoteForm createNote={addNote} />
                    </Togglable>
                </div>
            }
            <div>
                <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note, i) =>
                    <Note
                        key={i}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <Footer />
        </div>
    )
}

export default App