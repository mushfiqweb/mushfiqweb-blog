import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Divider, Item, Label, Icon } from 'semantic-ui-react';
import { getAccentColor } from '../Actions/article.Actions';
import { fetchGithubTrends } from '../Actions/github.Actions';
import GithubRepoComponent from '../Components/githubRepo.Component';

import ReactGA from 'react-ga';

class GithubTrends extends Component {


    state = {
        anime: 'fadeIn',
        headerColor: 'green'
    }



    componentDidMount = () => {
        this.props.getAccentColor(this.props.accent);
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }

        if (this.props.repositories.length === 0) {
            this.props.fetchGithubTrends(5, 0);
        }
    }


    render() {

        return (
            <div>

                <Segment color={this.props.accent} style={{ minHeight: '80vh', margin: '0 auto' }}>

                    <Dimmer active={this.props.loading} inverted>
                        <Loader size='large'>
                            fetching repositories...
                        </Loader>
                    </Dimmer>

                    <div style={{ margin: '0 auto', display: 'table' }}>
                        {
                            this.props.repositories.length > 0 ? this.props.repositories.map(repo => {
                                return (
                                    <div className='git-shadow'>
                                        <GithubRepoComponent key={repo.href} repo={repo} accent={this.props.accent} />                                        
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                </Segment>
                <div style={{ display: 'block', height: '35px', marginTop: '32px' }}>

                </div>

            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        repositories: state.githubStore.repositories,
        loading: state.githubStore.loading,
        accent: state.articleStore.AppAccentColor
    }
}

export default connect(mapStateToProps, { fetchGithubTrends, getAccentColor })(GithubTrends);

