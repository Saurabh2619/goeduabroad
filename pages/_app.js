import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
  <Head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,600,700,800"/>
  </Head>
  <Component {...pageProps} /></>
}
