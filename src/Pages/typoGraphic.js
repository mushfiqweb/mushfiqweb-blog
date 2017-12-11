import React, { Component } from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

class TypoGraphic extends Component {

    state = {
        blogColor: 'brown',
        resumeColor: 'olive',
        loading: true
    }

    componentDidMount = () => {
        if (window.location.hostname != 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        var seconds = 10000 * Math.random();
        seconds = Math.floor(seconds) * new Date().getMonth();
        if (seconds % 11 === 0) { console.log(5); this.setState({ blogColor: 'red', resumeColor: 'black' }); }
        else if (seconds % 7 === 0) { console.log(7); this.setState({ blogColor: 'orange', resumeColor: 'yellow' }); }
        else if (seconds % 8 === 0) { console.log(8); this.setState({ blogColor: 'olive', resumeColor: 'green' }); }
        else if (seconds % 9 === 0) { console.log(9); this.setState({ blogColor: 'teal', resumeColor: 'blue' }); }
        else if (seconds % 6 === 0) { console.log(6); this.setState({ blogColor: 'violet', resumeColor: 'purple' }); }
        else if (seconds % 4 === 0) { console.log(4); this.setState({ blogColor: 'green', resumeColor: 'red' }); }
        else if (seconds % 3 === 0) { console.log(3); this.setState({ blogColor: 'black', resumeColor: 'orange' }); }
        else if (seconds % 2 === 0) { console.log(2); this.setState({ blogColor: 'blue', resumeColor: 'orange' }); }

        setTimeout(() => this.setState({ loading: false }), 1500);

    }

    getDangerousHTML = () => {

        let iframe = '<iframe src="https://www.supremo.tv/typeterms" width="100%" height="600"></iframe>';
        return { __html: iframe };
    }

    render() {
        return (
            <Segment color={this.state.resumeColor} style={{ minHeight: '65vh' }}>
                <Dimmer active={this.state.loading}>
                    <Loader size='large'>
                        working...
                        </Loader>
                </Dimmer>
                <div dangerouslySetInnerHTML={this.getDangerousHTML()} />
            </Segment>
        );
    }
}

export default TypoGraphic;

