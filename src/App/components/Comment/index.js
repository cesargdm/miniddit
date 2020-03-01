import React from 'react'
import Markdown from 'react-markdown'

import { ActionsContainer } from '../../GlobalStyles'
import { upsFormatter, getDifference } from '../../utils'

import VoteButton from '../VoteButton'
import CommentBox from '../CommentBox'

import Styles from './styles'

function Comment(props) {
  const {
    voteStatus,
    kind,
    status,
    data,
    onVote,
    onToggleReply,
    onReply,
    parentIds = [],
  } = props

  function handleToggle() {
    onToggleReply({ id: data.id, parents: parentIds })
  }

  function handleVote(voteStatus) {
    return () =>
      onVote({
        value: voteStatus === 'UP' ? 1 : -1,
        status: voteStatus,
        id: data.id,
        parents: parentIds,
      })
  }

  function handleCommentSubmit({ comment }) {
    onReply({ comment, id: data.id, parents: parentIds })
  }

  if (kind === 'more') {
    return (
      <Styles.Container>
        <button onClick={() => console.log(data)}>
          {data.count} more repl{data.count > 1 ? 'ies' : 'y'}
        </button>
      </Styles.Container>
    )
  }

  return (
    <Styles.Container>
      <Styles.ThreadDecorator>
        <VoteButton
          onClick={handleVote('UP')}
          active={voteStatus === 'UP'}
          small
          up
        />
        <VoteButton
          onClick={handleVote('DOWN')}
          active={voteStatus === 'DOWN'}
          small
        />
        <Styles.ThreadButton>
          <hr />
        </Styles.ThreadButton>
      </Styles.ThreadDecorator>
      <Styles.Children>
        <Styles.Content>
          <Styles.AuthorContainer>
            <p>{data.author}</p>
            <span>{upsFormatter(data.score)} points</span>
            <i style={{ fontSize: '0.3rem', alignSelf: 'center' }}>•</i>
            <span>{getDifference(data.created_utc)} ago</span>
          </Styles.AuthorContainer>
          <Markdown source={data.body} />
        </Styles.Content>
        <ActionsContainer>
          <button onClick={handleToggle}>Reply</button>
          <button onClick={() => console.log(props)}>Console log</button>
        </ActionsContainer>
        {status === 'COMMENT' && (
          <CommentBox
            onSubmit={handleCommentSubmit}
            onCancel={handleToggle}
            canCancel
          />
        )}
        {data.replies?.data?.children.map(
          ({ kind, status, voteStatus, data: nestedData }) => (
            <Comment
              key={nestedData.id}
              kind={kind}
              status={status}
              voteStatus={voteStatus}
              data={nestedData}
              parentIds={[...parentIds, data.id]}
              onVote={onVote}
              onToggleReply={onToggleReply}
              onReply={onReply}
            />
          ),
        )}
      </Styles.Children>
    </Styles.Container>
  )
}

export default Comment
