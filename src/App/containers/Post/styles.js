import styled from 'styled-components'

const Content = styled.main`
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid gainsboro;
`

const Main = styled.div`
  display: flex;
  margin-bottom: 32px;
`

const CommentBox = styled.form`
  display: flex;
  flex-diretion: column;
`

export default { Content, Main, CommentBox }
