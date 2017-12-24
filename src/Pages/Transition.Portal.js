import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button, Header, Segment, TransitionablePortal, Embed } from 'semantic-ui-react';
import GithubTrends from "./Github.Trends";

import FacebookProvider, { Comments, Share } from 'react-facebook';

export default class TransitionablePortalExampleControlled extends Component {
    state = { open: false }

    handleClick = () => this.setState({ open: !this.state.open })

    handleClose = () => this.setState({ open: false })

    render() {
        const { open } = this.state;

        const styleC = {
            width: '500px',
            height: '400px'
        }

        const EmbedExampleCustom = () => (
            <Embed style={styleC}
                icon='right circle arrow'
                placeholder='/assets/images/image-16by9.png'
                url='https://gist.github.com/mushfiqweb/33c17e4353de65b264fd8cbe10e98eb9'
            />
        );

        return (
            <div>
                <Button
                    content={open ? 'Close Portal' : 'Open Portal'}
                    negative={open}
                    positive={!open}
                    onClick={this.handleClick}
                />

                <FacebookProvider appId="920812974736093">
                    <Comments className='ui segment green container' href="https://mushfiqweb.com/TransitionablePortalExampleControlled" />
                    <Share href="https://mushfiqweb.com/TransitionablePortalExampleControlled">
                        <button type="button">Share</button>
                    </Share>
                </FacebookProvider>

                <EmbedExampleCustom />

                <TransitionablePortal onClose={this.handleClose} open={open}>
                    <Segment style={{ left: '5%', position: 'relative', top: '5%' }}>
                        <Route path='/' component={GithubTrends} />
                    </Segment>
                </TransitionablePortal>
            </div>
        )
    }
}