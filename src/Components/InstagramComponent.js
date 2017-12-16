import React from 'react';
import PropTypes from 'prop-types'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function InstagramCompo({ instaPhoto, accent }) {

    return (
        <Card color={accent}>
            <Image src={instaPhoto.imgSource} />
            <Card.Content>
                <Card.Description> {instaPhoto.caption} </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div style={{ display: 'flex' }}>
                    <div className='pulse'>
                        <Link target='_blank' to={instaPhoto.instagramUrl}><Icon name='instagram' size='big' /> </Link>
                    </div>
                    <div style={{ display: 'flex', paddingTop: '5px' }}>

                        {
                            instaPhoto.totalLikes > 0 ? <div className='pulse' style={{ marginLeft: '10px' }} ><Icon name='heart' /> <strong> {instaPhoto.totalLikes} </strong></div> : <div></div>
                        }

                        {
                            instaPhoto.totalComments > 0 ? <div className='pulse' style={{ marginLeft: '10px' }}><Icon name='comments outline' /> <strong> {instaPhoto.totalComments}</strong></div> : <div></div>
                        }

                    </div>
                </div>
            </Card.Content>
        </Card>
    )
}

// totalViews taken_at_timestamp isVideo  totalLikes  totalComments
InstagramCompo.propTypes = {
    instaPhoto: PropTypes.object.isRequired,
    accent: PropTypes.string.isRequired
}
