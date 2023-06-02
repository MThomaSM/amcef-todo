import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import store from "@/store";
import RootLayout from "@/components/layout/RootLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    </Provider>
  )
}
