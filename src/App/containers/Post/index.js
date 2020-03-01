import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import { upsFormatter, getLongAgo } from '../../utils'
import {
  VotesContainer,
  Container,
  Score,
  ActionsContainer,
} from '../../GlobalStyles'
import { getRedditComments } from '../../utils/api'

import Comment from '../../components/Comment'
import VoteButton from '../../components/VoteButton'
import CommentBox from '../../components/CommentBox'

import reducer, {
  initialState,
  LOAD_COMMENTS,
  LOAD_COMMENTS_ERROR,
  COMMENT_POST,
  VOTE_POST,
  TOGGLE_COMMENT,
  REPLY_COMMENT,
  VOTE_COMMENT,
  TOGGLE_REPLY_COMMENT,
} from './reducer'
import Styles from './styles'

function Post() {
  const { category, user, slug } = useParams()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getRedditComments({ category, user, slug })
      .then((data) => dispatch({ type: LOAD_COMMENTS, data }))
      .catch((error) => dispatch({ type: LOAD_COMMENTS_ERROR, error }))
  }, [category, slug, user])

  if (!state.data) {
    if (state.loading) return <Container>...</Container>

    return state.error ? JSON.stringify(state.error) : 'Unknown error'
  }

  function handleCommentSubmit({ comment }) {
    dispatch({ type: COMMENT_POST, comment })
  }

  function handleToggleReply({ id, parents }) {
    dispatch({ type: TOGGLE_REPLY_COMMENT, id, parents })
  }

  function handleToggleComment({ id, parents }) {
    dispatch({ type: TOGGLE_COMMENT, id, parents })
  }

  function handleReplyComment({ comment, id, parents }) {
    dispatch({ type: REPLY_COMMENT, comment, id, parents })
  }

  function handleVoteComment({ value, status, id, parents }) {
    dispatch({ type: VOTE_COMMENT, id, parents, value, status })
  }

  function handleVote({ status, value }) {
    dispatch({ type: VOTE_POST, value, status })
  }

  const [{ data: reddit }, { data: comments }] = state.data

  const [{ data: redditData, voteStatus }] = reddit.children
  const commentsData = comments.children

  return (
    <Container data-testid="post-detail-page">
      <Styles.Content>
        <Styles.Main>
          <VotesContainer>
            <VoteButton
              onClick={() => handleVote({ status: 'UP', value: 1 })}
              active={voteStatus === 'UP'}
              up
            />
            <Score>{upsFormatter(redditData.score)}</Score>
            <VoteButton
              onClick={() => handleVote({ status: 'DOWN', value: -1 })}
              active={voteStatus === 'DOWN'}
            />
          </VotesContainer>
          <Styles.Heading>
            <div>
              <span>
                Posted by u/{redditData.author}{' '}
                {getLongAgo(redditData.created_utc)}
              </span>
              <Styles.Title>{redditData.title}</Styles.Title>
            </div>
            <div>
              <a
                href={redditData.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {redditData.preview?.images?.length > 0
                  ? redditData.preview.images.map(
                      ({ id, resolutions, ...more }) => {
                        const largerResolution =
                          resolutions?.[resolutions.length - 1]
                        const image = largerResolution?.url.replace(/amp;/g, '')

                        return (
                          image && (
                            <img
                              style={{ width: '100%' }}
                              key={id}
                              src={image}
                              alt=""
                            />
                          )
                        )
                      },
                    )
                  : redditData.url}
              </a>
            </div>
            <Styles.HeadingFooter>
              <ActionsContainer>
                <p>{upsFormatter(redditData.num_comments)} Comments</p>
                <button onClick={() => console.log(redditData)}>
                  Console log
                </button>
              </ActionsContainer>
              <p>{redditData.upvote_ratio}% Upvoted</p>
            </Styles.HeadingFooter>
            <Styles.CommentBoxLabel>Comment as you</Styles.CommentBoxLabel>
            <CommentBox onSubmit={handleCommentSubmit} />
          </Styles.Heading>
          <hr />
        </Styles.Main>
        <Styles.Comments>
          {commentsData.map(({ kind, voteStatus, status, data }) => (
            <Comment
              kind={kind}
              status={status}
              voteStatus={voteStatus}
              onVote={handleVoteComment}
              onToggleReply={handleToggleReply}
              onToggleComment={handleToggleComment}
              onReply={handleReplyComment}
              key={data.id}
              data={data}
            />
          ))}
        </Styles.Comments>
      </Styles.Content>
    </Container>
  )
}

export default Post
