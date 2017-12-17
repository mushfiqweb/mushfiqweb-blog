import React from 'react';
import PropTypes from 'prop-types'
import { Label, Item, } from 'semantic-ui-react'


export default function GithubRepoComponent({ repo, accent }) {


    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Header >
                    <div color={accent} style={{ fontSize: '2rem' }} className='cool-link Alegreya'>
                        {repo.author}
                    </div>
                </Item.Header>
                <Item.Meta>
                    {repo.name}
                </Item.Meta>
                <Item.Description style={{ textAlign: 'justify' }}> {repo.description}  </Item.Description>
                <Item.Extra>
                    <div>
                        {repo.language}
                    </div>
                    <div>
                        {repo.stars}
                    </div>
                    <div>
                        {repo.forks}
                    </div>

                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

GithubRepoComponent.propTypes = {
    repo: PropTypes.object.isRequired
}
