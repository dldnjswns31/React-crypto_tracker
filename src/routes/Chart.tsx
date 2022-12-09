import ApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../apis/api";
import { isDarkAtom } from "../recoil/atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

interface ICandleDataDetail {
  x: number;
  y: number[];
}

type CandleData = ICandleDataDetail[];

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(data);
  console.log(
    data?.map((price) => {
      return {
        x: price.time_close,
        y: [price.open, price.high, price.low, price.close],
      };
    })
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000).toUTCString(),
                  y: [
                    Number(price.open),
                    Number(price.high),
                    Number(price.low),
                    Number(price.close),
                  ],
                };
              }) as unknown as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((v) => {
                const date = new Date(v.time_close * 1000);
                return date.toISOString();
              }),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (v) => `$ ${v}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
