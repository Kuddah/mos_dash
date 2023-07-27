import "../Components/assets/scss/themes.scss";
import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { Provider } from "react-redux";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { wrapper } from '../Components/slices';
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import AppLayoutProps from "next/app";
import type { NextComponentType, NextPage } from 'next';
import { NextRouter } from "next/router";
// Import Firebase Configuration file

import { initFirebaseBackend } from "Components/helper/firebase_helper";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

initFirebaseBackend(firebaseConfig);

type ModifiedAppPropsType = AppPropsType<NextRouter, any> & {
  Component: NextLayoutPageType
}

type NextLayoutPageType = NextComponentType<NextRouter, any, {}> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const MyApp: NextComponentType<AppContext, any, ModifiedAppPropsType> = ({ Component, pageProps, ...rest }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Hybrix | Next js & Admin Dashboard </title>
      </Head>
      <SSRProvider>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </SSRProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
