import React from 'react'

export default function Message(props) {
    if (props.position) {
        return (
            <div key = {props.index} className="chatLine left">
                <div className="message messageRight">
                    <label className='nameLabel'>{props.name}</label>
                    <p>{props.value}</p>
                    <label className="dateLabel">{new Date(props.date).toLocaleTimeString()}</label>
                </div>
            </div>
        )
    } else {
        return (
            <div key = {props.index} className="chatLine right">
                <div className="message messageLeft">
                    <label className='nameLabel'>{props.name}</label>
                    <p>{props.value}</p>
                    <label className="dateLabel">{new Date(props.date).toLocaleTimeString()}</label>
                </div>
            </div>
        )
    }

}