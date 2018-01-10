import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';

class Wit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            result: '',
            trigger: false,
        };

        this.triggetNext = this.triggetNext.bind(this);
    }

    componentWillMount() {
        const self = this;
        const { steps } = this.props;
        const search = encodeURI(steps.search.value);

        const queryUrl = location.origin+"/witbot";

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', readyStateChange);

        function readyStateChange() {
            if (this.readyState === 4) {
                const data = this.responseText;
                if (data) {
                    self.setState({ loading: false, result: data });
                } else {
                    self.setState({ loading: false, result: 'Not found.' });
                }
            }
        }

        xhr.open('POST', queryUrl,true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({"message":search}));
    }

    triggetNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    render() {
        const { trigger, loading, result } = this.state;

        return (
            <div className="dbpedia">
                { loading ? <Loading /> : result }
                {
                    !loading &&
                    <div style={{textAlign: 'center',marginTop: 20,}}>
                        {
                            !trigger && <button style={{ backgroundColor:"#6e48aa", color:"white", height:"30px", borderRadius:"6px"}} onClick={() => this.triggetNext()}>Ask Again</button>
                        }
                    </div>
                }
            </div>
        );
    }
}

Wit.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

Wit.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

export default Wit;