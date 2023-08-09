// AboutStyles.js
import styled from 'styled-components';

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: #f2f2f2;
`;

export const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  text-align: center;
  max-width: 800px;
  margin: 20px;
`;

export const BouncingText = styled.h1`
  font-size: 36px;
  opacity: 1.8;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

export const ContactText = styled.p`

  font-size: 16px;
  font-color:black;
  opacity: 1.8;
  text-align: center;
`;
