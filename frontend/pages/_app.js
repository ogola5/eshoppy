// pages/_app.js
import Navbar from "./components/Navbar"
import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Navbar/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

