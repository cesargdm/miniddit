import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  margin: 8px 0;
  display: flex;
  ${({ locked }) =>
    locked &&
    `
  background-color: rgba(253, 237, 93, 0.4);
  border-radius: 4px;
  border: 2px solid rgb(253, 237, 93);
  `}

  > button {
    color: var(--color-tint);
    font-weight: 600;
    font-size: 0.8rem;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Content = styled.div`
  margin-right: 8px;
`

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
    background-color: var(--color-content_background-dark);
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

const ExpandButton = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  background-color: var(--color-tint);
  color: white !important;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 3px 6px;
`

export default {
  Children,
  ThreadButton,
  Container,
  Content,
  ThreadDecorator,
  AuthorContainer,
  ExpandButton,
}
