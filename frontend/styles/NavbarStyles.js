// styles/NavbarStyles.js
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #2770b3;
  color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
    gap: 10px;
  }
`;

export const NavItem = styled.a`
  /* ... same styles ... */
`;
