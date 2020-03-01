import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionsContainer, VotesContainer, Score } from '../../GlobalStyles'
import { upsFormatter } from '../../utils'

import VoteButton from '../VoteButton'

import Styles from './styles'

const CLEAN_URL_REGEX = /(https?:\/\/)?(www.)?/g

function Post({ data, onVote, voteStatus }) {
  const isExternalUrl = data.url?.indexOf('redd') === -1

  const navigate = useNavigate()

  function handlePostClick(event) {
    navigate(data.permalink)
  }

  function handleLinkClick(event) {
    event.stopPropagation()
  }

  return (
    <Styles.Post data-testid="post" onClick={handlePostClick}>
      <VotesContainer>
        <VoteButton
          data-testid="post-vote-up"
          active={voteStatus === 'UP'}
          onClick={() => onVote({ id: data.id, type: 'UP', value: 1 })}
          up
        />
        <Score data-testid="post-score" status={voteStatus}>
          {upsFormatter(data.score)}
        </Score>
        <VoteButton
          data-testid="post-vote-down"
          active={voteStatus === 'DOWN'}
          onClick={() => onVote({ id: data.id, type: 'DOWN', value: -1 })}
        />
      </VotesContainer>
      <Styles.Thumbnail src={data.thumbnail} />
      <Styles.Content>
        <Styles.Link onClick={handleLinkClick} to={data.permalink}>
          {data.title}
        </Styles.Link>
        {isExternalUrl && (
          <Styles.ExternalUrl>
            <a
              onClick={handleLinkClick}
              href={data.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {data.url.replace(CLEAN_URL_REGEX, '')}
            </a>
          </Styles.ExternalUrl>
        )}
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
