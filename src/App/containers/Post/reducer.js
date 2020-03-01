import { setScoreByStatus } from '../../utils'

import { findAndMutateComment, createComment } from './utils'

const LOAD_COMMENTS = 'LOAD_COMMENTS'
const LOAD_COMMENTS_ERROR = 'LOAD_COMMENTS_ERROR'
const COMMENT_POST = 'COMMENT_POST'
const TOGGLE_COMMENT = 'TOGGLE_COMMENT'
const VOTE_POST = 'VOTE_POST'
const REPLY_COMMENT = 'REPLY_COMMENT'
const VOTE_COMMENT = 'VOTE_COMMENT'
const TOGGLE_REPLY_COMMENT = 'TOGGLE_REPLY_COMMENT'

function reducer(state, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return { loading: false, error: null, data: action.data }
    case LOAD_COMMENTS_ERROR:
      return { loading: false, error: action.error, data: null }
    case COMMENT_POST:
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

    case VOTE_POST:
      return {
        ...state,
        data: [
          {
            ...state.data[0],
            data: {
              ...state.data[0].data,
              children: [
                {
                  ...state.data[0].data.children[0],
                  voteStatus: action.status,
                  data: {
                    ...state.data[0].data.children[0].data,
                    score: setScoreByStatus({
                      score: state.data[0].data.children[0].data.score,
                      status: action.status,
                      prevStatus: state.data[0].data.children[0].voteStatus,
                      value: action.value,
                    }),
                  },
                },
              ],
            },
          },
          state.data[1],
        ],
      }
    case TOGGLE_COMMENT:
    case REPLY_COMMENT:
    case VOTE_COMMENT:
    case TOGGLE_REPLY_COMMENT: {
      let mutateFunction = (arg) => arg

      if (action.type === TOGGLE_REPLY_COMMENT) {
        mutateFunction = (comment) =>
          comment.status === 'COMMENT'
            ? { ...comment, status: null }
            : { ...comment, status: 'COMMENT' }
      } else if (action.type === REPLY_COMMENT) {
        mutateFunction = (comment) => ({
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
        })
      } else if (action.type === VOTE_COMMENT) {
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
      } else if (action.type === TOGGLE_COMMENT) {
        mutateFunction = (comment) => ({
          ...comment,
          status: comment.status === 'SHRINK' ? null : 'SHRINK',
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

export {
  LOAD_COMMENTS,
  LOAD_COMMENTS_ERROR,
  COMMENT_POST,
  TOGGLE_COMMENT,
  VOTE_POST,
  REPLY_COMMENT,
  VOTE_COMMENT,
  TOGGLE_REPLY_COMMENT,
}
export default reducer
