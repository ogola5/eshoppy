// styles/NavbarStyles.js
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #22303c;
  padding: 1rem 2rem;
`;

export const NavItemContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  margin: 0 1rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #f39c12;
  }
`;

export const MobileNavIcon = styled.div`
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #22303c;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1rem;
  z-index: 1;

  @media (min-width: 768px) {
    display: none;
  }

  ${NavItem} {
    margin: 0.5rem 0;
  }
`;
