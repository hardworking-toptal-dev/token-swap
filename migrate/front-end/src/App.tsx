import React from 'react';
import logo from './logo.svg';
import styled from "styled-components"

function App() {
  return (
    <AppWrapper>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Test>
          Edit <code>src/App.tsx</code> and save to reload.
        </Test>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </AppWrapper>
  );
}

const Test = styled.p`font-size: 50px`

const AppWrapper = styled.div`.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`

export default App;
