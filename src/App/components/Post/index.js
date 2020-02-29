import React from 'react'

import { ActionsContainer, VotesContainer } from '../../GlobalStyles'
// import { upsFormatter } from '../../utils'

import VoteButton from '../VoteButton'

import Styles from './styles'

function Post({ data, onVote }) {
  return (
    <Styles.Post key={data.id}>
      <VotesContainer>
        <VoteButton
          active={data.status === 'UP'}
          onClick={() => onVote({ id: data.id, type: 'UP', value: 1 })}
          up
        />
        {/* <p>{upsFormatter(data.ups)}</p> */}
        <VoteButton
          active={data.status === 'DOWN'}
          onClick={() => onVote({ id: data.id, type: 'DOWN', value: -1 })}
        />
      </VotesContainer>
      <Styles.Thumbnail src={data.thumbnail} />
      <Styles.Content>
        <Styles.Link to={data.permalink}>{data.title}</Styles.Link>
        <Styles.Extra>Posted by: {data.author}</Styles.Extra>
        <ActionsContainer>
          <button>Comments</button>
          <button>Give Award</button>
          <button>Share</button>
          <button>Save</button>
        </ActionsContainer>
      </Styles.Content>
    </Styles.Post>
  )
}

export default Post
