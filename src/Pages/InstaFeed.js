import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Divider, Item, Label, Icon } from 'semantic-ui-react';
import { fetchInstaPhotos, getAccentColor } from '../Actions/article.Actions';
import InstagramCompo from '../Components/InstagramComponent';

import ReactGA from 'react-ga';

class InstaFeed extends Component {
    state = {
        anime: 'fadeIn',
        headerColor: 'green'
    }

    componentDidMount = () => {
        this.props.fetchInstaPhotos();
        this.props.getAccentColor(this.props.accent);
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
    }
    render() {
        return (
            <div>
                <Segment color={this.props.accent} style={{ minHeight: '80vh', width: '69vmax', margin: '0 auto' }}>
                    <Dimmer active={this.props.loading && (this.props.InstaPhotos.length === 0)} inverted>
                        <Loader size='large'>
                            fetching instagram photos...
                        </Loader>
                    </Dimmer>

                    <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'space-evenly' }}>
                        {
                            this.props.InstaPhotos.length > 0 ? this.props.InstaPhotos.map(instaPhoto => {
                                return (
                                    <InstagramCompo key={instaPhoto.taken_at_timestamp} instaPhoto={instaPhoto} accent={this.props.accent} />
                                )
                            }) : ''
                        }
                    </div>
                    <Divider color='grey' />
                </Segment>
                <div style={{ display: 'block', height: '35px', marginTop: '32px' }}>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        InstaPhotos: state.articleStore.InstaPhotos,
        loading: state.articleStore.loading,
        accent: state.articleStore.AppAccentColor
    }
}

export default connect(mapStateToProps, { getAccentColor, fetchInstaPhotos })(InstaFeed);

