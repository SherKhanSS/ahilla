import type { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from '../context/state';
import '../styles/normalize.scss';
import '../styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
