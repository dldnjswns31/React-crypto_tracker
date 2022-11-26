import styled from "styled-components";

const StTitle = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;

const StWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

function App() {
  return <div>hello</div>;
}

export default App;
