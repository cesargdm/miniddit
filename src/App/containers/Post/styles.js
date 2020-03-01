import styled from 'styled-components'

const Content = styled.main`
  background-color: white;
  padding: 8px 0 8px 8px;
  border-radius: 4px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid gainsboro;
`

const Heading = styled.div`
  flex: 1;

  > div:first-child {
    margin: 0 8px;
  }

  span {
    font-size: 0.8rem;
    color: gray;
  }
`

const Main = styled.div`
  display: flex;
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 4px 0 8px;
  font-weight: 400;
`

const Comments = styled.div`
  padding-right: 16px;
`

export default { Content, Heading, Title, Main, Comments }
