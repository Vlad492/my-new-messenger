import React from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import appConfig from '../config'
export default function Find() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [text, setText] = useState(false)
    const [correctID, setCorrectID] = useState(false)


    const idHandler = (e) => {
        setId(e.target.value)
    }
    const nameHandler = (e) => {
        setName(e.target.value)
        console.log(name)
    }
    const submit = (e) => {
        e.preventDefault()
        let config = { id, name }
        console.log(config)

        fetch(`${appConfig.serverURL}/api/connectToRoom/${config.id}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log('found')
                    setText(false)
                    setCorrectID(true)

                } else {
                    console.log('not found')
                    setText(true)
                }
            })

    }


    if (correctID) {
        return (
            <Redirect to={{
                pathname: `/${id}`,
                name : name

            }} />
        )
    } else {
        return (
            <form className="previewForm">
                <h2>Find a room</h2>
                <div className="form-group">
                    <label>Room ID:</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={idHandler} value={id} placeholder="Enter room ID"></input>
                    {(text) ? <small id="emailHelp" className="form-text text-muted">Incorrect ID. Try again</small> : <small id="emailHelp" className="form-text text-muted"></small>}
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="name" className="form-control" aria-describedby="emailHelp" onChange={nameHandler} value={name} placeholder="Enter your nickname"></input>
                </div>
                <button type="submit" onClick={submit} className="btn btn-primary btn-bottom">Submit</button>
                <p className="nullmargin">Dont have a room? Create it <Link to="/create">here</Link></p>
            </form>
        )
    }
}