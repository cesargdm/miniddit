import React from 'react'
import Markdown from 'react-markdown'

import { ActionsContainer } from '../../GlobalStyles'

import VoteButton from '../VoteButton'

import Styles from './styles'

function Comment(props) {
  const { data, level = 0 } = props

  return (
    <Styles.Container>
      <Styles.ThreadDecorator>
        <VoteButton small up />
        <VoteButton small />
        <Styles.ThreadButton>
          <hr />
        </Styles.ThreadButton>
      </Styles.ThreadDecorator>
      <div>
        <Styles.Content>
          <Styles.AuthorContainer>
            <p>{data.author}</p>
            <span>points</span>
            <span>{data.created} ago</span>
          </Styles.AuthorContainer>
          <Markdown source={data.body} />
        </Styles.Content>
        <ActionsContainer>
          <button>Reply</button>
          <button>Give Award</button>
          <button>Share</button>
          <button>Report</button>
          <button>Save</button>
        </ActionsContainer>
        {data.replies?.data?.children.map(({ data }) => (
          <Comment id={data.id} data={data} level={level + 1} />
        ))}
      </div>
    </Styles.Container>
  )
}

export default Comment
