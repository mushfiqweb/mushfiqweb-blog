import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react';

import TwitterTimeline from '../twitter.widget';

export default class MyTweets extends Component {
    render() {
        return (
            
                <Segment color='purple' style={{ minHeight: '50vh' }}>
                    <TwitterTimeline />
                </Segment >
            
        )
    }
}
