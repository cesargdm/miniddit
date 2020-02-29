import React from 'react'
import { useParams } from 'react-router-dom'
import ky from 'ky'
import { useQuery } from 'react-query'

import { VotesContainer, Container } from '../../GlobalStyles'

import Comment from '../../components/Comment'
import VoteButton from '../../components/VoteButton'

import Styles from './styles'

function Post() {
  const { category, user, slug } = useParams()

  const url = `https://www.reddit.com/r/${category}/comments/${user}/${slug}.json`

  const { data, status, error } = useQuery(url, () => ky(url).json())

  if (!data) {
    if (status === 'loading') return <Styles.Container>...</Styles.Container>

    return error ? JSON.stringify(error) : 'Unknown error'
  }

  function handleSubmit(event) {
    event.preventDefault()

    return null
  }

  const [reddit, comments] = data

  const redditData = reddit.data.children[0].data
  const commentsData = comments.data.children

  return (
    <Container>
      <Styles.Content>
        <Styles.Main>
          <VotesContainer>
            <VoteButton up />
            {redditData.score}
            <VoteButton />
          </VotesContainer>
          <div>
            <div>
              <span>
                Posted by u/{redditData.author} {redditData.created} hours ago
              </span>
              <a href={redditData.url}>{redditData.url}</a>
              <h1>{redditData.title}</h1>
            </div>
            <p>{redditData.upvote_ratio}% Upvoted</p>
            <div>
              <p>{redditData.num_comments} Comments</p>
            </div>
            <Styles.CommentBox onSubmit={handleSubmit}>
              <textarea name="" id="" cols="30" rows="10" />
              <input type="submit" value="Comment" />
            </Styles.CommentBox>
          </div>
          <hr />
        </Styles.Main>
        <div>
          {commentsData.map(({ data }) => (
            <Comment key={data.id} data={data} />
          ))}
        </div>
      </Styles.Content>
    </Container>
  )
}

export default Post
