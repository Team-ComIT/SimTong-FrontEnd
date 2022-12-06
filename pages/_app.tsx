import '../styles/globals.css';
import { Provider } from 'react-redux';
import Header from '../components/header/index';
import { QueryClientProvider, QueryClient } from 'react-query';
import type { AppProps } from 'next/app';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
    const queryclient = new QueryClient();

    return (
        <QueryClientProvider client={queryclient}>
            <Provider store={store}>
                <Header />
                <Component {...pageProps} />
            </Provider>
        </QueryClientProvider>
    );
}
export default MyApp;
