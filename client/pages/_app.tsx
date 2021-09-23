import type { AppProps } from 'next/app'
import { FC } from 'react'
import { TagsProvider } from '../context/tags';
import '../styles/normalize.scss'
import '../styles/globals.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <TagsProvider>
           <Component {...pageProps} />
         </TagsProvider>
}

export default MyApp
