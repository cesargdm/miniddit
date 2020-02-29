import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Post = styled.div`
  display: flex;
  border: 1px solid lightgray;
  margin: -1px 0;
  background: white;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: black;
    z-index: 1;
  }
`

const Thumbnail = styled.div`
  background: url(${({ src }) => src}) no-repeat center center;
  background-size: cover;
  height: 60px;
  width: 80px;
  border-radius: 4px;
  flex-shrink: 0;
  margin: 4px 8px;
`

const Content = styled.div`
  flex-direction: row;
  padding: 4px 8px;
`

const PostLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 700;

  &:visited {
    color: lightgray;
  }
`

const Extra = styled.div`
  font-size: 0.8rem;
  margin: 4px 0;
`

export default { Post, Thumbnail, Content, Link: PostLink, Extra }
