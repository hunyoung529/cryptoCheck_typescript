const BASE_URL = `https://proxy.cors.sh/https://api.coinpaprika.com/v1`;
const API_KEY = "temp_42b93062c7f214fc68ed555daa6d0487";
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`, {
    headers: {
      "x-cors-api-key": API_KEY,
    },
  }).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`, {
    headers: {
      "x-cors-api-key": API_KEY,
    },
  }).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`, {
    headers: {
      "x-cors-api-key": API_KEY,
    },
  }).then((response) => response.json());
}
