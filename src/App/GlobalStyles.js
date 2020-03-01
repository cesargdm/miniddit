import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: #DAE0E6; 
    --color-content_background: #FFFFFF; 
    --color-content_background-dark: #EEEEEE;
    --color-content_background-darker: #AAAAAA;

    --color-text: #000;
    
    --color-down: #819CFF; 
    --color-up: #FF6E54; 
    
    --color-tint: #336d99; 
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: black; 
      --color-content_background: #111111;
      --color-content_background-dark: #222222;
      --color-content_background-darker: #666666;

      --color-text: #fff;
    }
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
    color: var(--color-text);
  }

  form {
    input[type="submit"], input[type="button"] {
      cursor: pointer;
      background-color: var(--color-tint);
      padding: 6px 18px;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 800;
      font-size: 0.75rem;
      color: white;
      &[disabled] {
        color: rgba(255,255,255,0.4);
      }
    }
    input[type="button"] {
      background-color: transparent;
      color: var(--color-tint);
    }
  }
`

const ActionsContainer = styled.div`
  display: inline-grid;
  gap: 8px;
  grid-template-rows: 1;
  margin: 8px 0;
  grid-template-columns: repeat(5, auto);
  justify-items: start;
  > * {
    font-size: 0.8rem;
    font-weight: 800;
    color: gray;
    padding: 2px 6px;
    border-radius: 2px;
    cursor: default;
  }
  > button {
    cursor: pointer;
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

const Score = styled.p`
  color: ${({ status }) =>
    status
      ? status === 'UP'
        ? 'var(--color-up)'
        : 'var(--color-down)'
      : 'var(--color-text)'};
`

export { Container, ActionsContainer, Score, VotesContainer }
export default GlobalStyle
