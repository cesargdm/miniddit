import styled from 'styled-components'

const Content = styled.main`
  background-color: var(--color-content_background);
  padding: 8px 0 8px 8px;
  border-radius: 4px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--color-content_background-dark);
`

const Heading = styled.div`
  flex: 1;
  margin-bottom: 16px;

  > div:first-child {
    margin: 0 8px;
  }

  span {
    font-size: 0.8rem;
    color: gray;
  }
`

const HeadingFooter = styled.div`
  font-size: 0.8rem;
  display: flex;
  color: gray;
  justify-content: space-between;
  align-items: center;
  margin-right: 16px;
`

const Main = styled.div`
  display: flex;
  margin-bottom: 32px;
`

const CommentBoxLabel = styled.p`
  font-size: 0.85rem;
  margin: 16px 0 4px;
`

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 4px 0 16px;
  font-weight: 500;
`

const Comments = styled.div`
  padding-right: 16px;
`

export default {
  Content,
  Heading,
  HeadingFooter,
  CommentBoxLabel,
  Title,
  Main,
  Comments,
}
