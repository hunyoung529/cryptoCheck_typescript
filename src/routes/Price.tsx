import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const PriceContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 열이 동일한 크기를 가짐 */
  gap: 20px;
`;
const PriceDetail = styled.div`
  border-radius: 15px;
  border: 1px solid white;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  &:first-child {
    grid-column: 1 / -1;
  }
  span {
    display: block;
    margin-top: 10px;
    color: ${(props) => props.color || "#44BD32"};
  }
`;
interface ChartProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: number;
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

function priceColor(v: number) {
  if (v > 0) return "#c84a31";
  else if (v < 0) return "#1261C4";
}

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<PriceData>(["cointickers", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  const priceDetails = [
    { label: "최근 30분", value: data?.quotes.USD.percent_change_30m },
    { label: "최근 1시간", value: data?.quotes.USD.percent_change_1h },
    { label: "최근 12시간", value: data?.quotes.USD.percent_change_12h },
    { label: "최근 24시간", value: data?.quotes.USD.percent_change_24h },
    { label: "최근 7일", value: data?.quotes.USD.percent_change_7d },
    { label: "최근 30일", value: data?.quotes.USD.percent_change_30d },
  ];
  function iconColor(v: number) {
    if (v > 0) {
      return { icon: faArrowTrendUp, color: "#c84a31" };
    } else if (v < 0) {
      return { icon: faArrowTrendDown, color: "#1261C4" };
    } else {
      return { icon: faMinus, color: "#44BD32" };
    }
  }
  return (
    <>
      {isLoading ? (
        "Loading Price Data..."
      ) : (
        <PriceContainer>
          <PriceDetail>
            최고가 <br />
            <span>${data?.quotes.USD.ath_price.toFixed(2)}</span>
          </PriceDetail>
          {priceDetails.map((detail, index) => {
            const { icon, color } = iconColor(detail.value || 0);
            return (
              <PriceDetail key={index} color={priceColor(detail.value || 0)}>
                {detail.label} <br />
                <span>{detail.value}%</span>
                <FontAwesomeIcon icon={icon} color={color} />
              </PriceDetail>
            );
          })}
        </PriceContainer>
      )}
    </>
  );
}

export default Price;
