import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  margin: 8px 0;
  display: flex;
`

const Content = styled.div``

const ThreadButton = styled.button`
  flex: 1;
`

const ThreadDecorator = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4px;

  ${ThreadButton}:hover hr {
    background-color: seagreen;
  }

  ${ThreadButton} hr {
    width: 2px;
    height: 100%;
    border: none;
    background-color: lightgray;
    margin: 0 auto;
  }
`

const AuthorContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 8px;
  span {
    color: gray;
  }
`

export default {
  ThreadButton,
  Container,
  Content,
  ThreadDecorator,
  AuthorContainer,
}
