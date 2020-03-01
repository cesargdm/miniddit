import React, { useReducer, useEffect } from 'react'

import { Container } from '../../GlobalStyles'
import { getAllPosts } from '../../utils/api'
import { setScoreByStatus } from '../../utils'
import Post from '../../components/Post'

import Styles from './styles'

const initialState = { loading: true, error: null, data: null }

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_POSTS_SUCCESS':
      return { loading: true, error: null, data: action.data }
    case 'LOAD_POSTS_ERROR':
      return { loading: true, error: action.error, data: null }
    case 'VOTE_POST':
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

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllPosts()
      .then(({ data }) => dispatch({ type: 'LOAD_POSTS_SUCCESS', data }))
      .catch((error) => dispatch({ type: 'LOAD_POSTS_ERROR', error }))
  }, [])

  if (!state.data) {
    if (state.loading) return <Container>...</Container>

    return state.error ? JSON.stringify(state.error) : 'Error'
  }

  function handleVote({ id, type, value }) {
    dispatch({ type: 'VOTE_POST', id, status: type, value })
  }

  return (
    <Container>
      <Styles.PostsContainer>
        {state.data.children.map(({ kind, data, voteStatus }) => (
          <Post
            onVote={handleVote}
            key={data.id}
            voteStatus={voteStatus}
            data={data}
          />
        ))}
      </Styles.PostsContainer>
    </Container>
  )
}

export default Home
