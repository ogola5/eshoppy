// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import {
  NavbarContainer,
  NavItemContainer,
  NavItem,
  MobileNavIcon,
  MobileNavItems,
} from '../../styles/NavbarStyles';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <NavbarContainer>
      <Link href="/">
        <NavItemContainer>
          <NavItem>Home</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Signup</NavItem>
          <NavItem>Shop</NavItem>
          <NavItem>Pay</NavItem>
        </NavItemContainer>
      </Link>
      <MobileNavIcon onClick={toggleMobileNav}>
        <FaBars />
      </MobileNavIcon>
      {mobileNavOpen && (
        <MobileNavItems>
          <NavItem>Home</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Signup</NavItem>
          <NavItem>Shop</NavItem>
          <NavItem>Pay</NavItem>
        </MobileNavItems>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
