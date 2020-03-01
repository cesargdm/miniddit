import styled from 'styled-components'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid gainsboro;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 16px;

  > div {
    padding: 4px 8px;
    background-color: #f3f3f3;
    display: flex;
    justify-content: flex-end;
  }

  label,
  textarea {
    width: 100%;
  }

  textarea {
    border: none;
    padding: 4px;
  }
`

export default { Container }
