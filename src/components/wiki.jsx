import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';

class DBPedia extends React.Component {
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
        const search = steps.search.value;
        const endpoint = encodeURI('https://dbpedia.org');
        const query = encodeURI(`
      select * where {
      ?x rdfs:label "${search}"@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
      } LIMIT 100
    `);

        const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=${endpoint}&query=${query}&format=json`;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', readyStateChange);

        function readyStateChange() {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                const bindings = data.results.bindings;
                if (bindings && bindings.length > 0) {
                    self.setState({ loading: false, result: bindings[0].comment.value });
                } else {
                    self.setState({ loading: false, result: 'Not found.' });
                }
            }
        }

        xhr.open('GET', queryUrl);
        xhr.send();
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

DBPedia.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

export default DBPedia;