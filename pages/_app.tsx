import '../styles/globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </QueryClientProvider>
    );
}
export default MyApp;
