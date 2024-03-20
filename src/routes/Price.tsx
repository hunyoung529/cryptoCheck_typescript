import styled from "styled-components";

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
  &:first-child {
    grid-column: 1 / -1;
  }
`;
function Price() {
  return (
    <PriceContainer>
      <PriceDetail>테스트</PriceDetail>
      <PriceDetail>테스트</PriceDetail>
      <PriceDetail>테스트</PriceDetail>
      <PriceDetail>테스트</PriceDetail>
      <PriceDetail>테스트</PriceDetail>
    </PriceContainer>
  );
}

export default Price;
