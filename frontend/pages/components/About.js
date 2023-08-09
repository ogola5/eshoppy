// About.js

import React from 'react';
import {
  AboutContainer,
  AboutText,
  BouncingText,
  ContactText,
} from '../../styles/AboutStyles';

const About = () => {
  return (
    <AboutContainer>
      <BouncingText>About Us</BouncingText>
      <AboutText>
        Welcome to eShoppy - Your Decentralized E-Commerce Platform
      </AboutText>
      <AboutText>
        At eShoppy, we are dedicated to revolutionizing the world of online
        shopping through blockchain technology. Our platform offers a secure and
        transparent environment for buyers and sellers to engage in transactions
        using cryptocurrencies.
      </AboutText>
      <AboutText>
        With a decentralized approach, eShoppy eliminates the need for
        intermediaries, reduces fees, and ensures the privacy and security of
        your transactions. Our mission is to empower individuals and businesses
        by providing them with a seamless and trustworthy e-commerce experience.
      </AboutText>
      <AboutText>
        Join us on this exciting journey towards the future of online shopping.
        Whether you are a buyer or a seller, eShoppy is here to redefine the way
        you shop and trade.
      </AboutText>
      <ContactText>
        Contact us at info@eshoppy.com for any inquiries or support.
      </ContactText>
    </AboutContainer>
  );
};

export default About;
