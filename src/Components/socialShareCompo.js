import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Segment, Header, Divider, Label } from 'semantic-ui-react'
import {
    ShareButtons,
    ShareCounts,
    generateShareIcon
} from 'react-share';

class SocialShareCompo extends Component {

    render() {

        const {
            FacebookShareButton,
            GooglePlusShareButton,
            LinkedinShareButton,
            TwitterShareButton,
            PinterestShareButton,
            RedditShareButton,
            
            EmailShareButton
        } = ShareButtons;

        const {
            FacebookShareCount,
            GooglePlusShareCount,
            LinkedinShareCount,
            PinterestShareCount,
            RedditShareCount
        } = ShareCounts;
        const FacebookIcon = generateShareIcon('facebook');
        const TwitterIcon = generateShareIcon('twitter');
        const GooglePlusIcon = generateShareIcon('google');
        const LinkedinIcon = generateShareIcon('linkedin');
        const PinterestIcon = generateShareIcon('pinterest');
        const RedditIcon = generateShareIcon('reddit');        
        const EmailIcon = generateShareIcon('email');


        const subject = "Read mushfiqWEB.com's Article On " + this.props.metaTitle;
        const body = this.props.metaDescription + "<h4><strong><span style='font-size: 18px;'>Read more:</span></strong></h4><a href='" + this.props.metaUrl + "'> " + this.props.metaUrl + "</a>";

        return (
            <div>
                <Segment style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', justifyContent: 'center', textAlign: 'center' }} color={this.props.accent}>
                    <div>
                        <Header size='medium'>Spread the love!</Header>
                        <Divider />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                        <div className='share-btn-div' title='Share on Facebook'>
                            <FacebookShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl}
                                quote={this.props.metaTitle}>
                                <FacebookIcon size={32} />
                            </FacebookShareButton>

                            <Label style={{ backgroundColor: '#3b5999' }} className='share-counter-text'>
                                <FacebookShareCount
                                    url={this.props.metaUrl}>
                                    {count => count}
                                </FacebookShareCount>
                            </Label>

                        </div>

                        <div className='share-btn-div' title='Tweet it!'>
                            <TwitterShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl}
                                title={this.props.metaTitle} via='mushfiqweb'>

                                <TwitterIcon size={32} />
                            </TwitterShareButton>
                        </div>

                        <div className='share-btn-div' title='Post on Google Plus'>
                            <GooglePlusShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl}
                                quote={this.props.metaTitle}>
                                <GooglePlusIcon
                                    size={32}
                                />
                            </GooglePlusShareButton>

                            <Label style={{ backgroundColor: '#dd4b39' }} className='share-counter-text'>
                                <GooglePlusShareCount
                                    url={this.props.metaUrl}>
                                    {count => count}
                                </GooglePlusShareCount>
                            </Label>

                        </div>

                        <div className='share-btn-div' title='Post on LinkedIn'>
                            <LinkedinShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl}
                                title={this.props.metaTitle} description={this.props.metaDescription}>
                                <LinkedinIcon
                                    size={32}
                                />
                            </LinkedinShareButton>

                            <Label style={{ backgroundColor: '#0077B5' }} className='share-counter-text'>
                                <LinkedinShareCount
                                    url={this.props.metaUrl}>
                                    {count => count}
                                </LinkedinShareCount>
                            </Label>

                        </div>

                        <div className='share-btn-div' title='Pint it!'>
                            <PinterestShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl} media={this.props.metaImage}
                                description={this.props.metaTitle}>
                                <PinterestIcon
                                    size={32}
                                />
                            </PinterestShareButton>

                            <Label style={{ backgroundColor: '#bd081c' }} className='share-counter-text'>
                                <PinterestShareCount
                                    url={this.props.metaUrl}>
                                    {count => count}
                                </PinterestShareCount>
                            </Label>

                        </div>

                        <div className='share-btn-div' title='Share on Reddit'>
                            <RedditShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl}
                                title={this.props.metaTitle}>
                                <RedditIcon
                                    size={32}
                                />
                            </RedditShareButton>

                            <Label style={{ backgroundColor: '#5f99cf' }} className='share-counter-text'>
                                <RedditShareCount
                                    url={this.props.metaUrl}>
                                    {count => count}
                                </RedditShareCount>
                            </Label>

                        </div>

                        <div className='share-btn-div' title='Send anyone as email'>
                            <EmailShareButton className='share-btn-margin pulse'
                                url={this.props.metaUrl} body={body}
                                subject={subject}>
                                <EmailIcon
                                    size={32}
                                />
                            </EmailShareButton>
                        </div>

                    </div>
                </Segment>
            </div>
        );
    }
}

SocialShareCompo.propTypes = {
    metaTitle: PropTypes.string,
    metaUrl: PropTypes.string,
    metaDescription: PropTypes.string,
    metaImage: PropTypes.string,
    accent: PropTypes.string,
};

export default SocialShareCompo;