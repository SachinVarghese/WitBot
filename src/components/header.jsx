import React from 'react';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name};
    }
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>WitBot</h1>
            </div>
        );
    }
}
export default Header;
