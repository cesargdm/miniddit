import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  margin: 8px 0;
  display: flex;

  button {
    color: var(--color-tint);
    font-weight: 600;
    font-size: 0.8rem;
    &:hover {
      text-decoration: underline;
    }
  }
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

const Children = styled.div`
  flex: 1;
`

const AuthorContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  gap: 8px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  span {
    color: gray;
  }
`

export default {
  Children,
  ThreadButton,
  Container,
  Content,
  ThreadDecorator,
  AuthorContainer,
}
