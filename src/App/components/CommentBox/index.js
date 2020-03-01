import React, { useState } from 'react'

import Styles from './styles'

function CommentBox(props) {
  const { onSubmit, id, onCancel, canCancel } = props

  const [comment, setComment] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({ comment, id })
    setComment('')
  }

  function handleChange({ target: { value } }) {
    setComment(value)
  }

  return (
    <Styles.Container onSubmit={handleSubmit}>
      <textarea
        placeholder="What are your thoughts?"
        id="comment"
        rows="6"
        value={comment}
        onChange={handleChange}
      />
      <div>
        {canCancel && <input type="button" value="Cancel" onClick={onCancel} />}
        <input type="submit" value="Comment" disabled={!comment} />
      </div>
    </Styles.Container>
  )
}

export default CommentBox
