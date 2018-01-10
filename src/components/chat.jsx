import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Wit from "./wit.jsx";
const divStyle = {
    "display":"flex",
    "justifyContent":"center",
    "width":"100%"
};

const steps = [
    {
        id: '0',
        message: 'Welcome to Witbot! Ask a question!!',
        trigger: 'search',
    },
    {
        id: 'search',
        user: true,
        trigger: '2',
    },
    {
        id: '2',
        component: <Wit />,
        waitAction: true,
        trigger: '0',
    }
];

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ steps, values }) {
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <div style={divStyle}>
                <ChatBot steps={steps} headerTitle="WitBot" recognitionEnable={true} handleEnd={this.handleChange} botDelay={500} userDelay={100}/>
            </div>
        );
    }
}

export default Chat;
