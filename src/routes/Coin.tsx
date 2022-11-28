import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const StContainer = styled.div`
  padding: 0px 20px;
`;

const StHeader = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StTitle = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.accentColor};
`;

const StLoader = styled.span`
  display: block;
  text-align: center;
`;

interface RouteState {
  state: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { state: name } = useLocation() as RouteState;
  return (
    <StContainer>
      <StHeader>
        <StTitle>{name || "Loading"}</StTitle>
      </StHeader>
      {loading ? <StLoader>Loading...</StLoader> : null}{" "}
    </StContainer>
  );
};

export default Coin;
