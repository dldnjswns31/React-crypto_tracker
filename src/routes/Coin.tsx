import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../apis/api";

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

const StTitle = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.accentColor};
`;

const StLoader = styled.span`
  display: block;
  text-align: center;
`;

const StOverview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const StOverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const StDescription = styled.p`
  margin: 20px 0px;
`;

const StTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const StTab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  state: string;
}

// option + shift + i => 커서 오른쪽 할당
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

const Coin = () => {
  const { coinId } = useParams();
  const { state: name } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;
  return (
    <StContainer>
      <StHeader>
        <StTitle>
          {name ? name : loading ? "Loading..." : infoData?.name}
        </StTitle>
      </StHeader>
      {loading ? (
        <StLoader>Loading...</StLoader>
      ) : (
        <>
          <StOverview>
            <StOverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </StOverviewItem>
            <StOverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </StOverviewItem>
            <StOverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </StOverviewItem>
          </StOverview>
          <StDescription>{infoData?.description}</StDescription>
          <StOverview>
            <StOverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </StOverviewItem>
            <StOverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </StOverviewItem>
          </StOverview>
          <StTabs>
            <StTab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </StTab>
            <StTab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </StTab>
          </StTabs>
          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </StContainer>
  );
};

export default Coin;
