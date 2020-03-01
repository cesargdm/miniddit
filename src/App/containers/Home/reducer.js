import { setScoreByStatus } from '../../utils'

const initialState = { loading: true, error: null, data: null }

const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR'
const VOTE_POST = 'VOTE_POST'

function reducer(state, action) {
  switch (action.type) {
    case LOAD_POSTS_SUCCESS:
      return { loading: true, error: null, data: action.data }
    case LOAD_POSTS_ERROR:
      return { loading: true, error: action.error, data: null }
    case VOTE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          children: state.data.children.map((post) =>
            post.data.id === action.id && post.data.status !== action.status
              ? {
                  ...post,
                  voteStatus:
                    post.voteStatus !== action.status && action.status,
                  data: {
                    ...post.data,
                    score: setScoreByStatus({
                      score: post.data.score,
                      value: action.value,
                      status: action.status,
                      prevStatus: post.voteStatus,
                    }),
                  },
                }
              : post,
          ),
        },
      }
    default:
      return state
  }
}

export { initialState, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, VOTE_POST }
export default reducer
