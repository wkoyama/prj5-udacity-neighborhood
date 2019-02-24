import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ContactList extends Component {
    render(){
        const people = [
            {"name": "Michael"},
            {"name": "Ryan"},
            {"name": "Tropa"}
        ]

        return <ol>
            {people.map(person => (
                <li key="{person.name}">{person.name}</li>
            ))}
        </ol>
    }
}

ReactDOM.render(
    <ContactList/>,
    document.getElementById("root")
);

var model = {}
var octopus = {}
var view = {}
