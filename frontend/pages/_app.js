// pages/_app.js
import Navbar from "./components/Navbar"
import About from "./components/About"
import GlobalStyles from '../styles/GlobalStyles';
import LandingPage from "./components/LandingPage";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Navbar/>
      <LandingPage/>
      <About/>
      {/* <Component {...pageProps} /> */}
    </>
  );
}

export default MyApp;

