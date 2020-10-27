import React from "react"
import { withRouter, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client';
import Message from './Message'
import appConfig from '../config'

const socket = openSocket(appConfig.serverURL)



class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            message: '',
            name: this.props.location.name || 'Undefined user',
            chat: [],
            scroolRef: React.createRef(),

        }

    }
    async getChat() {
        fetch(`${appConfig.serverURL}/api/sendMess?id=${this.props.match.params.id}`).then((res) => res.json()).then((res) => this.setState({ chat: res.received }))
    }
    componentWillUnmount() {
        socket.emit('disconnect')
    }
    componentDidMount() {


        this.getChat()
        socket.on('room-connect', (name) => {
            console.log(name, 'connected')
            let chat = this.state.chat
            chat.push({ name: name, emptyLine: true })
            this.setState({ chat: chat })
        })
        socket.on('chat message', (msg, name) => {
            let chat = this.state.chat
            const config = {
                name: name,
                value: msg,
                date: new Date()
            }
            chat.push(config)

            this.setState({ chat: chat })




        })

        socket.emit('room-connect', this.state.name, this.state.id)

    }

    handleMessage(e) {
        this.setState({ message: e.target.value })
    }
    submit(e) {
        e.preventDefault()
        socket.emit('chat message', this.state.message, this.props.match.params.id, this.props.location.name)
        this.setState({ message: '' })
    }
    logOut() {
        this.setState({ id: '' })
    }
    render() {
        if (this.props.location.name && this.state.id) {
            return (
                <main>
                    <div className="mainInfo">
                        <div className="idInfo">
                            <h4>You  are logged as a {this.props.location.name} </h4>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={this.logOut.bind(this)}>Out</button>
                    </div>
                    <div className="chatTable">
                        <div className="chat" id="chat" ref={this.state.scroolRef}>

                            {this.state.chat.map((elem, index) => {
                                if (elem.emptyLine) {
                                    return (
                                        <div key={index} className="chatLine center"><div className="new-connection"><p>{elem.name} connected to this room</p></div></div>
                                    )

                                }
                                else if (elem.name === this.props.location.name) {
                                    return (
                                        <Message index={index} key={index} name={elem.name} value={elem.value} date={elem.date} position={0} />
                                    )
                                } else {
                                    return (

                                        <Message index={index} key={index} name={elem.name} value={elem.value} date={elem.date} position={1} />
                                    )

                                }
                            })}
                        </div>



                        <div className="controls">
                            <form onSubmit={this.submit.bind(this)} className="senderForm">
                                <input type="text" className="form-control" onChange={this.handleMessage.bind(this)} value={this.state.message} placeholder="Write a message"></input>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </main >


            )
        } else {
            return (
                <Redirect to="/" />)

        }

    }
}

export default withRouter(Chat)