import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import { upsFormatter, setScoreByStatus } from '../../utils'
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

import Styles from './styles'

const initialState = { loading: true, error: null, data: null }

function findAndMutateComment({ children, parents = [], id, onMutate }) {
  if (!parents.length) {
    const newChildren = children.map((comment) =>
      comment.data.id === id ? onMutate(comment) : comment,
    )

    return newChildren
  }

  // console.log({ children })
  const [parentToFind] = parents

  return children.map((comment) => {
    if (comment.data.id === parentToFind) {
      const [, ...remainingParents] = parents

      return {
        ...comment,
        data: {
          ...comment.data,
          ...(comment.data.replies
            ? {
                replies: {
                  kind: comment.data.replies.kind,
                  data: {
                    ...comment.data.replies.data,
                    children: findAndMutateComment({
                      children: comment.data.replies.data.children,
                      parents: remainingParents,
                      id,
                      onMutate,
                    }),
                  },
                },
              }
            : {}),
        },
      }
    }

    return comment
  })
}

function createComment(comment) {
  return {
    kind: 't1',
    data: {
      id: Date.now(),
      author: 'You',
      score: 0,
      created_utc: Date.now() / 1000,
      body: comment,
      replies: { data: { children: [] } },
    },
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_COMMENTS':
      return { loading: false, error: null, data: action.data }
    case 'LOAD_POSTS_ERROR':
      return { loading: false, error: action.error, data: null }
    case 'COMMENT_POST':
      return {
        ...state,
        data: [
          state.data[0],
          {
            ...state.data[1],
            data: {
              ...state.data[1].data,
              children: [
                createComment(action.comment),
                ...state.data[1].data.children,
              ],
            },
          },
        ],
      }
    case 'VOTE_POST':
      // TODO:
      return state
    case 'REPLY_COMMENT':
    case 'VOTE_COMMENT':
    case 'TOGGLE_REPLY_COMMENT': {
      let mutateFunction = (arg) => arg

      if (action.type === 'TOGGLE_REPLY_COMMENT') {
        mutateFunction = (comment) =>
          comment.status === 'COMMENT'
            ? { ...comment, status: null }
            : { ...comment, status: 'COMMENT' }
      } else if (action.type === 'REPLY_COMMENT') {
        mutateFunction = (comment) => {
          console.log(comment)
          return {
            ...comment,
            status: null,
            data: {
              ...comment.data,
              replies: {
                ...comment.data.replies,
                data: {
                  ...comment.data.replies.data,
                  children: [
                    createComment(action.comment),
                    ...comment.data.replies.data.children,
                  ],
                },
              },
            },
          }
        }
      } else if (action.type === 'VOTE_COMMENT') {
        mutateFunction = (comment) => ({
          ...comment,
          voteStatus: comment.voteStatus !== action.status && action.status,
          data: {
            ...comment.data,
            score: setScoreByStatus({
              score: comment.data.score,
              value: action.value,
              status: action.status,
              prevStatus: comment.voteStatus,
            }),
          },
        })
      }

      return {
        ...state,
        data: [
          state.data[0],
          {
            ...state.data[1],
            data: {
              ...state.data[1].data,
              children: findAndMutateComment({
                children: state.data[1].data.children,
                parents: action.parents,
                id: action.id,
                onMutate: mutateFunction,
              }),
            },
          },
        ],
      }
    }

    default:
      return state
  }
}

function Post() {
  const { category, user, slug } = useParams()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getRedditComments({ category, user, slug })
      .then((data) => dispatch({ type: 'LOAD_COMMENTS', data }))
      .catch((error) => dispatch({ type: 'LOAD_COMMENTS_ERROR', error }))
  }, [category, slug, user])

  if (!state.data) {
    if (state.loading) return <Container>...</Container>

    return state.error ? JSON.stringify(state.error) : 'Unknown error'
  }

  function handleCommentSubmit({ comment }) {
    dispatch({ type: 'COMMENT_POST', comment })
  }

  function handleToggleReply({ id, parents }) {
    dispatch({ type: 'TOGGLE_REPLY_COMMENT', id, parents })
  }

  function handleReplyComment({ comment, id, parents }) {
    dispatch({ type: 'REPLY_COMMENT', comment, id, parents })
  }

  function handleVoteComment({ value, status, id, parents }) {
    dispatch({ type: 'VOTE_COMMENT', id, parents, value, status })
  }

  const [reddit, comments] = state.data

  const redditData = reddit.data.children[0].data
  const commentsData = comments.data.children

  return (
    <Container>
      <Styles.Content>
        <Styles.Main>
          <VotesContainer>
            <VoteButton up />
            <Score>{upsFormatter(redditData.score)}</Score>
            <VoteButton />
          </VotesContainer>
          <Styles.Heading>
            <div>
              <span>
                Posted by u/{redditData.author} {redditData.created} hours ago
              </span>
              <Styles.Title>{redditData.title}</Styles.Title>
            </div>
            <div>
              {redditData.url && (
                <img style={{ width: '100%' }} src={redditData.url} alt="" />
              )}
              {redditData.preview?.images.map(({ id, resolutions }) => {
                const image = resolutions?.[4]?.url.replace(/amp;/g, '')
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
              })}
            </div>
            <div>
              <ActionsContainer>
                <p>{upsFormatter(redditData.num_comments)} Comments</p>
                <button>Give award</button>
              </ActionsContainer>
              <p>{redditData.upvote_ratio}% Upvoted</p>
            </div>
            <p>Comment as anonymous</p>
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
