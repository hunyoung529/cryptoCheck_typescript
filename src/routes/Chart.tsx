import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";


interface ChartProps{
  coinId:string;
}
interface IHistoricalData{
  time_open:string;
time_close: string;
open: number;
high: number;
low: number;
close: number;
volume: number;
market_cap: number;
}

function Chart() {
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv",coinId], ()=>fetchCoinHistory(coinId))
  return <div>{isLoading ? ("Loading Chart..." ): 
  (<ReactApexChart 
    type="line" 
    series={[
      {
      name:"sales",
      data: data?.map(price=>price.close) as number[]
    },
  ]}
    options={{
      theme:{
        mode:"dark"
      },
    chart:{
      height: 500,
      width: 500
    }
  }} />)}</div>;
}

export default Chart;
