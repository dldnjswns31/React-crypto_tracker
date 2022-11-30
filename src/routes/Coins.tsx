import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../apis/api";

const StContainer = styled.div`
  width: 500px;
  padding: 0px 20px;
`;

const StHeader = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCoinsList = styled.ul``;

const StCoin = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: white;
  color: ${({ theme }) => theme.bgColor};

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;

const StTitle = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.accentColor};
`;

const StLoader = styled.span`
  display: block;
  text-align: center;
`;

const StImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <StContainer>
      <StHeader>
        <StTitle>코인</StTitle>
      </StHeader>
      {isLoading ? (
        <StLoader>Loading...</StLoader>
      ) : (
        <StCoinsList>
          {data?.slice(0, 100).map((coin) => (
            <StCoin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <StImage
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.symbol}
                />
                {coin.name} &rarr;
              </Link>
            </StCoin>
          ))}
        </StCoinsList>
      )}
    </StContainer>
  );
};

export default Coins;
