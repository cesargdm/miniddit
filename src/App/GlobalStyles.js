import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: #DAE0E6; 
    
    --color-up: #819CFF; 
    --color-down: #FF6E54; 
  }

  /* Define the "system" font family */
  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
  }

  /* Now, let's apply it on an element */
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`

const ActionsContainer = styled.div`
  display: inline-grid;
  gap: 8px;
  grid-template-rows: 1;
  margin: 8px 0;
  grid-template-columns: repeat(5, auto);
  justify-items: start;
  button {
    font-size: 0.8rem;
    font-weight: 800;
    color: gray;
    padding: 2px 6px;
    border-radius: 2px;
    &:hover {
      background-color: gainsboro;
    }
  }
`

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  font-size: 0.8rem;
  width: 40px;
`

const Container = styled.div`
  background-color: var(--color-background);
  padding: 16px;
  min-height: 100vh;
`

export { Container, ActionsContainer, VotesContainer }
export default GlobalStyle
