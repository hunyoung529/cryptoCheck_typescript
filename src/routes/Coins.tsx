import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkState } from "../atoms";
const Title = styled.h1`
  font-size: 48px;
  color: ${(p) => p.theme.accentColor};
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
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
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  const setTheme = useSetRecoilState(isDarkState);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleTheme}>Toggle MNode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}/price`} state={coin.name}>
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
