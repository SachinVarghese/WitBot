import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from "./components/home.jsx";
import Chat from "./components/chat.jsx";
import Header from "./components/header.jsx";
import "./css/main.css"

const divStyle= {display:"flex"};
const Welcome = () => (
    <Router>
        <div>
            <div className="navbar" style={divStyle}>
                <p><Link to="/">Home</Link></p>
                <p><Link to="/chat">Chat</Link></p>
            </div>
            <Header name="WitBot"/>
            <Route exact path="/" component={Home}/>
            <Route path="/chat" component={Chat}/>
        </div>
    </Router>
)

ReactDOM.render(<Welcome/>, document.getElementById('app'));