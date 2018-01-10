import Header from "./header.jsx"
import React from 'react';
const divStyle = {
  "display":"flex",
  "justifyContent":"center",
  "width":"100%"
};
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {name: "Home"};
    }
    handleChange(e) {
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <div style={divStyle}>
                <img src="https://pbs.twimg.com/profile_images/513366402833465344/Qe0MWT5x_normal.png" height="300" align="middle"/>
            </div>
        );
    }
}
export default Home;
