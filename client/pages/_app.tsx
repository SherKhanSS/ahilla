import type { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from '../context/state';
import '../styles/normalize.scss';
import '../styles/globals.scss';
import NextNprogress from 'nextjs-progressbar';
import 'quill/dist/quill.snow.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider>
      <NextNprogress
        color="#707070"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
