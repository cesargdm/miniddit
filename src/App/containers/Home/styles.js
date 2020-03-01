import styled from 'styled-components'

import PostStyles from '../../components/Post/styles'

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;

  ${PostStyles.Post} {
    &:first-child {
      border-radius: 4px 4px 0 0;
    }
    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
`

export default { PostsContainer }
