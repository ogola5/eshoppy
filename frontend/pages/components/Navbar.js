// components/Navbar.js
import Link from 'next/link';
import { NavbarContainer, NavItem } from '/styles/NavbarStyles';

function Navbar() {
  return (
    <NavbarContainer>
      <Link href="/">
        <NavItem>Home</NavItem>
      </Link>
      <Link href="/about">
        <NavItem>About</NavItem>
      </Link>
      <Link href="/signup">
        <NavItem>Signup</NavItem>
      </Link>
      <Link href="/shop">
        <NavItem>Shop</NavItem>
      </Link>
      <Link href="/pay">
        <NavItem>Pay</NavItem>
      </Link>
    </NavbarContainer>
  );
}

export default Navbar;
