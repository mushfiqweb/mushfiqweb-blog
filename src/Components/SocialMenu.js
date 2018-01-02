import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react';
import { SocialLinks } from '../Utils/constants';

const socialIconSize = 'small';

export default function SocialMenu({ accent }) {
    const menuFixedRow = {
        borderTop: '1px solid',
        borderTopColor: accent,
        boxShadow: '0px 3px 5px rgba(8, 7, 7, 0.2)',
        padding: '10px 0px 10px 0px',
        left: '0',
        top: 'auto',
        bottom: '0',
        position: 'fixed',
        zIndex: '101',
        margin: '0 auto',
        background: '#FFF',
        width: '99vw',
        textAlign: 'center'
    };
    return (
        <div style={menuFixedRow}>
            <Link to={SocialLinks.facebook} target='_blank' >
                <Icon name='facebook' title='View Facebook' color={accent} size={socialIconSize} className='pulse' />
            </Link>

            <Link to={SocialLinks.twitter} target='_blank' >
                <Icon name='twitter' color={accent} size={socialIconSize} className='pulse' title='View Tweets' />
            </Link>

            <Link to={SocialLinks.stackOverFlow} target='_blank' >
                <Icon name='stack overflow' size={socialIconSize} color={accent} className='pulse' title='View StackOverflow' />
            </Link>

            <Link to={SocialLinks.github} target='_blank' >
                <Icon name='github' size={socialIconSize} color={accent} className='pulse' title='View Repositories' />
            </Link>

            <Link to={SocialLinks.instagram} target='_blank' >
                <Icon name='instagram' color={accent} size={socialIconSize} className='pulse' title='View Instagram' />
            </Link>

            <Link to={SocialLinks.flickr} target='_blank' >
                <Icon name='flickr' size={socialIconSize} color={accent} className='pulse' title='View Photos' />
            </Link>

            <Link to={SocialLinks.gplus} target='_blank' >
                <Icon name='google plus' size={socialIconSize} color={accent} className='pulse' title='View Google' />
            </Link>

            <Link to={SocialLinks.lastfm} target='_blank' >
                <Icon name='lastfm' color={accent} size={socialIconSize} className='pulse' title='View Scrobbles' />
            </Link>
            <Link to={SocialLinks.linkedIn} target='_blank' >
                <Icon name='linkedin' color={accent} size={socialIconSize} className='pulse' title='View Pro Network' />
            </Link>
            <Link to={SocialLinks.mail} target='_top'>
                <Icon name='mail' size={socialIconSize} color={accent} className='pulse' title='Send Email' />
            </Link>
        </div>
    );
}