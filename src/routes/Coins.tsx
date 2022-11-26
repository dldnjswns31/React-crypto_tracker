import styled from "styled-components";

const StTitle = styled.h1`
  color: ${({ theme }) => theme.accentColor};
`;

const Coins = () => {
  return <StTitle>코인</StTitle>;
};

export default Coins;
