import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import appConfig from '../config'

export default function Create() {
    useEffect(() => {
        console.log(`${appConfig.serverURL}/api/createRoom`)
        fetch(`${appConfig.serverURL}/api/createRoom`).then(res => res.json()).then((res) => {

            setId(res.id)
        })
    }, [])
    const [id, setId] = useState('')
    const [text] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState('')


    const idHandler = (e) => {
        setId(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault()
        setRedirect(true)

    }
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    if (redirect) {
        return (
            <Redirect to={{
                pathname: `/${id}`,
                name: name

            }} />)
    } else {
        return (
            <form className="previewForm">
                <h2>Create a room</h2>
                <div className="form-group">
                    <label>Room ID:</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={idHandler} value={id} placeholder="Enter room ID" disabled='disabled'></input>
                    {(text) ? <small id="emailHelp" className="form-text text-muted">Incorrect ID. Try again</small> : <small id="emailHelp" className="form-text text-muted"></small>}
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="name" className="form-control" aria-describedby="emailHelp" onChange={nameHandler} value={name} placeholder="Enter your nickname"></input>
                </div>
                <button type="submit" onClick={submit} className="btn btn-primary btn-bottom">Join this room</button>
                <p className="nullmargin">Join another room <Link to="/">here</Link></p>
            </form>
        )
    }
}