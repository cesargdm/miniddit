import React, { useReducer, useEffect } from 'react'

import { Container } from '../../GlobalStyles'
import { getAllPosts } from '../../utils/api'
import Post from '../../components/Post'

import reducer, {
  initialState,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  VOTE_POST,
} from './reducer'
import Styles from './styles'

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllPosts()
      .then(({ data }) => dispatch({ type: LOAD_POSTS_SUCCESS, data }))
      .catch((error) => dispatch({ type: LOAD_POSTS_ERROR, error }))
  }, [])

  if (!state.data) {
    if (state.loading) return <Container>...</Container>

    return state.error ? JSON.stringify(state.error) : 'Error'
  }

  function handleVote({ id, type, value }) {
    dispatch({ type: VOTE_POST, id, status: type, value })
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
