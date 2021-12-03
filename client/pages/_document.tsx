import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={'ru'}>
        <Head>
          {/*<link rel="icon" href="/favicon.ico" />*/}
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          {/*<link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />*/}
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/manifest.webmanifest" />
          <title key={'title'}>Ахилла</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
