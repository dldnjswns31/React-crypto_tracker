import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../apis/api";

const StContainer = styled.div`
  width: 100%;
`;

const StPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  margin-bottom: 20px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.cardBgColor};
  border-radius: 10px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.textColor};
    font-size: 18px;
  }
`;

const StTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  margin-bottom: 20px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.cardBgColor};
  border-radius: 10px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.textColor};
    font-size: 12px;
  }
`;
interface PriceProps {
  coinId: string;
}

interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<TickersData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  const price = data?.quotes.USD;
  const date = new Date(price?.ath_date as string);

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <StContainer>
            <StTime>
              <span>기준 시각</span>
              <span>{date.toLocaleString()}</span>
            </StTime>
            <StPrice>
              <span>1시간 대비</span>
              <span>{price?.percent_change_1h} %</span>
            </StPrice>
            <StPrice>
              <span>12시간 대비</span>
              <span>{price?.percent_change_12h} %</span>
            </StPrice>
            <StPrice>
              <span>1일 대비</span>
              <span>{price?.percent_change_24h} %</span>
            </StPrice>
            <StPrice>
              <span>1주일 대비</span>
              <span>{price?.percent_change_7d} %</span>
            </StPrice>
            <StPrice>
              <span>1년 대비</span>
              <span>{price?.percent_change_1y} %</span>
            </StPrice>
          </StContainer>
        </>
      )}
    </div>
  );
};

export default Price;
