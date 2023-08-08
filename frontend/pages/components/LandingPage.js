// components/LandingPage.js
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  color: #2770b3;
  font-size: 36px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px;
`;

function LandingPage() {
  return (
    <LandingPageContainer>
      <Title>Welcome A decentralized eCommerce </Title>
      <ProductImage src="/dummy-product-image.jpg" alt="Product" />
      {/* Add more product images */}
    </LandingPageContainer>
  );
}

export default LandingPage;
