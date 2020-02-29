import React, { useReducer, useEffect } from 'react'
import ky from 'ky'

// import { Container } from '../../GlobalStyles'
// import Post from '../../components/Post'

import Styles from './styles'

const ALL_URL = 'https://www.reddit.com/r/all.json'

const initialState = { loading: true, error: null, data: null }

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_POSTS_START':
      return { loading: true, error: null, data: null }
    case 'LOAD_POSTS_SUCCESS':
      return { loading: true, error: null, data: action.data }
    case 'LOAD_POSTS_ERROR':
      return { loading: true, error: action.error, data: null }
    case 'VOTE_POST':
      return {
        ...state,
        data: {
          ...state.data,
          children: state.data.children.map(($0) =>
            $0.data.id === action.id && $0.data.status !== action.status
              ? {
                  ...$0,
                  data: {
                    ...$0.data,
                    ups: $0.data.ups + action.value * ($0.data.status ? 2 : 1),
                    status: action.status,
                  },
                }
              : $0,
          ),
        },
      }
    default:
      return state
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'LOAD_POSTS_START' })

    function fetchPosts() {
      ky(ALL_URL)
        .json()
        .then(({ data }) => dispatch({ type: 'LOAD_POSTS_SUCCESS', data }))
        .catch((error) => dispatch({ type: 'LOAD_POSTS_ERROR', error }))
    }

    fetchPosts()
  }, [])

  if (!state.data) {
    if (state.loading) return <Styles.Container>...</Styles.Container>

    return state.error ? JSON.stringify(state.error) : 'Error'
  }

  function handleVote({ id, type, value }) {
    dispatch({ type: 'VOTE_POST', id, status: type, value })
  }

  return (
    <div>
      {/* <Styles.PostsContainer>
        {state.data.children.map(({ kind, data }) => (
          <Post onVote={handleVote} key={data.id} data={data} />
        ))}
      </Styles.PostsContainer> */}
    </div>
  )
}

export default Home
