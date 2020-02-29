import styled from 'styled-components'

import arrow from '../../assets/icons/arrow.svg'
import arrowOrange from '../../assets/icons/arrow-orange.svg'
import arrowBlue from '../../assets/icons/arrow-blue.svg'

const VoteButton = styled.button`
  height: ${({ small }) => (small ? 18 : 22)}px;
  width: ${({ small }) => (small ? 18 : 22)}px;
  background-image: url(${({ active, up }) =>
    active ? (up ? arrowOrange : arrowBlue) : arrow});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: ${({ up }) => up && 'rotate(180deg)'};
  flex-shink: 0;
  margin: 2px;
  border-radius: 2px;

  &:hover {
    background-color: lightgray;
  }
`

export default VoteButton
