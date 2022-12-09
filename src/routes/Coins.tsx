import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { fetchCoins } from "../apis/api";
import { isDarkAtom } from "../recoil/atoms";

const StContainer = styled.div`
  width: 480px;
  padding: 0px 20px;
  margin: 0 auto;
`;

const StHeader = styled.header`
  position: relative;
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
`;

const StToggleButton = styled.button`
  position: absolute;
  right: 10px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.cardBgColor};
  font-size: 1.5rem;
  cursor: pointer;
`;

const StCoinsList = styled.ul``;

const StCoin = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.cardBgColor};
  color: ${({ theme }) => theme.textColor};

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
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <StContainer>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <StHeader>
        <StTitle>코인</StTitle>
        <StToggleButton onClick={toggleDarkAtom}>
          {isDark ? "🌞" : "🌛"}
        </StToggleButton>
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
